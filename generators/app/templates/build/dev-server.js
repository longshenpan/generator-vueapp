const Express = require('express');
const Webpack = require('webpack');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const WebpackHotMiddleware = require('webpack-hot-middleware');
const Path = require('path');
const config = require('./webpack.config.js');
const opn = require('opn');// 打开浏览器插件
const App = Express();
const Compiler = Webpack(config);
let devMiddleware = WebpackDevMiddleware(Compiler, {
	lazy: false,
	watchOptions: {
		aggregateTimeout: 300,
		ignored: /node_modules/,
		poll: false
	}
});

let hotMiddleware = WebpackHotMiddleware(Compiler, {
  log: () => {},
  heartbeat: 2000
})

App.use('/libs', Express.static(Path.join(process.cwd(), 'static')))
	.use(devMiddleware)
	.use(hotMiddleware);
let uri = 'http://localhost:8080';
devMiddleware.waitUntilValid(() => {
  	console.log('> Listening at ' + uri + '\n')
  	// when env is testing, don't need open it
  	// if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  	// }
  // _resolve()
})

App.listen(8080, err => {
	if (err) {
		throw new Error(err);
	}
})