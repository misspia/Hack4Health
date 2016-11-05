var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var models = require('./schema.js');

app.get('/:collection', function(req, res) {
    var collection = req.params.collection;
    mongoose.model(collection).find().lean().exec(function(err,data) {
        res.send(data);
    });
});

app.listen(3000);
