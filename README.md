# Webpack
- 여러 파일을 하나로 합치고, 요청을 한 번만 보내기 때문에 네트워크의 `requests`를 줄이는 효과가 있다.
- 브라우저를 위한 사전 컴파일러
- 웹 페이지를 구성하는 모든 자원과 관련된 도구이다


## Table of Contents 
1. [What is the Webpack?](#what-is-the-webpack?)
1. [entry/output](#entry/output)
1. [Loader](#loader)



## What is the Webpack?
웹팩은 여러개 파일을 하나의 파일로 합쳐주는 번들러(bundler)다. 하나의 시작점(entry point)으로부터 의존적인 모듈을 전부 찾아내서 하나의 결과물을 만들어 낸다. app.js부터 시작해 math.js 파일을 찾은 뒤 하나의 파일로 만드는 방식이다.

- 웹 개발 후 압축해야함
- Linter를 통해 에러 없는 방향으로 작성
- 모든 브라우저에 호환가능한 js형태로 변환
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

### 커스텀 로더 만들기


## 웹팩 이전 버전과의 차이점
웹팩 4버전으로 바뀌면서 `mode`설정을 통해 웹팩3 버전의 설정을 개선하게 되었다. 간단한 속성으로 설정을 제어할 수 있음

### 웹팩4 버전의 mode 설정

```javascript
module.exports = {
  mode: 'production', // 웹팩4에서 나온 기능으로 편의성을 개선
}
```

### 웹팩3 버전의 mode 설정

```javascript
// 아래의 코드는 웹팩 버전 3까지의 코드!
if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
```

