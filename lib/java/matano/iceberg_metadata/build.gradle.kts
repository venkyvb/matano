import com.github.jengelman.gradle.plugins.shadow.tasks.ShadowJar

plugins {
    application
    kotlin("jvm") version "1.7.0"
    id("com.github.johnrengelman.shadow") version "7.1.2"
}
configurations.all {
    exclude("org.slf4j", "commons-collections")
    exclude("org.slf4j","slf4j-reload4j")
}
dependencies {
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.6.4")

    implementation("com.fasterxml.jackson.core:jackson-annotations:2.13.3")
    implementation("com.fasterxml.jackson.core:jackson-databind:2.13.3")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.13.3")

    implementation("org.apache.logging.log4j:log4j-core:2.17.2")
    implementation("org.apache.logging.log4j:log4j-api:2.17.2")
    runtimeOnly("org.apache.logging.log4j:log4j-slf4j-impl:2.17.2")
    implementation("org.slf4j:slf4j-api:1.7.32")
    //implementation("org.slf4j:slf4j-simple:1.7.32")

    implementation("org.apache.iceberg:iceberg-api:0.14.1")
    implementation("org.apache.iceberg:iceberg-core:0.14.1")
    implementation("org.apache.iceberg:iceberg-common:0.14.1")
    implementation("org.apache.iceberg:iceberg-parquet:0.14.1")
    implementation("org.apache.iceberg:iceberg-aws:0.14.1")
    implementation("org.apache.hadoop:hadoop-common:3.3.3") {
        exclude("org.slf4j")
    }
    implementation("org.apache.hadoop:hadoop-aws:3.3.3") {
        exclude("com.amazonaws")
    }
    implementation("com.amazonaws:aws-java-sdk-s3:1.11.1026")
    implementation("com.amazonaws:aws-java-sdk-sts:1.11.1026")
    implementation("com.amazonaws:aws-java-sdk-dynamodb:1.11.1026")
    implementation("com.amazonaws:aws-lambda-java-core:1.2.1")

    implementation("org.apache.hadoop:hadoop-mapreduce-client-core:3.3.3")
    implementation("org.apache.parquet:parquet-hadoop-bundle:1.12.3")
    implementation("org.apache.parquet:parquet-avro:1.12.3")
    implementation("software.amazon.awssdk:glue:2.17.131") {
        exclude("software.amazon.awssdk", "apache-client")
        exclude("software.amazon.awssdk", "netty-nio-client")
    }
    implementation("software.amazon.awssdk:s3:2.17.131") {
        exclude("software.amazon.awssdk", "apache-client")
        exclude("software.amazon.awssdk", "netty-nio-client")
    }
    implementation("software.amazon.awssdk:url-connection-client:2.17.131")
    implementation("com.amazonaws:aws-java-sdk-s3:1.11.213")
    implementation("com.amazonaws:aws-lambda-java-events:3.11.0")
}

application {
    mainClass.set("com.matano.iceberg.IcebergMetadataWriterKt")
}

tasks {
    withType<ShadowJar> {
//        minimize {
//            exclude(dependency("org.slf4j:.*:.*"))
//            exclude(dependency("org.apache.logging.log4j:.*:.*"))
//            exclude(dependency("software.amazon.awssdk:s3:.*"))
//            exclude(dependency("org.apache.iceberg:iceberg-core:.*"))
//        }
        archiveFileName.set("output.jar")
    }
}
