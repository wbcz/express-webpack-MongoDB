var express = require('express'),
    path = require('path');

var isDev = process.env.NODE_ENV !== 'production';
var app = express();
var port = 3000;

app.locals.env = process.env.NODE_ENV || 'dev';
app.locals.reload = false;

if (isDev) {
    var webpack = require('webpack'),
        webpackDevMiddleware = require('webpack-dev-middleware'),
        webpackHotMiddleware = require('webpack-hot-middleware'),
        webpackDevConfig = require('./webpack.dev.config.js');

    var compiler = webpack(webpackDevConfig);

    app.use(webpackDevMiddleware(compiler, {
        publicPath: webpackDevConfig.output.publicPath,
        noInfo: true,
        stats: {
            colors: true
        }
    }));
    
    app.use(webpackHotMiddleware(compiler));

    // browsersync is a nice choice when modifying only views (with their css & js)
    var bs = require('browser-sync').create();
    app.listen(port, function(){
        bs.init({
            open: false,
            ui: false,
            notify: false,
            proxy: 'localhost:3000',
            files: ['./client/**'],
            port: 8080
        });
        console.log('App (dev) is going to be running on port 8080 (by browsersync).');
    });

}
