let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//for jwt
let jwt = require('jsonwebtoken');

//create a reference to the model
let Book = require('../models/book');

// Get Route for the Book List Page - Read Operation
module.exports.displayBookList = (req,res,next) => {
    Book.find((err,bookList) => {
        if(err)
        {
            return console.error(err);
            
        }

        else
        {
            //console.log(BookList);
            res.render('book/list', {title : 'Books', 
            BookList: bookList, 
            displayName: req.user ? req.user.displayName : ''})//pushing to the view
        }

    });
}

// 1-1)Export the get Route for the displaying the Add Page - CREATE Operation
module.exports.displayAddPage= (req, res, next) => {
    res.render('book/add', {title : 'Add Book',
    displayName: req.user ? req.user.displayName : ''})//pushing to the view
};
// 1-2)Export the Post Route for the processing the Add Page - CREATE Operation
module.exports.processAddPage = (req, res, next) => {
    let newBook = Book({
        "name":req.body.name,
        "author": req.body.author,
        "published": req.body.published,
        "description": req.body.description,
        "price": req.body.price
    });

    Book.create(newBook,(err,Book) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //reflesh the book list
            res.redirect('/book-list');
        }
    });
}

// 2-1)Export the Get Route for the displaying the Edit Page - UPDATE Operation
module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Book.findById(id, (err, bookToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the Edit view
            res.render('book/edit', {title: 'Edit Book', book: bookToEdit, 
            displayName: req.user ? req.user.displayName : ''})
        }
    });
}
// 2-2)Export the Post Route for the processing the Edit Page - UPDATE Operation
module.exports.processEditPage = (req, res, next) => {
    let id= req.params.id

    let updatedBook = Book({
        "_id": id,
        "name":req.body.name,
        "author": req.body.author,
        "published": req.body.published,
        "description": req.body.description,
        "price": req.body.price
    });

    Book.updateOne({_id: id}, updatedBook, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //reflesh the book list
            res.redirect('/book-list');        
        }
    });
}

// 3)Export the Get route to perform Deletion - DELETE Operation
module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Book.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //reflesh the book list
            res.redirect('/book-list');        
        }
    });
}