var path = require('path');

module.exports = {
	mode: 'production',
	entry: './js/app.js',
	output: {
			path: path.resolve(__dirname, 'build'),
			filename: 'main.bundle.js'
	},
	module: {
		rules: [{
			test: /\.m?js$/,
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env']
				}
			}
		}]
	},
	stats: {
			colors: true
	},
	devtool: 'source-map'
};

/*
세 번째 강의인 [ES6 Modules 실습] 
강의 하단의 링크가 작동하지 않습니다..ㅠㅠ..
404 Not 
https://github.com/joshua1988/LearnWebpack/tree/master/es6-modules﻿
*/