// ========== CONFIG =============
var express = require("express");
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var path = require("path");
app.use(express.static(path.join(__dirname, "./static")));

let mongoose = require('mongoose');

app.use(express.static( __dirname + '/myFirstAngularApp/dist' ));

// ===============================

// ==== NEW MONGOOSE CODE! =======
mongoose.connect('mongodb://localhost/restfulTaskAPI');
mongoose.Promise = global.Promise;

let TaskSchema = new mongoose.Schema({
    title: {type: String, required: true, minlength: 1},
    description: {type: String, required: true, minlength: 1},
    completed: {type: Boolean, default: false}
}, {timestamps: true});

mongoose.model('Task', TaskSchema); 
let Task = mongoose.model('Task')
// ==============================

//retrieves all tasks
app.get('/tasks', function(req, res){
    Task.find({}, function(err, tasks){
        if(err){
           console.log("Returned error", err);
           res.json({message: "Error", error: err})
        }
        else {
            res.json({message: "Success", tasks})
        }
     })
})

//retrieves a task by id
app.get('/tasks/:id', function(req, res){
    Task.findOne({_id: req.params.id}, function(err, task){
        if(err){
           console.log("Returned error", err);
           res.json({message: "Error", error: err})
        }
        else {
           res.json({message: "Success", task})
        }
     })
})

app.post('/task', function(req, res){

    let task = new Task(req.body)
    task.save( function(err){
        if(err){
           console.log("Returned error", err);
           res.json({message: "Error", error: err})
        }
        else {
            res.json({message: "Success"})
        }
     })
})

app.put('/tasks/:id', function(req, res){
    Task.update({_id: req.params.id}, {$set: {title: req.body.title, description: req.body.description, completed: req.body.com}}, function(err, task){
        if(err){
           console.log("Returned error", err);
           res.json({message: "Error", error: err})
        }
        else {
            console.log('successfully updated the task', task);
            res.json({message: "Success"});
        }
     })
})

app.delete("/tasks/:id", function(req, res) {
    console.log('initiating removal');
    Task.remove({_id: req.params.id},function(err, task) {
        // if there is an error console.log that something went wrong!
        if(err) {
          console.log("post error ",err);
          res.send(err);
        } else { // else console.log that we did well and then redirect to the root route
          console.log('successfully deleted task',task);
          res.json({message: "Success"});
        }
    });
})

app.listen(8000, function() {
    console.log("Restful Task API listening on port 8000");
});