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
			//res.end()
		}
		else
		{
			res.render('business/list', {title : 'Business List', BusinessList: businessList})//pushing to the view
		}
	});
});

// 1-1)Get  Route for the displaying the Add Page - CREATE Operation
router.get('/add', (req, res, next) => {
	res.render('business/add', {title : 'Add List'})//pushing to the view on router.get(..) code
});
// 1-2)Post Route for the processing the Add Page - CREATE Operation
router.post('/add', (req, res, next) => {
	let newBusiness = Business({
		"name":req.body.name,
		"number": req.body.number,
		"email": req.body.email,
	});

	Business.create(newBusiness,(err,Business) =>{
		if(err)
		{
			console.log(err);
			res.end(err);
		}
		else
		{
			//reflesh the book list
			res.redirect('/business-list');
		}
	});
});
// 2-1)Get  Route for the displaying the Edit Page - UPDATE Operation
router.get('/edit/:id', (req, res, next) => {
	let id = req.params.id;

	Business.findById(id, (err, businessToEdit) => {
		if(err)
		{
			console.log(err);
			res.end(err);
		}
		else
		{
			//show the Edit view
			res.render('business/edit', {title: 'Edit Book', book: businessToEdit})
		}
	});
});
// 2-2)Post Route for the processing the Edit Page - UPDATE Operation
router.post('/edit/:id', (req, res, next) => {
	let id= req.params.id

	let updatedBook = Business({
		"_id": id,
		"name":req.body.name,
		"number": req.body.number,
		"email": req.body.email
	});

	Business.updateOne({_id: id}, updatedBusiness, (err) => {
		if(err)
		{
			console.log(err);
			res.end(err);
		}
		else
		{
			//reflesh the book list
			res.redirect('/business-list');        
		}
	});
});

// 3)Get to perform Deletion - DELETE Operation
router.get('/delete/:id', (req, res, next) => {
	let id = req.params.id;

	Business.remove({_id: id}, (err) => {
		if(err)
		{
			console.log(err);
			res.end(err);
		}
		else
		{
			//reflesh the book list
			res.redirect('/business-list');        
		}
	});
});

//export module
module.exports = router;