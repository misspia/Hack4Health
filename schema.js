var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var questionSchema = new Schema({
    text            :       {
        patient     :       String,
        caregiver   :       String
    },
    answers         :       {
        patient     :       Schema.Types.Mixed,
        caregiver   :       Schema.Types.Mixed
    },
    frequency       :       {
        Monday      :       [Number],
        Tuesday     :       [Number],
        Wednesday   :       [Number],
        Thursday    :       [Number],
        Friday      :       [Number],
        Saturday    :       [Number],
        Sunday      :       [Number],
    },
    profileType     :       String
});

var answerSchema = new Schema({
    questionID      :       ObjectId,
    userID          :       ObjectId,
    answer          :       String,
    comment         :       String,
    timestamp       :       Date
});

var userSchema = new Schema({
    firstName       :       String,
    lastName        :       String,
    dob             :       Date,
    gender          :       String,
    joinDate        :       Date,
    diagnosisDate   :       Date,
    profileType     :       String,
    patientID       :       ObjectId
});

mongoose.connect('mongodb://localhost/hack4health');

var Question = mongoose.model('questions', questionSchema);
var Answer = mongoose.model('answers', answerSchema);
var User = mongoose.model('users', userSchema);

exports.Question = Question;
exports.Answer = Answer;
exports.User = User;
