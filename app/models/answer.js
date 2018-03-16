var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnswerSchema = new Schema({
  parentPoll: {type: Schema.Types.ObjectId, ref: 'Poll'},
  answer: String,
  votes: {
    type: Number,
    default: 0,
  }
});

module.exports = mongoose.model('Answer', AnswerSchema);
