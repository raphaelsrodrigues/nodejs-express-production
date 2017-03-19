var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var about = require('./routes/about');
var contact = require('./routes/contact');
var portfolio = require('./routes/portfolio');
var users = require('./routes/users');
var event_management = require('./routes/event_management');

var app = express();

var ML = require('express-metatag')('tags', true)
app.use(ML([{
    'og:type'           : 'website',
    'og:title'          : "My Nodejs Express Web App",
    'og:description'    : 'An Express Framework Project',
    'og:url'            : 'http://www.raph-web.eu',
    'og:image'          : '//images/torn-paper-img.png'
}]));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/about', about);
app.use('/contact', contact);
app.use('/portfolio', portfolio);
app.use('/users', users);
app.use('/event_management', event_management);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
