// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// Configure dotenv package to bring in DB location
require('dotenv').config();
var host = process.env.DB_HOST;

// Connect to mLab database
var mongoose = require('mongoose');
mongoose.connect(host, function(error){
    if(error) console.log(error);

        console.log("connection successful");
}); // connect to our database

// Allow use of poll model
var Poll = require('./app/models/poll');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// on routes that end in /polls
// ----------------------------------------------------
router.route('/polls')

    // get all the polls (accessed at GET http://localhost:8080/api/polls)
    .get(function(req, res) {
      Poll.find(function(err, polls) {
        if (err)
          res.send(err);

          res.json(polls);
      });
    })

    // create a poll (accessed at POST http://localhost:8080/api/polls)
    .post(function(req, res) {
      var poll = new Poll();      // create a new instance of the Poll model
      poll.question = req.body.question;  // set the poll question (comes from the request)

      // save the poll and check for errors
      poll.save(function(err) {
        if (err)
          res.send(err);

          res.json({ message: 'Poll created!' });
      });
});

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/polls/:poll_id')

    // get the poll with that id (accessed at GET http://localhost:8080/api/polls/:poll_id)
    .get(function(req, res) {
      Poll.findById(req.params.poll_id, function(err, poll) {
        if (err)
          res.send(err);
        res.json(poll);
      });
    })

    // delete the poll with this id (accessed at DELETE http://localhost:8080/api/polls/:poll_id)
    .delete(function(req, res) {
    Poll.remove({
      _id: req.params.poll_id
    }, function(err, poll) {
      if (err)
        res.send(err);

      res.json({ message: 'Successfully deleted' });
    });
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
