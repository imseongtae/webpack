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

