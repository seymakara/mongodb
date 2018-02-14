// ========== CONFIG =============
var express = require("express");
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var path = require("path");
app.use(express.static(path.join(__dirname, "./static")));

let mongoose = require('mongoose');

// ===============================

// ==== NEW MONGOOSE CODE! =======
mongoose.connect('mongodb://localhost/1955');
mongoose.Promise = global.Promise;

let UserSchema = new mongoose.Schema({
    name: { type: String }
})

mongoose.model('User', UserSchema); 
let User = mongoose.model('User')
// ==============================

app.get('/', function(req, res){
    User.find({}, function(err, users){
        if(err){
           console.log("Returned error", err);
            // respond with JSON
           res.json({message: "Error", error: err})
        }
        else {
            // respond with JSON
           res.json({message: "Success", data: users})
        }
     })
})

app.get('/new/:name', function(req, res){

    let user = new User({name: req.params.name})
    user.save( function(err){
        if(err){
           console.log("Returned error", err);
            // respond with JSON
           res.json({message: "Error", error: err})
        }
        else {
            // respond with JSON
           res.redirect("/")
        }
     })
})

app.get('/remove/:name', function(req, res){

    User.remove({name: req.params.name}, function(err){
        if(err){
           console.log("Returned error", err);
            // respond with JSON
           res.json({message: "Error", error: err})
        }
        else {
            // respond with JSON
           res.redirect("/")
        }
     })
})

app.get('/:name', function(req, res){
    User.find({name: req.params.name}, function(err, users){
        if(err){
           console.log("Returned error", err);
            // respond with JSON
           res.json({message: "Error", error: err})
        }
        else {
            // respond with JSON
           res.json({message: "Success", data: users})
        }
     })
})




app.listen(8000, function() {
    console.log("1955API listening on port 8000");
});