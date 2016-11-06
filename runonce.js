var mongoose = require('mongoose');
var models = require('./models/schema.js');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

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
u2.firstName = "Jane";
u2.lastName = "Doe";
u2.dob = new Date(1970, 12, 12);
u2.gender = "Female";
u2.joinDate = new Date(2017, 1, 1);
u2.profileType = "Caregiver";
u2.patientID = u1._id;
u2.save();

var q1 = new models.Question();
q1.text.patient = "Are you happy?";
q1.text.caregiver = "Is he/she happy?";
q1.answers.patient = ['Yes', 'No'];
q1.answers.caregiver = ['Yes', 'No'];
q1.frequency.Monday.unshift(60*9);
q1.frequency.Wednesday.unshift(60*9);
q1.frequency.Friday.unshift(60*9);
q1.frequency.Saturday.unshift(60*22);
q1.profileType = "Both";
q1.save();

var q2 = new models.Question();
q2.text.patient = "Did you eat lunch?";
q2.text.caregiver = "Did he/she eat lunch?";
q2.answers.patient = ['Yes', 'No'];
q2.answers.caregiver = ['Yes', 'No'];
q2.frequency.Saturday.unshift(60*20);
q2.frequency.Sunday.unshift(60*9);
q2.profileType = "Both";
q2.save();

var q3 = new models.Question();
q3.text.patient = "Did you misplace anything today?";
q3.text.caregiver = "Did he/she misplace anything today?";
q3.answers.patient = ['Yes', 'No'];
q3.answers.caregiver = ['Yes', 'No'];
q3.frequency.Saturday.unshift(60*20);
q3.frequency.Sunday.unshift(60*9);
q3.profileType = "Both";
q3.save();

var q4 = new models.Question();
q4.text.patient = "Did you have a good sleep last night?";
q4.text.caregiver = "Did he/she have a good sleep last night?";
q4.answers.patient = ['Yes', 'No'];
q4.answers.caregiver = ['Yes', 'No'];
q4.frequency.Saturday.unshift(60*20);
q4.frequency.Sunday.unshift(60*9);
q4.profileType = "Both";
q4.save();

var q5 = new models.Question();
q5.text.patient = "Did you need help with any basic tasks?";
q5.text.caregiver = "Did he/she need help with any basic tasks?";
q5.answers.patient = ['Yes', 'No'];
q5.answers.caregiver = ['Yes', 'No'];
q5.frequency.Saturday.unshift(60*20);
q5.frequency.Sunday.unshift(60*9);
q5.profileType = "Both";
q5.save();

var q6 = new models.Question();
q6.text.patient = "Did you have any lapses in memory today?";
q6.answers.patient = ['Yes', 'No'];
q6.frequency.Saturday.unshift(60*20);
q6.frequency.Sunday.unshift(60*9);
q6.profileType = "Patient";
q6.save();

var a1 = new models.Answer();
a1.questionID = q1._id;
a1.userID = u1._id;
a1.answer = "Yes";
a1.comment = ""
a1.timestamp = Date.now();
a1.save(function(doc) {
    mongoose.connection.close();
});
