
```bash
npm init -y # npm 기반 프로젝트 진행 선언
```
npm i webpack webpack-cli -D
npm i lodash

## Webpack

- 여러 파일을 하나로 합치고, 요청을 한 번만 보내기 때문에 네트워크의 `requests`를 줄이는 효과가 있다.
- 브라우저를 위한 사전 컴파일러
- 웹 페이지를 구성하는 모든 자원과 관련된 도구이다

### Webpack의 역할: 최적화
- 웹 개발 후 압축해야함
- Linter를 통해 에러 없는 방향으로 작성
- 모든 브라우저에 호환가능한 js형태로 변환..!
- CSS 최적화
- img 최적화

### Webpack의 모드 3가지
- development: 개발 모드
- production: 배포때는 꼭!
- none: "webpack --mode=none"

#### webpack.config.js
`webpack.config.js`를 통해 
build 명령어를 통해 실행하는 webpack의 모드를 설정할 수 있다.

### Webpack build 파일 분석
- 1 ~85번까지 webpack 내부관련 로직(살펴볼 필요가 없음)
- 87 ~ IIFE(끝까지 Immediately Invoked Function Expression)임

### webpack이 다른 웹 테스크 매니저와의 차이점
- 진입점이 하나이다.!



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

### 로더!
자바스크립트가 아닌 파일을 변환할 수 있게 웹팩 안으로 가져오는 게 로더!

js파일에서 css파일을 임포트하기 위해선 로더가 필요하고, 이를 통해 dist파일의 결과물에 반영할 수 있다.

```javascript
exports.push([module.i, "p {\r\n  color: blue;\r\n}", ""]);
```