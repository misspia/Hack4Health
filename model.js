var mongoose = require('mongoose');
var models = require('./schema.js');

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
var getQuestion = function(dt, userID, callback) {
    var dayOfWeek = weekday[dt.getDay()];
    var then = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), 0, 0, 0);
    var msSinceMidnight = dt - then.getTime();
    var minSinceMidnight = msSinceMidnight / 60000;

    var u;
    var q;
    models.User.findById(userID).exec(function(err, data) {
        u = data;
        models.Question.find()
            .where('frequency.'.concat(dayOfWeek)).gt(minSinceMidnight - 60).lt(minSinceMidnight)
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

/*
Given a qID (String), user (String) and response (String),
saves the response to the database.
*/
var saveAnswer = function(qID, userID, response) {

};

getQuestion(new Date(), "581e657471b0923be368b2f4", console.log);