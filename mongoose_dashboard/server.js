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

let AnimalSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 1},
    species: { type: String, required: true, minlength: 1},
    age: { type: Number, required: true, min: 1, max: 150},
}, {timestamps: true})

mongoose.model('Animal', AnimalSchema); 
let Animal = mongoose.model('Animal')
// ==============================

// ===== ROUTES! ======
app.get('/', function(req, res) {
    Animal.find( {}, function( err, animals ){
        if(err){
            console.log(err);
            res.send("index error", err);
        }else{
            console.log("index", animals);
            res.render('index', {animals: animals});
        }
    })
})

app.get("/animals/new", function(req, res){
    res.render("new")
})

app.post("/animals", function(req, res) {
    console.log("result", req.body);

    var newAnimal = new Animal(req.body);
    newAnimal.save(function(err, animals) {
        // if there is an error console.log that something went wrong!
        if(err) {
          console.log("post error ",err);
          res.send(err);
        } else { // else console.log that we did well and then redirect to the root route
          console.log('successfully added animal', animals);
          res.redirect('/');
        }
    });
})

app.post("/animals/:id/destroy", function(req, res) {
    console.log("result", req.body);

    Animal.remove({_id: req.params.id},function(err, animals) {
        // if there is an error console.log that something went wrong!
        if(err) {
          console.log("post error ",err);
          res.send(err);
        } else { // else console.log that we did well and then redirect to the root route
          console.log('successfully deleted animal', animals);
          res.redirect('/');
        }
    });
})

app.get('/animals/:id', function(req, res) {
    Animal.findOne({_id: req.params.id}, function( err, animal ){
        if(err){
            console.log(err);
            res.send("index error", err);
        }else{
            console.log("show", animal);
            console.log("show", req.body.Animal)
            res.render('show', {animal: animal});
        }
    })
})

app.get('/animals/:id/edit', function(req, res) {
    Animal.findOne({_id: req.params.id}, function( err, animal ){
        if(err){
            console.log(err);
            res.send("index error", err);
        }else{
            console.log("edit", animal);
            console.log("edit", req.body.Animal)
            res.render('edit', {animal: animal});
        }
    })
})

app.post("/animals/:id/update", function(req, res) {
    console.log("result", req.body);
    Animal.update({_id: req.params.id}, {$set: {name: req.body.name, species: req.body.species, age: req.body.age}},{multi: false}, function(err, animal) {

        if(err) {
          console.log("post error ",err);
          res.send(err);
        } else { // else console.log that we did well and then redirect to the root route
          console.log('successfully updated animal', animal);
          res.redirect('/');
        }
    });
})


// app.get('/quotes', function(req, res) {
//     console.log('get req on quotes');
//     Quote.find({}, function(err, quotes) {
//         if (err) {
//             console.log('error getting quotes', err);
//             res.send(err);
//         } else {
//             console.log('successfully got all the quotes');
//             res.render('quotes', {quotes: quotes, moment: moment});
//         }
//     })
// })

app.listen(8000, function() {
    console.log("Mongoose Dashboard listening on port 8000");
});
