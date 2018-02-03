var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');

var test = require('./routes/test');



var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var about = require('./routes/about');
var mypage = require('./routes/mypage');
var signup = require('./routes/signup');
// var community = require('./routes/community');
var community = require('./routes/community');
var logout = require('./routes/logout');
var moment = require('moment');
var shortDateFormat = "ddd @ h:mmA";

var app = express();
app.locals.moment = moment;
app.locals.shortDateFormat = shortDateFormat;


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
app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true

    }
));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());


app.use('/', index);


app.use('/test', test);
app.use('/users', users);
app.use('/login', login);
app.use('/logout', logout);
app.use('/about', about);
app.use('/mypage', mypage);
app.use('/signup', signup);
app.use('/community', community);

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
