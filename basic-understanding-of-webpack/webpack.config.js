const path = require("path");
const webpack = require('webpack');
const banner = require("./src/banner");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve("./dist"),
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    // publicPath: "/",
    overlay: true,
    port: 3000,
    // stats: "errors-only",
    historyApiFallback: true,
  },
  plugins: [
    new webpack.BannerPlugin(banner),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify("v.1.2.3"),
      PRODUCTION: JSON.stringify(false),
      MAX_COUNT: JSON.stringify(999),
      "api.domain": JSON.stringify("http://dev.api.domain.com"),
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html', // 템플릿 경로를 지정
      templateParameters: { // 템플릿에 주입할 파라매터 변수 지정
        env: process.env.NODE_ENV === 'development' ? '(개발용)' : '',
      },
      minify: process.env.NODE_ENV === 'production' ? {
        collapseWhitespace: true, // 빈칸 제거
        removeComments: true, // 주석 제거
      } : false,
      hash: true, // 정적 파일을 불러올때 쿼리문자열에 웹팩 해쉬값을 추가한다
    }),
    new CleanWebpackPlugin(),
    // 프로덕션 환경일 경우 플러그인 추가, filename에 설정한 값으로 CSS 파일이 생성됨
    ...(process.env.NODE_ENV === "production"
    ? [new MiniCssExtractPlugin({ filename: `[name].css` })]
    : []),
  ],
  module: {
    rules: [
      {
        test: /\.js$/, // .js 확장자로 끝나는 모든 파일
        use: [path.resolve('./src/myloader.js')] // 방금 만든 로더를 적용한다
      },
      {
        test: /\.css$/, // .css 확장자로 끝나는 모든 파일
        use: [
          // style-loader를 앞에 추가한다. 배열로 설정하면 뒤에서부터 앞의 순서로 로더가 동작
          process.env.NODE_ENV === "production"
            ? MiniCssExtractPlugin.loader // 프로덕션 환경
            : "style-loader", // 개발 환경
          "css-loader"
        ], 
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