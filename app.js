var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var countriesRouter = require('./routes/countries');
var categoriesRouter = require('./routes/categories');
var gendersRouter = require('./routes/genders');
var actorsRouter = require('./routes/actors');
var moviesRouter = require('./routes/movies');
var usersRouter = require('./routes/users');

var app = express();
app.use(cors());
require('dotenv').config({path: __dirname + '/.env'});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/countries', countriesRouter);
app.use('/categories', categoriesRouter);
app.use('/genders', gendersRouter);
app.use('/actors', actorsRouter);
app.use('/movies', moviesRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
