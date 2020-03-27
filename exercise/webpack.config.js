var path = require('path') // node path api 변수에 할당
var webpack = require('webpack') // webpack api 가져오는 구나?!
// webpack api 가져오면 그대로 쓸 수 있는 건가?

module.exports = {
  mode: 'production', // 웹팩4에서 나온 기능 편의성을 개선
  entry: './src/main.js', // 웹팩으로 변환할 대상파일, 진입점
  output: { // 대상파일을 변환한 결과물을 담는 정보
    path: path.resolve(__dirname, './dist'), // path 라이브러리의 API resolve
    publicPath: '/dist/', // CDN주소에 포함되게끔 속성 정의, 파일들이 위치할 서버상의 경로
    filename: 'build.js' // 결과물
  },
  module: { // 로더의 속성 정의
    rules: [
      { // css확장자를 가진 파일을 css-loader로 가져오고, vue에 적용
        test: /\.css$/, 
        use: [
          'vue-style-loader', // vue프레임워크와 연관된 로더
          'css-loader' // js파일이 아닌 css파일을 인식할 수 있도록 로더를
        ],
      },      
      {
        test: /\.vue$/, 
        loader: 'vue-loader', // vue 파일을 인식할 수 있도록 로더를 넣어줌
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/, // babel-loader가 js확장자 파일을 컴파일
        loader: 'babel-loader', // js최신 문법을 여러 브라우저가 호환할 수 있도록 도움 
        exclude: /node_modules/ // 제외할 폴더, 라이브러리와 관련되므로 굳이 변환X
      },
      { // 이미지들을 파일로더를 통해 인식하도록 옵션을 줌
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]' // hash는 매번 웹팩 컴파일시 랜덤한 문자열을 붙인다.
        }
      }
    ]
  },
  // 웹팩으로 파일을 해석해나갈 때(파일 연관관계) 해석방식을 정의함
  resolve: { 
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // vue$가 들어가는 것은 value에 정의한 파일로 해석하겠다는 뜻, 정확한 일치를 위해 $를 붙인다
    },    
    extensions: ['*', '.js', '.vue', '.json'] // 확장자 붙이지 않아도 인식하도록 도움
  },
  devServer: {
    historyApiFallback: true, // ? 404page 대신 제공하는 것
    noInfo: true, // 웹팩 번들정보를 표시하지 않는다
    overlay: true // show only compiler errors
  },
  performance: {
    hints: false //asset created that is over 250kb, No hint warnings or errors are shown
  },
  devtool: '#eval-source-map' // 배포에는 ㄴㄴ, 빌드시간에 대한 부담없이 소스맵 생성 가능
  // 개발자 도구의 빌드된 파일과 실제 파일을 연결하는 링크를 제공해줌
}


// 아래의 코드는 웹팩 버전 3까지의 코드!
// if (process.env.NODE_ENV === 'production') {
//   module.exports.devtool = '#source-map'
//   // http://vue-loader.vuejs.org/en/workflow/production.html
//   module.exports.plugins = (module.exports.plugins || []).concat([
//     new webpack.DefinePlugin({
//       'process.env': {
//         NODE_ENV: '"production"'
//       }
//     }),
//     new webpack.optimize.UglifyJsPlugin({
//       sourceMap: true,
//       compress: {
//         warnings: false
//       }
//     }),
//     new webpack.LoaderOptionsPlugin({
//       minimize: true
//     })
//   ])
// }