const path = require("path");
const webpack = require('webpack');
const banner = require("./src/banner");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve("./dist"),
  },
  plugins: [
    new webpack.BannerPlugin(banner),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify("v.1.2.3"),
      PRODUCTION: JSON.stringify(false),
      MAX_COUNT: JSON.stringify(999),
      "api.domain": JSON.stringify("http://dev.api.domain.com"),
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/, // .js 확장자로 끝나는 모든 파일
        use: [path.resolve('./src/myloader.js')] // 방금 만든 로더를 적용한다
      },
      {
        test: /\.css$/, // .css 확장자로 끝나는 모든 파일
        use: ["style-loader", "css-loader"], // style-loader를 앞에 추가한다. 배열로 설정하면 뒤에서부터 앞의 순서로 로더가 동작
      },
      {
        test: /\.png$/, // .png 확장자로 마치는 모든 파일
        loader: "file-loader", // 파일 로더를 적용한다
        options: {
          publicPath: "./dist/", // prefix를 아웃풋 경로로 지정
          name: "[name].[ext]?[hash]", // 파일명 형식
        },
      },
      {
        // test: /\.png$/,
        // use: {
        //   loader: 'url-loader', // url 로더를 설정한다
        //   options: {
        //     publicPath: './dist/', // file-loader와 동일
        //     name: '[name].[ext]?[hash]', // file-loader와 동일
        //     limit: 5000 // 5kb 미만 파일만 data url로 처리
        //   }
        // }
      }
    ],
  }
}