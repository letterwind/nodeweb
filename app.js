var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();
var flow = require('./flow-node.js')('tmp');

var mysql = require('mysql');


var connection = mysql.createConnection({
  host  : '106.107.179.67',
  user : 'root@192.168.0.12',
  password : '@Mediaedge4',
  database : 'nodeweb'
});

connection.connect(function(err){
  if(err){
    console.log('connecting error');
    return;
  }
  console.log('connecting success');
});

// connection.query('select 1+1 as aaa',function(err,rows,fields){
//   if(err)throw err;
//   console.log('The aaa is ',rows[0].aaa);
// });

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testRouter = require('./routes/test');
var uploadTestRouter = require('./routes/upload-test');

var app = express();
app.use(function(req,res,next){
  req.connection = connection;
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var requestTime = function(req,res,next){
  req.requestTime = Date.now();
  next();
};

app.use(requestTime);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/test', testRouter);
app.use('/upload-test', uploadTestRouter);

app.set('view engine','pug');

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
  res.json(
    {
      message:err.message,
      error:err
    });
});


// connection.end();
module.exports = app;
