var mongoose = require('mongoose');
var Quote = mongoose.model('Quote');
var moment = require("moment");
module.exports = {
  show: function(req, res) {
    Quote.find({}, function(err, quotes) {
        if (err) {
            console.log('error getting quotes', err);
            res.send(err);
        } else {
            console.log('successfully got all the quotes');
            res.render('quotes', {quotes: quotes, moment: moment});
        }
    })
  },
  create: function(req, res) {
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
    })
  }
}