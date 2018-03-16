var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PollSchema = new Schema({
  _id: Schema.Types.ObjectId,
  question: String,
  answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }]
});

module.exports = mongoose.model('Poll', PollSchema);
