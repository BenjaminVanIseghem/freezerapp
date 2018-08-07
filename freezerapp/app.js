var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
let passport = require('passport');

//require data items
require('./models/Freezer');
require('./models/Compartment');
require('./models/Item');
require('./models/User');
require('./config/passport');


//mongoose
var mongoose = require('mongoose');
mongoose.connect( process.env.FREEZER_DATABASE || 'mongodb://benjamin:Polkiu967@ds227570.mlab.com:27570/freezer-db', { useNewUrlParser: true },
err => {
    if (err) throw err;
    console.log(`Successfully connected to database.`);
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/dist'));                  

app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/API/users', usersRouter);

app.all('*', (req, res) => {
  const indexFile = `${path.join(__dirname, 'dist')}/index.html`;
  console.log(indexFile);
  res.status(200).sendFile(indexFile);
}); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
