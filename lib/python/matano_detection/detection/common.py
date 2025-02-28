import asyncio
import base64
import importlib
import json
import logging
import os
import time
from collections import defaultdict
from dataclasses import dataclass
from io import BytesIO
from typing import Any
from uuid import uuid4

import aiobotocore
import aiobotocore.client
import aiobotocore.session
import botocore
import botocore.session
import fastavro
import jsonlines
import pyston_lite
from detection.cache import RemoteCache
from detection.util import ALERT_ECS_FIELDS, Timers, json_dumps_dt, timing

logger = logging.getLogger()
logger.setLevel(logging.INFO)

# TODO: consolidate this
botocore_session = botocore.session.get_session()
botocore_session.set_credentials(
    os.environ["AWS_ACCESS_KEY_ID"],
    os.environ["AWS_SECRET_ACCESS_KEY"],
    os.environ["AWS_SESSION_TOKEN"],
)

aiobotocore_session = aiobotocore.session.get_session()
aiobotocore_session.set_credentials(
    os.environ["AWS_ACCESS_KEY_ID"],
    os.environ["AWS_SECRET_ACCESS_KEY"],
    os.environ["AWS_SESSION_TOKEN"],
)

botocore_client_kwargs = dict(
    region_name=os.environ["AWS_REGION"],
)

ddb = botocore_session.create_client("dynamodb", **botocore_client_kwargs)
s3 = botocore_session.create_client("s3", **botocore_client_kwargs)
s3_async = aiobotocore_session.create_client("s3", **botocore_client_kwargs)
sns = aiobotocore_session.create_client("sns", **botocore_client_kwargs)

event_loop = asyncio.new_event_loop()
asyncio.set_event_loop(event_loop)


async def ensure_clients():
    global s3_async
    global sns
    if not isinstance(s3_async, aiobotocore.client.BaseClient):
        s3_async = await s3_async.__aenter__()
        sns = await sns.__aenter__()


DETECTION_CONFIGS = None
TABLE_DETECTION_CONFIG = None
ALERTING_SNS_TOPIC_ARN = None
SOURCES_S3_BUCKET = None
MATANO_ALERTS_TABLE_NAME = "matano_alerts"
LOADED_PYSTON = False
timers = Timers()


def remote_cache(namespace: str, ttl: int = 3600):
    return RemoteCache(ddb, os.environ["REMOTE_CACHE_TABLE_NAME"], namespace, ttl)


def _load_detection_configs():
    global DETECTION_CONFIGS
    config_path = os.path.join("/opt/config/detections_config.json")
    with open(config_path) as f:
        DETECTION_CONFIGS = json.load(f)


def _load_table_detection_config():
    global TABLE_DETECTION_CONFIG
    ret = defaultdict(list)
    for detection_path, detection_config in DETECTION_CONFIGS.items():
        for table_name in detection_config["tables"]:
            ret[table_name].append(
                {
                    "detection": detection_config,
                    "module": importlib.import_module(".", f"{detection_path}.detect"),
                }
            )
    TABLE_DETECTION_CONFIG = ret


@dataclass
class RecordData:
    record: Any
    record_idx: int
    s3_bucket: str
    s3_key: str
    table_name: str

    def record_reference(self):
        ref = f"{self.s3_bucket}#{self.s3_key}#{self.record_idx}"
        return base64.b64encode(ref.encode("utf-8")).decode("utf-8")


@timing(timers)
def handler(event, context):
    global LOADED_PYSTON
    if not LOADED_PYSTON:
        pyston_lite.enable()
        LOADED_PYSTON = True

    global ALERTING_SNS_TOPIC_ARN
    ALERTING_SNS_TOPIC_ARN = os.environ["ALERTING_SNS_TOPIC_ARN"]

    global SOURCES_S3_BUCKET
    SOURCES_S3_BUCKET = os.environ["SOURCES_S3_BUCKET"]

    if DETECTION_CONFIGS is None:
        _load_detection_configs()
        _load_table_detection_config()

    alert_responses = []
    detection_run_count = 0
    with timers.get_timer("process"):
        for record_data in get_records(event):
            for response in run_detections(record_data):
                detection_run_count += 1
                if response:
                    alert_responses.append(response)

    event_loop.run_until_complete(process_responses(alert_responses))

    debug_metrics(record_data.record_idx, detection_run_count)


def debug_metrics(record_count, detection_run_count):
    processing_time = timers.get_timer("process").elapsed
    dl_time = timers.get_timer("data_download").elapsed

    avg_detection_run_time = (
        0 if record_count == 0 else processing_time / detection_run_count
    )
    logger.info(
        f"Took {processing_time} seconds, processed {record_count} records, ran {detection_run_count} detections, an average time of {avg_detection_run_time} seconds per detection run"
    )
    logger.info(f"Downloading took: {dl_time} seconds")


# { bucket: ddd, key: "" }
def get_records(event):
    # Actually batch size: 1 currrently
    for sqs_record in event["Records"]:
        sqs_record_body = json.loads(sqs_record["body"])
        table_name = sqs_record_body["resolved_table_name"]
        s3_bucket, s3_key = sqs_record_body["bucket"], sqs_record_body["key"]

        logger.info(f"START: Downloading from s3://{s3_bucket}/{s3_key}")
        with timers.get_timer("process").pause():
            with timers.get_timer("data_download"):
                obj_body = s3.get_object(Bucket=s3_bucket, Key=s3_key)["Body"]
        logger.info(f"END: Downloading from s3://{s3_bucket}/{s3_key}")

        reader = fastavro.reader(obj_body)

        for record_idx, record in enumerate(reader):
            yield RecordData(record, record_idx, s3_bucket, s3_key, table_name)


def run_detections(record_data: RecordData):
    configs = TABLE_DETECTION_CONFIG[record_data.table_name]

    for detection_config in configs:
        detection, detection_module = (
            detection_config["detection"],
            detection_config["module"],
        )
        detection_name = detection["name"]

        alert_response = detection_module.detect(record_data.record)

        if not alert_response:
            yield False
        else:
            default_alert_title = detection_name
            alert_title = (
                safe_call(detection_module, "title", record_data.record)
                or default_alert_title
            )
            alert_dedupe = safe_call(detection_module, "dedupe", record_data.record)
            yield {
                "title": alert_title,
                "dedupe": alert_dedupe,
                "detection": detection,
                "record_data": record_data,
            }


def create_alert(alert_response):
    record_data: RecordData = alert_response["record_data"]
    record: dict = record_data.record
    detection = alert_response["detection"]
    detection_name = detection["name"]
    dedupe = alert_response["dedupe"]
    ret = {
        **{k: v for k, v in record.items() if k in ALERT_ECS_FIELDS},
        "ts": time.time(),
        "event": {
            **record.get("event", {}),
            "kind": "signal",
        },
        "matano": {
            "table": record_data.table_name,
            "alert": {
                "title": alert_response["title"],
                "dedupe": dedupe,
                "original_timestamp": record["ts"],
                "original_event": json_dumps_dt(record_data.record),
                "original_event_id": record_data.record_reference(),  # TODO: replace w/ real ID when added
                "rule": {
                    "name": detection_name,
                    "threshold": detection.get("alert", {}).get("threshold"),
                    "deduplication_window": detection.get("alert", {}).get(
                        "deduplication_window"
                    ),
                    "match": {
                        "id": str(uuid4()),
                    },
                },
            },
        },
    }
    return ret


async def process_responses(alert_responses):
    if not alert_responses:
        return

    alert_objs = []
    for idx, response in enumerate(alert_responses):
        alert_obj = create_alert(response)
        alert_objs.append(alert_obj)

    futures = []
    alert_objs_chunks = chunks(alert_objs, 10)
    await ensure_clients()

    for alert_objs_chunk in alert_objs_chunks:
        sns_fut = publish_sns_batch(
            topic_arn=ALERTING_SNS_TOPIC_ARN,
            entries=[
                {"Id": str(uuid4()), "Message": json_dumps_dt(obj)}
                for obj in alert_objs_chunk
            ],
        )
        futures.append(sns_fut)

    s3_future = write_alerts(alert_objs)
    futures.append(s3_future)

    await asyncio.gather(*futures)


async def write_alerts(alerts: list):
    # TODO: S3 ingest for now, prolly convert to SQS when added.
    obj = BytesIO()
    json_writer = jsonlines.Writer(obj, dumps=json_dumps_dt)
    json_writer.write_all(alerts)
    await s3_async.put_object(
        Body=obj.getvalue(),
        Bucket=SOURCES_S3_BUCKET,
        Key=f"{MATANO_ALERTS_TABLE_NAME}/{str(uuid4())}.json",
    )


async def publish_sns_batch(topic_arn, entries):
    # TODO: handle errors (partial)
    return await sns.publish_batch(
        TopicArn=topic_arn,
        PublishBatchRequestEntries=entries,
    )


def chunks(lst, n):
    for i in range(0, len(lst), n):
        yield lst[i : i + n]


def safe_call(module: Any, func_name: str, *args):
    maybe_func = module.__dict__.get(func_name)
    return maybe_func(*args) if maybe_func else None
