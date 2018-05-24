// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');

require('./config/passport')(passport); // pass passport for configuration

// Configure dotenv package to bring in DB location
//require('dotenv').config();
var host = process.env.DB_HOST; //uses heroku config vars in production

// Connect to mLab database
var mongoose = require('mongoose');
mongoose.connect(host, function(error){
  if(error)
    console.log(error);

  console.log("connection successful");
}); // connect to our database

// Allow use of poll and answer model
var Poll = require('./app/models/poll');
var Answer = require('./app/models/answer');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'testsecretayit' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

var port = process.env.PORT || 8080;        // set our port


// ROUTES FOR OUR API
// =============================================================================
require('./routes/user.js')(app, passport);
var pollRoutes = require('./routes/polls.js');

// all of our poll routes will be prefixed with /api
app.use('/api', pollRoutes);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
//Heroku defaults to .NODE_ENV === production
//if on Heroku, serve build files
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
};
