let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');// call mongoose

//for jwt
let jwt = require('jsonwebtoken');

let passport = require('passport');

let bookController = require('../controllers/book');

// helper function for guard purposes
// means require the authentication first before CRUD database list
function requireAuth(req,res,next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}


// Get Route for the Book List Page from book.js  from controllers- Read Operation
router.get('/', bookController.displayBookList);

// 'requireAuth' functions that require the authentication first before CRUD database list
// 1-1)Get  Route for the displaying the Add Page from book.js from controllers- CREATE Operation
router.get('/add', requireAuth, bookController.displayAddPage);
// 1-2)Post Route for the processing the Add Page from book.js from controllers- CREATE Operation
router.post('/add', requireAuth, bookController.processAddPage);

// 2-1)Get  Route for the displaying the Edit Page from book.js from controllers- UPDATE Operation
router.get('/edit/:id',requireAuth, bookController.displayEditPage);
// 2-2)Post Route for the processing the Edit Page from book.js from controllers- UPDATE Operation
router.post('/edit/:id',requireAuth, bookController.processEditPage);

// 3)Get to perform Deletion from book.js from controllers- DELETE Operation
router.get('/delete/:id',requireAuth, bookController.performDelete);


//export module
module.exports = router;