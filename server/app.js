var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var users = require('./routes/users');
var socket = require('./bin/socket');

var isDev = process.env.NODE_ENV !== 'PROD';
var app = express();
var port = 3000;
console.log(3333)
console.log(4444)
console.log(555)
//app.use(history());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// local variables for all views
app.locals.env = process.env.NODE_ENV || 'dev';
app.locals.reload = true;

if (isDev) {
    app.use('/', users);
    app.use(express.static(path.join(__dirname, './public')));
    var fallback = require('express-history-api-fallback')
    var root = __dirname + '/public'
    app.use(fallback('default.html', { root: root }))

    // make page reload
    var reload = require('reload');
    var http = require('http');
    var server = http.createServer(app);
    //reload会影响到socket的状态，所以在使用socket的时候需要关闭它
    // reload(server, app);
    socket(server);
    server.listen(port, function(){
        console.log(process.env.NODE_ENV, 'process.env.NODE_ENV')
        console.log('App (dev) is now running on port 4000!');
    });
} else {
    // static assets served by express.static() for production
    app.use(express.static(path.join(__dirname, './public')));
    //require('./server/routes')(app);
    app.use('/', users);
    app.listen(port, function () {
        console.log('App (production) is now running on port 4000!');
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
