var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnswerSchema = new Schema({
  answer: String,
  votes: Number
});

var PollSchema = new Schema({
  question: String,
  answers: [AnswerSchema]
});

module.exports = mongoose.model('Poll', PollSchema);
