var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var questionSchema = new Schema({
    text            :    String,
    answers         :    [String],
    frequency       :    {
        Monday      :    [Number],
        Tuesday     :    [Number],
        Wednesday   :    [Number],
        Thursday    :    [Number],
        Friday      :    [Number],
        Saturday    :    [Number],
        Sunday      :    [Number]
    }
});

var answerSchema = new Schema({
    questionID      :   ObjectId,
    answers         :   Number,
    timestamp       :   Date
});

mongoose.connect('mongodb://localhost/hack4health');

var Question = mongoose.model('questions', questionSchema);
var Answer = mongoose.model('answers', answerSchema);

exports.Question = Question;
exports.Answer = Answer;
