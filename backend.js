var mongoose = require('mongoose');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();
app.use(cors());

var urlencodedParser = bodyParser.urlencoded({ extended: false });

var models = require('./models/model.js');

app.get('/:collection', function(req, res) {
    var collection = req.params.collection;
    mongoose.model(collection).find().lean().exec(function(err,data) {
        res.send(data);
    });
});

app.get('/getQuestion/:first/:last', function(req, res) {
    var first = req.params.first;
    var last = req.params.last;
    models.getQuestionByName(first, last, function(data) {
        res.send(data);
    });
});

app.get('/getAnswers/:first/:last', function(req, res) {
    var first = req.params.first;
    var last = req.params.last;
    models.getAllAnswersByName(first, last, function(data) {
        res.send(data);
    });
});

app.post('/saveAnswer', urlencodedParser, function(req, res) {
    var qid = req.body.qid;
    var userid = req.body.userid;
    var response = req.body.response;
    var comment = req.body.comment;
    models.saveAnswer(qid, userid, response, comment, function() {
        console.log("Saved!");
    });
});

app.listen(3000);
