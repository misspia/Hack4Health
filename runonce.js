var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId; 

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/hack4health');

var questionSchema = new Schema({
  text:  String,
  answers: [String],
  frequency: {
    // number of minutes from midnight
    Monday: [Number],
    Tuesday: [Number],
    Wednesday: [Number],
    Thursday: [Number],
    Friday: [Number],
    Saturday: [Number],
    Sunday: [Number]
  }
});

var answerSchema = new Schema({
  // object ID of question
  questionID: ObjectId,
  // array index
  answer: Number,
  timestamp: Date
});

var Question = mongoose.model('questions', questionSchema);
var Answer = mongoose.model('answers', answerSchema);

mongoose.connection.collections['questions'].drop();
mongoose.connection.collections['answers'].drop();

var q1 = new Question();
q1.text = "Are you happy?";
q1.answers.unshift("Yes", "No");
q1.frequency.Monday.unshift(60*9);
q1.frequency.Wednesday.unshift(60*9);
q1.frequency.Friday.unshift(60*9);
q1.save();

var a1 = new Answer();
a1.questionID = q1._id;
a1.answer = 0;
a1.timestamp = Date.now();
a1.save(function(doc) {
  Question.find({'_id': q1._id}).exec(function(err, data) {
    console.log(data);
    mongoose.connection.close();
  });
});

