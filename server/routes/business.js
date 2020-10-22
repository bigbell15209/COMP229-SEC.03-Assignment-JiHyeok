let express = require('express');
let router = express.Router();
let mongoose = require('mongoose'); // call mongoose

let passport = require('passport');

let businessController = require('../controllers/business');

// helper function for guard purposes
// means require the authentication first before CRUD database list
function requireAuth(req,res,next)
{
    // check if the useris logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}
            

// Get Route for the Book List Page from book.js  from controllers- Read Operation
router.get('/', businessController.displayBusinessList);

// 1-1)Get  Route for the displaying the Add Page from book.js from controllers- CREATE Operation
router.get('/add', requireAuth,businessController.displayAddPage);
// 1-2)Post Route for the processing the Add Page from book.js from controllers- CREATE Operation
router.post('/add', requireAuth,businessController.processAddPage);


// 2-1)Get  Route for the displaying the Edit Page from book.js from controllers- UPDATE Operation
router.get('/edit/:id', requireAuth,businessController.displayEditPage);
// 2-2)Post Route for the processing the Edit Page from book.js from controllers- UPDATE Operation
router.post('/edit/:id', requireAuth,businessController.processEditPage);

// 3)Get to perform Deletion from book.js from controllers- DELETE Operation
router.get('/delete/:id', requireAuth,businessController.performDelete);

//export module
module.exports = router;