const express = require('express');
const path = require('path');
const app = express();
const webpack = require('webpack');
const proxyMiddleware = require('http-proxy-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevConfig = require('./webpack.dev.config.js');
const compiler = webpack(webpackDevConfig);

let {rootPath, distPath, publicPath, provideItems, proxyConfi, port} = require('../config/index')

// app.use(require('connect-history-api-fallback')())

app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath,
    noInfo: true,
    stats: {
        colors: true
    }
}));

app.use(webpackHotMiddleware(compiler));

var proxy = proxyMiddleware('/', proxyConfi);

app.use('/', proxy);

compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    webpackHotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

app.listen(port, function() {
    console.log('App (dev) is going to be running on the port of 3000');
})
