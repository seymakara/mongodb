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

var moment = require("moment");
// ===============================


// ==== NEW MONGOOSE CODE! =======
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/basic_mongoose');
mongoose.Promise = global.Promise;

let QuoteSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 1},
    quote: { type: String, required: true, minlength: 1},
    
}, {timestamps: true})

mongoose.model('Quote', QuoteSchema); 
let Quote = mongoose.model('Quote')
// ==============================

// ===== ROUTES! ======
app.get('/', function(req, res) {

    res.render('index');
})

app.post('/quotes', function(req, res) {
    console.log("result", req.body);

    //name: req.body.name, lastname:req.body.lastname, age: req.body.age, email: req.body.email
    var newQuote = new Quote(req.body);
    newQuote.save(function(err, quotes) {
        // if there is an error console.log that something went wrong!
        if(err) {
          console.log(err);
          res.send(err);
        } else { // else console.log that we did well and then redirect to the root route
          console.log('successfully got all the quotes', quotes);
          res.redirect('/');
        }
    });
})

app.get('/quotes', function(req, res) {
    console.log('get req on quotes');
    Quote.find({}, function(err, quotes) {
        if (err) {
            console.log('error getting quotes', err);
            res.send(err);
        } else {
            console.log('successfully got all the quotes');
            res.render('quotes', {quotes: quotes, moment: moment});
        }
    })
})

app.listen(8000, function() {
    console.log("Quoting Dojo listening on port 8000");
});
