var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

var Question = mongoose.model('questions', questionSchema);

var collections = mongoose.connection.collections['questions'];
collections.drop();

var q1 = new Question();
q1.text = "Are you happy?";
q1.answers.unshift("Yes", "No");
q1.frequency.Monday.unshift(60*9);
q1.frequency.Wednesday.unshift(60*9);
q1.frequency.Friday.unshift(60*9);
q1.save()
console.log(q1.text);

mongoose.connection.close()
