var mongoose = require('mongoose');
var models = require('./schema.js');

mongoose.connection.collections['questions'].drop();
mongoose.connection.collections['answers'].drop();
mongoose.connection.collections['users'].drop();

var u1 = new models.User();
u1.firstName = "John";
u1.lastName = "Doe";
u1.dob = new Date(1950, 12, 12);
u1.gender = "Male";
u1.joinDate = new Date(2017, 1, 1);
u1.diagnosisDate = new Date(2015, 1, 1);
u1.profileType = "Patient";
u1.save();

var u2 = new models.User();
u2.firstName = "Bob";
u2.lastName = "Dylan";
u2.dob = new Date(1970, 12, 12);
u2.gender = "Male";
u2.joinDate = new Date(2017, 1, 1);
u2.profileType = "Caregiver";
u2.patientID = u1._id;
u2.save();

var q1 = new models.Question();
q1.text.patient = "Are you happy?";
q1.text.caregiver = "Is he/she happy?";
q1.answers.patient = ['Yes', 'No']
q1.answers.caregiver = ['Yes', 'No']
q1.frequency.Monday.unshift(60*9);
q1.frequency.Wednesday.unshift(60*9);
q1.frequency.Friday.unshift(60*9);
q1.profileType = "Both";
q1.save();

var a1 = new models.Answer();
a1.questionID = q1._id;
a1.userID = u1._id;
a1.answer = "Yes";
a1.comment = ""
a1.timestamp = Date.now();
a1.save(function(doc) {
    mongoose.connection.close();
});
