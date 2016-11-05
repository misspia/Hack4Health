var mongoose = require('mongoose');
var models = require('./schema.js');

mongoose.connection.collections['questions'].drop();
mongoose.connection.collections['answers'].drop();

var q1 = new models.Question();
q1.text = "Are you happy?";
q1.answers.unshift("Yes", "No");
q1.frequency.Monday.unshift(60*9);
q1.frequency.Wednesday.unshift(60*9);
q1.frequency.Friday.unshift(60*9);
q1.save();

var a1 = new models.Answer();
a1.questionID = q1._id;
a1.answer = 0;
a1.timestamp = Date.now();
a1.save(function(doc) {
  models.Question.find({'_id': q1._id}).exec(function(err, data) {
    console.log(data);
    mongoose.connection.close();
  });
});
