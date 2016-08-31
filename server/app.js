var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var users = require('./routes/users');

var isDev = process.env.NODE_ENV !== 'production';
var app = express();
var port = 3000;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// local variables for all views
app.locals.env = process.env.NODE_ENV || 'dev';
app.locals.reload = true;

if (isDev) {
    // static assets served by webpack-dev-middleware & webpack-hot-middleware for development
    var webpack = require('webpack'),
        webpackDevMiddleware = require('webpack-dev-middleware'),
        webpackHotMiddleware = require('webpack-hot-middleware'),
        webpackDevConfig = require('../webpack.config.js');

    var compiler = webpack(webpackDevConfig);

    // attach to the compiler & the server
    app.use(webpackDevMiddleware(compiler, {

        // public path should be the same with webpack config
        dynamicPublicPath : webpackDevConfig.output.publicPath,
        noInfo: true,
        stats: {
            colors: true
        }
    }));
    app.use(webpackHotMiddleware(compiler));

    //require('./server/routes')(app);
    app.use('/', users);
    // add "reload" to express, see: https://www.npmjs.com/package/reload
    var reload = require('reload');
    var http = require('http');

    var server = http.createServer(app);
    reload(server, app);
    server.listen(port, function(){
        console.log('App (dev) is now running on port 3000!');
    });
    // var bs = require('browser-sync').create();
    // app.listen(port, function(){
    //     bs.init({
    //         open: false,
    //         ui: false,
    //         notify: false,
    //         proxy: 'http://localhost:3000/',
    //         files: ['./server/views/**'],
    //         port: 8081
    //     });
    //     console.log('App (dev) is going to be running on port 8081 (by browsersync).');
    // });
} else {
    // static assets served by express.static() for production
    app.use(express.static(path.join(__dirname, 'public')));
    //require('./server/routes')(app);
    app.use('/', users);
    app.listen(port, function () {
        console.log('App (production) is now running on port 3000!');
    });
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
