var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CommentSchema   = new Schema({
	text: String,
	timestamp: Date,
	coursecode: String
});

module.exports = mongoose.model('Comment', CommentSchema);