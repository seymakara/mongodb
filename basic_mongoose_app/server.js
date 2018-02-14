// ========== CONFIG =============
var express = require("express");
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var session = require('express-session');
app.use(session({secret: 'codingdojorocks'}));

var path = require("path");
app.use(express.static(path.join(__dirname, "./static")));
app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// ===============================


// ==== NEW MONGOOSE CODE! =======
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/basic_mongoose');
mongoose.Promise = global.Promise;

let UserSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 6},
    lastname: { type: String, required: true, maxlength: 20 },
    age: {type: Number, min: 1, max: 150 },
    email: { type: String, required: true }
}, {timestamps: true})

mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'
let User = mongoose.model('User')

//let User = mongoose.model("User", UserSchema);
// ==============================

// ===== ROUTES! ======
app.get('/', function(req, res) {
    User.find( {}, function( err, results ){
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(results);
            res.render('index', {results: results});
        }
    })
})

app.post('/users', function(req, res) {
    console.log("result", req.body);

    //name: req.body.name, lastname:req.body.lastname, age: req.body.age, email: req.body.email
    var newuser = new User(req.body);
    newuser.save(function(err, results) {
        // if there is an error console.log that something went wrong!
        if(err) {
          console.log(err);
          res.send(err);
        } else { // else console.log that we did well and then redirect to the root route
          console.log(results);
          res.redirect('/');
        }
    });
})

app.listen(8000, function() {
    console.log("Quoting Dojo listening on port 8000");
});
