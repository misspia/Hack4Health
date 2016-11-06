var mongoose = require('mongoose');
var models = require('./schema.js');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var weekday = new Array(7);
weekday[0]=  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

/*
Given a dt (Date) and userID (String), returns an array of JSON objects containing
all of the questions asked within the last 60 minutes, up to midnight of the same day
Response format:
[{ qID : String, text : String, answers : Mixed }]
*/
var getQuestion = function(userID, callback) {
    dt = new Date();
    var dayOfWeek = weekday[dt.getDay()];
    var then = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), 0, 0, 0);
    var msSinceMidnight = dt - then.getTime();
    var minSinceMidnight = msSinceMidnight / 60000;

    var u;
    var q;
    models.User.findById(userID).exec(function(err, data) {
        u = data;
        if (u == null) {
            callback([]);
            return;
        }
        models.Question.find()
            .where('frequency.'.concat(dayOfWeek)).gt(minSinceMidnight - 600).lt(minSinceMidnight)
            .where('profileType').in(['Both', u.profileType])
            .select('_id text answers')
            .exec(function(err, data) {
                var result = []
                for (var i = 0; i < data.length; i++) {
                    var obj = {}
                    obj.qID = data[i]._id.toString();
                    if (u.profileType == "Caregiver") {
                        obj.text = data[i].text.caregiver;
                        obj.answers = data[i].answers.caregiver;
                    }
                    else {
                        obj.text = data[i].text.patient;
                        obj.answers = data[i].answers.patient;
                    }
                    result.push(obj);
                }
                callback(result);
            });
    });
};

var getQuestionByName = function(first, last, callback) {
    getUserId(first, last, function(data) {
        getQuestion(data, function(data) {
            callback(data);
        });
    });
};

var getUserId = function(first, last, callback) {
    models.User.findOne()
        .where('firstName').eq(first)
        .where('lastName').eq(last)
        .select('_id')
        .exec(function(err, data) {
            callback(data);
        });
};

var getUser = function(id, callback) {
    models.User.findOne()
        .where('_id').eq(id)
        .exec(function(err, data) {
            callback(data);
        });
};

/*
Given a qID (String), userID (String), response (String) and comment (String),
saves the response and comment to the database.
*/
var saveAnswer = function(qID, userID, response, comment, callback) {
    var ans = new models.Answer();
    ans.questionID = qID;
    ans.userID = userID;
    ans.answer = response;
    ans.comment = comment;
    ans.timestamp = new Date();
    ans.save(function() {
        callback();
    });
};

/*
Given a qID (String), userID (String), return a list of
all saved answers for that question and user.
Response format:
[{}]
*/
var getAnswers = function(qID, userID, callback) {
    models.Answer.find()
        .where('questionID').eq(qID)
        .where('userID').eq(userID)
        .select('-_id answer comment timestamp')
        .sort('timestamp')
        .exec(function(err, data) {
            callback(data);
        });
};

exports.getQuestionByName = getQuestionByName;