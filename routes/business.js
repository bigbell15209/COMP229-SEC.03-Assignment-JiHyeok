let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to our book Model
let Business = require('../models/business');
	
// Get Route for the Book List Page - Read Operation
router.get('/',(req,res,next) => {
	Business.find((err,businessList) => {
		if(err)
		{
			return console.error(err);
			res.end()
		}
		else
		{
			res.render('business', {title : 'Business List', BusinessList: businessList})//pushing to the view
		}
	});
});
	
//export module
module.exports = router;