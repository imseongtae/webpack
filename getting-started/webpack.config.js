// webpack.config.js
// `webpack` command will pick up this config setup by default
var path = require('path');

// common.js 모듈 문법
module.exports = {
  mode: 'none',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist') // 첫 번째 인자 폴더 주소 기준
  }
};