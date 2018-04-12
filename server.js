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

// Allow use of poll and answer model
var Poll = require('./app/models/poll');
var Answer = require('./app/models/answer');

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
    res.header("Access-Control-Allow-Origin", "*"); // Added to resolve CORS issue
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
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
      poll._id = new mongoose.mongo.ObjectId();
      poll.question = req.body.question;  // set the poll question (comes from the request)
      // save the poll and check for errors
      poll.save(function(err) {
        if (err)
          res.send(err);

          res.json({ message: 'Poll created!' });
      });
});

// on routes that end in /answers
// ----------------------------------------------------
router.route('/answers')

    // get all the answers (accessed at GET http://localhost:8080/api/polls)
    .get(function(req, res) { // TEST ROUTE
      Answer.find(function(err, answers) {
        if (err)
          res.send(err);

          res.json(answers);
      });
    });
// on routes that end in /polls/:poll_id
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

// on routes that end in /polls/:poll_id/add
// ----------------------------------------------------
router.route('/polls/:poll_id/add')

    // add answers to an existing poll (accessed at POST http://localhost:8080/api/polls/:poll_id/add)
    .post(function(req, res) {
      var answer = new Answer(); // Create new instance of answer
      answer.answer = req.body.answer; // Set answer text (from request body)

      answer.save(function(err) { // Save answer
        if (err)
          res.send(err);

        Poll.findById(req.params.poll_id, function(err, poll) {
          if (err)
            res.send(err);

          poll.answers.push(answer._id); // Reference answer in poll

          poll.save(function(err) {
            if (err)
              res.send(err);

            res.json({ message: 'Successfully added answer' });
          });
        });
      });
    });

// on routes that end in /polls/:poll_id/all
// ----------------------------------------------------
router.route('/polls/:poll_id/all')

    // get all answers for poll with that id (accessed at GET http://localhost:8080/api/polls/:poll_id)
    .get(function(req, res) {
      Poll.findById(req.params.poll_id) // Select poll requested by user
        .populate('answers') // Find all answers referencing specific poll
        .exec(function(err, answers) {
        if (err)
          res.send(err);

        res.json(answers);
      });
    });

// on routes that end in /polls/:poll_id/:answer_id/vote
// ----------------------------------------------------
router.route('/polls/:poll_id/:answer_id/vote')

    .put(function (req, res) {
      Answer.findById(req.params.answer_id, function(err, answer) {
        if (err)
          res.send(err);

        answer.votes += 1; // Add one to vote tally

        answer.save(function(err) {
          if (err)
            res.send(err);

          res.json({ message: 'Vote saved' });
        });
      });
    });

// on routes that end in /answers/:answer_id
// ----------------------------------------------------
router.route('/answers/:answer_id')

    // delete the answer with this id (accessed at DELETE http://localhost:8080/api/answers/:answer_id)
    .delete(function(req, res) {
      Answer.remove({
        _id: req.params.answer_id
      }, function(err, answer) {
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
