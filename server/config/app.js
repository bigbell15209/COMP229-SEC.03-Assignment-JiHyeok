//After running index.js, It would be running all the codes

//It show where documents, path and location of files and call those.
// 'node_module' is third party package to download and call something such as bootstrap, jquery and express

// in 'public', You can download resources here such as images, style sheet and js file(In this case, it plays a role as IIFE -- Immediately Invoked Function Expression)

// File Name : Assignment1 
// Student's Name : JiHyeok Kim 
// StudentID : 301105279 
// Date : 10/8/2020 

//install 3rd party packages
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

//modules for authentication					
let session = require('express-session');		
let passport = require('passport');				
let passportLocal = require('passport-local');	
let localStrategy = passportLocal.Strategy;		
let flash = require('connect-flash');			

//database setup
let mongoose = require('mongoose');
let DB = require('./db');

//point mongoose to the DB URI
mongoose.connect(DB.URI, {useNewUrlParser: true, useUnifiedTopology: true});

//Check to see server when mongo is created
let dbConnection = mongoose.connection;
dbConnection.on('error', console.error.bind(console, 'Connection Error:'))
dbConnection.once('open',()=>{
  console.log('MongoDB Connection OPEN');
});
dbConnection.once('connected',()=>{
  console.log('MongoDB Connected');
});
dbConnection.on('disconnected',()=>{
  console.log('MongoDB Disconnected');
});
dbConnection.on('reconnected',()=>{
  console.log('MongoDB Reconnected');
});


let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let businessRouter = require('../routes/business');

let app = express();



// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');  

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

//setup express session					
app.use(session({						
  secret: "SomeSecret",					
  saveUninitialized: false,				
  resave:false							
}))										
// initialize flash						
app.use(flash());						
// initialize passport					
app.use(passport.initialize());			
app.use(passport.session());

	// passport user configuration

	// create a User Model Instance
	let userModel = require('../models/user');
	let User = userModel.User;
	
	// implement a User Authentication Strategy(Important)
	passport.use(User.createStrategy());
	
	// serialize and deserialize the User info
	passport.serializeUser(User.serializeUser());
	passport.deserializeUser(User.deserializeUser());

//routing
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/business-list', businessRouter);


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
  res.render('error', { title : 'Error' });
});

module.exports = app;
