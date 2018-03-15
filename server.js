// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// Connect to mLab database
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/voting_app', function(error){
    if(error) console.log(error);

        console.log("connection successful");
}); // connect to our database

// Allow use of bear model
//var Bear = require('./app/models/bear');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port


// ROUTES FOR OUR API
// =============================================================================

// ROUTES WILL BE ADDED HERE


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
