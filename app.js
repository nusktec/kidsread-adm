let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let cors = require('cors');
let jsonParser = bodyParser.json();
let logger = require('morgan');
let modelInitializer = require('./models/init');
let auth = require('./auth/auth');
let util = require('./utils/utils');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let moduleRouter = require('./routes/module');

let app = express();

//run models
new modelInitializer();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(jsonParser);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//manage cors
app.options('*', cors());
//top level app middle ware and header control
app.use(auth.allowHeaders);
app.use(auth.friendToken);
//start routing
app.use('/', indexRouter);
//handshake
app.use('/api/handshake', (req, res, next) => {
    res.json({status: true, data: [], msg: "successfully connected !"});
});
//
app.use('/api/user', usersRouter);
app.use('/api/module', moduleRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    util.Jwr(res, false, {}, "Error: " + err.status)
});

module.exports = app;
