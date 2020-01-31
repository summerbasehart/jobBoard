var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var auth = require('./routes/auth');
var category = require('./routes/category');
var applicant = require('./routes/applicant');
var contractor = require('./routes/contractor');
var post = require('./routes/post');
var page = require('./routes/page');
var cors = require('cors')
// var mailer = require('./nodemailer');

mongoose.connect('mongodb://localhost/testApp', { 
    promiseLibrary: require('bluebird'), 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(cors())
app.use(passport.initialize());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', auth);
app.use('/api/page', page);
app.use('/api/category', category);
app.use('/api/post', post);
app.use('/api/applicant', applicant);
app.use('/api/contractor', contractor);

app.use('/api/public', indexRouter);
app.use('/users', usersRouter);

module.exports = app;