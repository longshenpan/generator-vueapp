/**
 * webpack 配置文件
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 清除文件的插件
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 抽取css文件成单独的文件
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
	mode: 'development',
	entry: {
		index: ['webpack-hot-middleware/client?reload=true', './src/main.js']
	},
	output: {
		filename: '[name].[hash:8].js',
		path: path.resolve(__dirname, 'dist')// 此处必须是绝对地址，否则会报错
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'@': resolve('src'),
			'assets': path.resolve(__dirname, '../src/assets')
		}
	},
	devtool: 'inline-source-map',//使用source-map
	module: {
		rules: [{
			test: /\.css$/,
			use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
			  	fallback: "style-loader",
			  	use: "css-loader"
			}))
			// css-loader是处理import @import引入的css文件和url()引入的文件等
			// style-loader是将css文件通过style插入到html中	
			// use: ['style-loader', 'css-loader']
		}]
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new ExtractTextPlugin({
			filename: './[name].[hash:8].css'
		}),
		new HtmlWebpackPlugin({template: './index.html'}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			MOCKAPIHOST: JSON.stringify('http://localhost:8080/')
		})
	]
}