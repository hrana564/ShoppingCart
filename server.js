var PORT = 8000 || process.env.PORT;
var config = require('./utilities/config.js');
var loginRouter=require('./routes/login');
var signupRouter=require('./routes/signup');
var resetPasswordRouter = require('./routes/resetpassword');
var forgotPasswordRouter = require('./routes/forgotpassword');
// var homeRouter=require('./routes/home');
var DB = config.database;
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var morgan = require('morgan');
mongoose.Promise = require('bluebird');

var app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/', mainRouter);
// app.use('/api', apiRouter);
app.use('/',loginRouter);
app.use('/login',loginRouter);
app.use('/signup',signupRouter);
app.use('/forgotPassword',forgotPasswordRouter);
app.use('/resetPassword',resetPasswordRouter);
// app.use('/home',homeRouter);
mongoose.connect(config.database, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("connected to mongoDB");
    }
});
app.set('views', __dirname + '\\views');
app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);   
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, function() {
    console.log('Listening on port ' + PORT);
});