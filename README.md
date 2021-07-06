# Webpack

## Table of Contents 
1. [What is the Webpack?](#what-is-the-webpack?)
1. [entry/output](#entry/output)
1. [Loader](#loader)



## What is the Webpack?
웹팩은 여러개 파일을 하나의 파일로 합쳐주는 번들러(bundler)다. 하나의 시작점(entry point)으로부터 의존적인 모듈을 전부 찾아내서 하나의 결과물을 만들어 낸다. app.js부터 시작해 math.js 파일을 찾은 뒤 하나의 파일로 만드는 방식이다.

- 여러 파일을 하나로 합치고, 요청을 한 번만 보내기 때문에 네트워크의 `requests`를 줄이는 효과가 있다.
- 브라우저를 위한 사전 컴파일러(모든 브라우저에 호환가능한 js형태로 변환)
- 웹 페이지를 구성하는 모든 자원과 관련된 도구이다
  - CSS 최적화
  - img 최적화


## entry/output
번들 작업을 하는 `webpack` 패키지와 웹팩 터미널 도구인 `webpack-cli` 설치

### Install Webpack

```bash
yarn add webpack webpack-cli -D
```

### 실행 가능한 명령어
node_modules/.bin 폴더에 실행 가능한 명령어가 생김
- `--mode`는 웹팩 실행 모드는 의미하는데 개발 버전인 development를 지정한다. (development, production, none을 설정할 수 있음)
- `--entry`는 시작점 경로를 지정하는 옵션이다
- `--output`은 번들링 결과물을 위치할 경로다

```bash
$ node_modules/.bin/webpack --help

  --mode                 Enable production optimizations or development hints.
                                     [선택: "development", "production", "none"]
  --entry      The entry point(s) of the compilation.                   [문자열]
  --output, -o                  The output path and file for compilation assets
```

### --config 옵션 항목
이 옵션은 웹팩 설정파일의 경로를 지정할 수 있는데 기본 파일명이 webpack.config.js 혹은 webpackfile.js다. 

```bash
$ node_modules/.bin/webpack --help

  --config               Path to the config file
                         [문자열] [기본: webpack.config.js or webpackfile.js]
```

webpack.config.js 파일을 만들어 방금 터미널에서 사용한 옵션을 설정하기

```js
const path = require("path")

module.exports = {
  mode: "development", // webpack의 모드 설정 가능
  entry: {
    main: "./src/app.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve("./dist"),
  },
}
```

모든 옵션을 웹팩 설정 파일로 옮겼기 때문에 단순히 `webpack` 명령어만 실행한다. 이제부터는 npm run build로 웹팩 작업을 지시할 수 있다.

```json
{
  "scripts": {
    "build": "./node_modules/.bin/webpack"
  }
}
```

### Webpack build 파일 분석
- 1 ~85번까지 webpack 내부관련 로직(살펴볼 필요가 없음)
- 87 ~ IIFE(끝까지 Immediately Invoked Function Expression)임


```bash
Hash: 93c945336310295020b1 # 특정 빌드마다 고유의 해쉬가 붙음
Version: webpack 4.42.0 # 버전
Time: 348ms # 소요시간
Built at: 2020-03-23 11:15:00 AM # 언제 빌드했는지
    Asset      Size  Chunks             Chunk Names
bundle.js  13.9 KiB       0  [emitted]  main
Entrypoint main = bundle.js # 제일 중요! 모듈의 해석 순서
[0] ./index.js 22 bytes {0} [built]
[1] ./base.css 558 bytes {0} [built]
[3] ./node_modules/css-loader/dist/cjs.js!./base.css 257 bytes {0} [built]
    + 2 hidden modules
```

## Loader

### 로더의 역할
웹팩은 모든 파일을 모듈로 바라본다. 자바스크립트로 만든 모듈 뿐만아니라 스타일시트, 이미지, 폰트까지도 전부 모듈로 보기 때문에 import 구문을 사용하면 자바스크립트 코드 안으로 가져올수 있다.

이것이 가능한 이유는 웹팩의 로더 덕분이다. 로더는 타입스크립트 같은 다른 언어를 자바스크립트 문법으로 변환해 주거나 이미지를 data URL 형식의 문자열로 변환한다. 뿐만아니라 CSS 파일을 자바스크립트에서 직접 로딩할수 있도록 해준다.


```javascript
// js파일에서 css파일을 임포트하기 위해선 로더가 필요하고, dist파일의 결과물에 반영할 수 있음
exports.push([module.i, "p {\r\n  color: blue;\r\n}", ""]);
```

## 자주 사용하는 로더

### css-loader
웹팩은 모든것을 모듈로 바라보기 때문에 자바스크립트 뿐만 아니라 스타일시트로 import 구문으로 불러 올수 있다.


```js
// app.js
import "./style.css"
```

CSS 파일을 자바스크립트에서 불러와 사용하려면 CSS를 모듈로 변환하는 작업이 필요하다. css-loader가 그러한 역할을 하는데 우리 코드에서 CSS 파일을 모듈처럼 불러와 사용할 수 있게끔 해준다.

```bash
yarn add -D css-loader
```

**웹팩 설정에 로더를 추가**  
웹팩은 엔트리 포인트부터 시작해서 모듈을 검색하다가 CSS 파일을 찾으면 css-loader로 처리할 것이다. use.loader에 로더 경로를 설정하는 대신 배열에 로더 이름을 문자열로 전달해도 된다.

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/, // .css 확장자로 끝나는 모든 파일
        use: ["css-loader"], // css-loader를 적용한다
      },
    ],
  },
}
```

### style-loader
모듈로 변경된 스타일 시트는 돔에 추가되어야만 브라우져가 해석할 수 있다. css-loader로 처리하면 자바스크립트 코드로만 변경되었을 뿐 돔에 적용되지 않았기 때문에 스트일이 적용되지 않았다.

style-loader는 자바스크립트로 변경된 스타일을 동적으로 돔에 추가하는 로더이다. CSS를 번들링하기 위해서는 css-loader와 style-loader를 함께 사용한다.

```bash
$ yarn add -D style-loader
```

`webpack.config.js`

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"], // style-loader를 앞에 추가한다
      },
    ],
  },
}
```

### file-loader
CSS 뿐만 아니라 소스코드에서 사용하는 모든 파일을 모듈로 사용하게끔 할 수 있다. 파일을 모듈 형태로 지원하고 웹팩 아웃풋에 파일을 옮겨주는 것이 file-loader가 하는 일이다. 가령 CSS에서 url() 함수에 이미지 파일 경로를 지정할 수 있는데 웹팩은 file-loader를 이용해서 이 파일을 처리한다.


```bash
$ yarn add -D file-loader
```

### url-loader
사용하는 이미지 갯수가 많다면 네트웍 리소스를 사용하는 부담이 있고 사이트 성능에 영향을 줄 수도 있다. 만약 한 페이지에서 작은 이미지를 여러 개 사용한다면 Data URI Scheme을 이용하는 방법이 더 나은 경우도 있다. 이미지를 Base64로 인코딩하여 문자열 형태로 소스코드에 넣는 형식이다.

url-loader는 이러한 처리를 자동화해준다.

```bash
$ yarn add -D url-loader
```


## Plugin
웹팩에서 알아야 할 마지막 기본 개념이 플러그인. 로더가 파일 단위로 처리하는 반면 플러그인은 번들된 결과물을 처리. 번들된 자바스크립트를 난독화 한다거나 특정 텍스트를 추출하는 용도로 사용


### 6.1 BannerPlugin
결과물에 빌드 정보나 커밋 버전같은 걸 추가할 수 있다.

webpack.config.js

```js
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.BannerPlugin({
      banner: '이것은 배너 입니다',
    })
  ]
```

### 6.1 DefinePlugin
어플리케이션은 개발환경과 운영환경으로 나눠서 운영한다. 가령 환경에 따라 API 서버 주소가 다를 수 있다. 같은 소스 코드를 두 환경에 배포하기 위해서는 이러한 환경 의존적인 정보를 소스가 아닌 곳에서 관리하는 것이 좋다. 배포할 때마다 코드를 수정하는 것은 곤란하기 때문이다.

웹팩은 이러한 환경 정보를 제공하기 위해 DefinePlugin을 제공한다.

webpack.config.js

```js
const webpack = require('webpack');

module.exports = {
  plugins: [
    // 빈 객체를 전달해도 기본적으로 넣어주는 값이 있다. 노드 환경정보인 process.env.NODEENV 인데 웹팩 설정의 mode에 설정한 값이 여기에 들어간다. "development"를 설정했기 때문에 어플리케이션 코드에서 process.env.NODEENV 변수로 접근하면 "development" 값을 얻을 수 있다.
    new webpack.DefinePlugin({
      VERSION: JSON.stringify("v.1.2.3"),
      PRODUCTION: JSON.stringify(false),
      MAX_COUNT: JSON.stringify(999),
      "api.domain": JSON.stringify("http://dev.api.domain.com"),
    })
  ]
```