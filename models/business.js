let mongoose =require('mongoose');

//create a model class
let businessModel = mongoose.Schema({
    name: String,
    number: Number,
    email: String
},
{
    collection:"business" // This 'business' is already created when you insert document into 'business' in command-line
});

//export module
module.exports=mongoose.model('Business',businessModel);