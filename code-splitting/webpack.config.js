var path = require('path');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'none', // production, development, none
  entry: './index.js', // 웹팩으로 변환할 파일의 경로
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/, // css확장자를 가진 모든 파일
        // use: ['css-loader', 'style-loader']
        use: ['style-loader', 'css-loader']
        // use: [
        //   { loader: MiniCssExtractPlugin.loader },
        //   "css-loader"
        // ]
      },
      // {
      //   test: /\.scss$/,
      //   use: ['style-loader', 'css-loader', 'sass-loader']
      // }
    ]
  },
  // plugins: [
  //   new MiniCssExtractPlugin()
  // ],

}