let express = require('express');
let router = express.Router();
let mongoose = require('mongoose'); // call mongoose

// connect to our book Model
let Business = require('../models/business');

let businessController = require('../controllers/business');
const business = require('../models/business');
	

// Get Route for the Book List Page from book.js  from controllers- Read Operation
router.get('/', businessController.displayBusinessList);

// 1-1)Get  Route for the displaying the Add Page from book.js from controllers- CREATE Operation
router.get('/add', businessController.displayAddPage);
// 1-2)Post Route for the processing the Add Page from book.js from controllers- CREATE Operation
router.post('/add', businessController.processAddPage);


// 2-1)Get  Route for the displaying the Edit Page from book.js from controllers- UPDATE Operation
router.get('/edit/:id', businessController.displayEditPage);
// 2-2)Post Route for the processing the Edit Page from book.js from controllers- UPDATE Operation
router.post('/edit/:id', businessController.processEditPage);

// 3)Get to perform Deletion from book.js from controllers- DELETE Operation
router.get('/delete/:id', businessController.performDelete);

//export module
module.exports = router;