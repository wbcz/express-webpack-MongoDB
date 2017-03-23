const express = require('express');
const path = require('path');
const app = express();
let port = 3000;

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevConfig = require('./webpack.dev.config.js');

const compiler = webpack(webpackDevConfig);

app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath,
    noInfo: true,
    stats: {
        colors: true
    }
}));

app.use(webpackHotMiddleware(compiler));

// browsersync is a nice choice when modifying only views (with their css & js)
const bs = require('browser-sync').create();

app.listen(port, function(){
    bs.init({
        open: false,
        ui: false,
        notify: false,
        proxy: 'localhost:3000',
        files: ['../client/**'],
        port: 8080
    });
    console.log('App (dev) is going to be running');
});