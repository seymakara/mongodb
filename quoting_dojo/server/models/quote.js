let mongoose = require('mongoose');



let QuoteSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 1},
    quote: { type: String, required: true, minlength: 1},
    
}, {timestamps: true})

mongoose.model('Quote', QuoteSchema); 
let Quote = mongoose.model('Quote')