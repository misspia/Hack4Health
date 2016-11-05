var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')

var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
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

var answerSchema = new Schema({
  // object ID of question
  questionID: Schema.Types.ObjectId,
  // array index
  answer: Number,
  timestamp: Date
});

var Question = mongoose.model('questions', questionSchema);
var Answer = mongoose.model('answers', answerSchema);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', urlencodedParser, function(req, res) {
    var collection = req.body.collection;
    var field = req.body.field;
    var value = req.body.value;
    mongoose.model(collection).find().where(field, value).limit(10).exec(function(err,data) {
        res.send(data);
    });
});

app.get('/:collection/count', function(req, res) {
    var collection = req.params.collection;
    mongoose.model(collection).count().exec(function(err,data) {
        var body = data.toString() + " records found for collection " + collection;
        res.send(body);
    });
});

app.get('/:collection', function(req, res) {
    var collection = req.params.collection;
    mongoose.model(collection).find().lean().exec(function(err,data) {
        res.send(data);
    });
});

app.get('/:collection/:field', function(req, res) {
    var collection = req.params.collection;
    var field = req.params.field;
    mongoose.model(collection).aggregate()
        .group({ _id: '$' + field, count: { $sum: 1 }})
        .sort({ count: -1 })
        .limit(20)
        .exec(function(err, data) {
            res.json(data);
        });
});

app.listen(3000);
