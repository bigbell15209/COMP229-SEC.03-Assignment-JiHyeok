//install 3rd party packages
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors'); //for JWT


//modules for authentication
let session = require('express-session');
let passport = require('passport');

let passportJWT = require('passport-jwt');  //for JWT
let JWTStrategy = passportJWT.Strategy;     //for JWT
let ExtractJWT = passportJWT.ExtractJwt;    //for JWT

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
let booksRouter = require('../routes/book');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');  //  expree -e

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
  resave: false
}));
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



let jwtOptions={}; //for JWT
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken(); //for JWT
jwtOptions.secretOrKey = DB.Secret; //for JWT


let strategy = new JWTStrategy(jwtOptions, (jwt_payload, done) => {
  User.findById(jwt_payload.id)
    .then(user => {
      return done(null, user);
    })
    .catch(err => {
      return done(err,false);
    });
}); //for JWT, set strategy

passport.use(strategy); //for JWT

//routing
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/book-list', booksRouter);



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
