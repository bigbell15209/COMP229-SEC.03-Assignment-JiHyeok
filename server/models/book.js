let mongoose =require('mongoose');

//create a model class
let bookModel = mongoose.Schema({ 
    name: String,
    author: String,
    published: String,
    description: String,
    price: Number
},
{
    collection:"books" // exactly same name of items in collection in MongoDatabase
});

//export module
module.exports=mongoose.model('Book',bookModel);

