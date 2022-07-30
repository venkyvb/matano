"use strict";(self.webpackChunk_matano_website=self.webpackChunk_matano_website||[]).push([[103],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>u});var a=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function m(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var i=a.createContext({}),c=function(e){var t=a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=c(e.components);return a.createElement(i.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,i=e.parentName,p=m(e,["components","mdxType","originalType","parentName"]),d=c(n),u=o,f=d["".concat(i,".").concat(u)]||d[u]||s[u]||r;return n?a.createElement(f,l(l({ref:t},p),{},{components:n})):a.createElement(f,l({ref:t},p))}));function u(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,l=new Array(r);l[0]=d;var m={};for(var i in t)hasOwnProperty.call(t,i)&&(m[i]=t[i]);m.originalType=e,m.mdxType="string"==typeof e?e:o,l[1]=m;for(var c=2;c<r;c++)l[c]=n[c];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},95407:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>l,default:()=>s,frontMatter:()=>r,metadata:()=>m,toc:()=>c});var a=n(87462),o=(n(67294),n(3905));const r={sidebar_position:1,title:"Matano CLI reference"},l=void 0,m={unversionedId:"reference/cli-reference",id:"reference/cli-reference",title:"Matano CLI reference",description:"Commands",source:"@site/docs/reference/cli-reference.md",sourceDirName:"reference",slug:"/reference/cli-reference",permalink:"/docs/reference/cli-reference",draft:!1,editUrl:"https://github.com/matanolabs/matano/tree/main/website/docs/reference/cli-reference.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,title:"Matano CLI reference"},sidebar:"tutorialSidebar",previous:{title:"index",permalink:"/docs/detections/"}},i={},c=[{value:"Commands",id:"commands",level:2},{value:"<code>matano autocomplete [SHELL]</code>",id:"matano-autocomplete-shell",level:2},{value:"<code>matano bootstrap</code>",id:"matano-bootstrap",level:2},{value:"<code>matano deploy</code>",id:"matano-deploy",level:2},{value:"<code>matano generate:matano-dir DIRECTORY-NAME</code>",id:"matano-generatematano-dir-directory-name",level:2},{value:"<code>matano help [COMMAND]</code>",id:"matano-help-command",level:2},{value:"<code>matano refresh-context</code>",id:"matano-refresh-context",level:2}],p={toc:c};function s(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"commands"},"Commands"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"#matano-autocomplete-shell"},(0,o.kt)("inlineCode",{parentName:"a"},"matano autocomplete [SHELL]"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"#matano-bootstrap"},(0,o.kt)("inlineCode",{parentName:"a"},"matano bootstrap"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"#matano-deploy"},(0,o.kt)("inlineCode",{parentName:"a"},"matano deploy"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"#matano-generatematano-dir-directory-name"},(0,o.kt)("inlineCode",{parentName:"a"},"matano generate:matano-dir DIRECTORY-NAME"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"#matano-help-command"},(0,o.kt)("inlineCode",{parentName:"a"},"matano help [COMMAND]"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"#matano-refresh-context"},(0,o.kt)("inlineCode",{parentName:"a"},"matano refresh-context")))),(0,o.kt)("h2",{id:"matano-autocomplete-shell"},(0,o.kt)("inlineCode",{parentName:"h2"},"matano autocomplete [SHELL]")),(0,o.kt)("p",null,"display autocomplete installation instructions"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"USAGE\n  $ matano autocomplete [SHELL] [-r]\n\nARGUMENTS\n  SHELL  shell type\n\nFLAGS\n  -r, --refresh-cache  Refresh cache (ignores displaying instructions)\n\nDESCRIPTION\n  display autocomplete installation instructions\n\nEXAMPLES\n  $ matano autocomplete\n\n  $ matano autocomplete bash\n\n  $ matano autocomplete zsh\n\n  $ matano autocomplete --refresh-cache\n")),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"See code: ",(0,o.kt)("a",{parentName:"em",href:"https://github.com/oclif/plugin-autocomplete/blob/v1.3.0/src/commands/autocomplete/index.ts"},"@oclif/plugin-autocomplete"))),(0,o.kt)("h2",{id:"matano-bootstrap"},(0,o.kt)("inlineCode",{parentName:"h2"},"matano bootstrap")),(0,o.kt)("p",null,"Creates initial resources for Matano deployment."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"USAGE\n  $ matano bootstrap [-p <value>] [--user-directory <value>]\n\nFLAGS\n  -p, --profile=<value>     AWS Profile to use for credentials.\n  --user-directory=<value>  Matano user directory to use.\n\nDESCRIPTION\n  Creates initial resources for Matano deployment.\n\nEXAMPLES\n  $ matano bootstrap\n\n  $ matano bootstrap --profile prod\n\n  $ matano bootstrap --profile prod --user-directory my-matano-directory\n")),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"See code: ",(0,o.kt)("a",{parentName:"em",href:"https://github.com/matanolabs/matano/blob/main/cli/src/commands/bootstrap.ts"},"dist/commands/bootstrap.ts"))),(0,o.kt)("h2",{id:"matano-deploy"},(0,o.kt)("inlineCode",{parentName:"h2"},"matano deploy")),(0,o.kt)("p",null,"Deploys matano."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"USAGE\n  $ matano deploy [-p <value>] [-a <value>] [-r <value>] [--user-directory <value>]\n\nFLAGS\n  -a, --account=<value>     AWS Account to deploy to.\n  -p, --profile=<value>     AWS Profile to use for credentials.\n  -r, --region=<value>      AWS Region to deploy to.\n  --user-directory=<value>  Matano user directory to use.\n\nDESCRIPTION\n  Deploys matano.\n\nEXAMPLES\n  $ matano deploy\n\n  $ matano deploy --profile prod\n\n  $ matano deploy --profile prod --user-directory matano-directory\n\n  $ matano deploy --profile prod --region eu-central-1 --account 12345678901\n")),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"See code: ",(0,o.kt)("a",{parentName:"em",href:"https://github.com/matanolabs/matano/blob/main/cli/src/commands/deploy.ts"},"dist/commands/deploy.ts"))),(0,o.kt)("h2",{id:"matano-generatematano-dir-directory-name"},(0,o.kt)("inlineCode",{parentName:"h2"},"matano generate:matano-dir DIRECTORY-NAME")),(0,o.kt)("p",null,"Generates a sample Matano directory to get started."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"USAGE\n  $ matano generate:matano-dir [DIRECTORY-NAME]\n\nARGUMENTS\n  DIRECTORY-NAME  The name of the directory to create\n\nDESCRIPTION\n  Generates a sample Matano directory to get started.\n\nEXAMPLES\n  $ matano generate:matano-dir\n")),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"See code: ",(0,o.kt)("a",{parentName:"em",href:"https://github.com/matanolabs/matano/blob/main/cli/src/commands/generate/matano-dir.ts"},"dist/commands/generate/matano-dir.ts"))),(0,o.kt)("h2",{id:"matano-help-command"},(0,o.kt)("inlineCode",{parentName:"h2"},"matano help [COMMAND]")),(0,o.kt)("p",null,"Display help for matano."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"USAGE\n  $ matano help [COMMAND] [-n]\n\nARGUMENTS\n  COMMAND  Command to show help for.\n\nFLAGS\n  -n, --nested-commands  Include all nested commands in the output.\n\nDESCRIPTION\n  Display help for matano.\n")),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"See code: ",(0,o.kt)("a",{parentName:"em",href:"https://github.com/oclif/plugin-help/blob/v5.1.12/src/commands/help.ts"},"@oclif/plugin-help"))),(0,o.kt)("h2",{id:"matano-refresh-context"},(0,o.kt)("inlineCode",{parentName:"h2"},"matano refresh-context")),(0,o.kt)("p",null,"Refreshes Matano context."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"USAGE\n  $ matano refresh-context [-p <value>] [-a <value>] [-r <value>] [--user-directory <value>]\n\nFLAGS\n  -a, --account=<value>     AWS Account to deploy to.\n  -p, --profile=<value>     AWS Profile to use for credentials.\n  -r, --region=<value>      AWS Region to deploy to.\n  --user-directory=<value>  Matano user directory to use.\n\nDESCRIPTION\n  Refreshes Matano context.\n\nEXAMPLES\n  $ matano refresh-context\n\n  $ matano refresh-context --profile prod\n\n  $ matano refresh-context --profile prod --user-directory my-matano-directory\n\n  $ matano refresh-context --profile prod --region eu-central-1 --account 12345678901\n")),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"See code: ",(0,o.kt)("a",{parentName:"em",href:"https://github.com/matanolabs/matano/blob/main/cli/src/commands/refresh-context.ts"},"dist/commands/refresh-context.ts"))))}s.isMDXComponent=!0}}]);