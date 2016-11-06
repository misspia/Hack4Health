var express = require("express");
var app = express();

var argv = require('yargs').argv;
var port = argv.port || 8000;
var dist = argv.prod  ? '/dist' :'';

app.use(express.static(__dirname+dist));

app.listen(port);
console.log("Server listening on port " + port );