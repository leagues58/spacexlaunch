
/*****************************************************************************
index.js
creates an express application object (app), deals with some settings and 
middleware assocatied with the app, then exports the app object.
******************************************************************************/


// modules we need
var express       = require('express');
var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');

// route modules we need
var index = require('./routes/index.js');
var users = require('./routes/users.js');

// create the app
var app = express();

// disable telling how our app is served
app.disable('x-powered-by');

// view engine setup. first set up where the templates are stored, then set the template type
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// add some middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// get express to serve up static contect from the public directory
app.use(express.static(path.join(__dirname, 'public')));


// set up routes using previously imported modules
app.use('/', index);
app.use('/users', users);

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

/*
// connect to database
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var mongoose = require('mongoose');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'spacexlaunch';

//Import the mongoose module


//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


*/

// export the app object for use elsewhere (like www.js)
module.exports = app;
