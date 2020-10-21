let express = require('express');
let router = express.Router();
//let mongoose = require('mongoose');  //by Professor in virtual Class putting this instead of book.js(routes)
//let Book = require('../models/book')  //by Professor in virtual Class putting this instead of book.js(routes)

let indexController = require('../controllers/index');

//Five pages
/* GET home page from index.js from controllers */
router.get('/', indexController.displayHomePage);
/* GET home page from index.js from controllers */
router.get('/home', indexController.displayHomePage);
/* GET About page from index.js from controllers */
router.get('/about', indexController.displayAboutPage);
/* GET Products page from index.js from controllers */
router.get('/projects', indexController.displayProductsPage);
/* GET Services page from index.js from controllers*/
router.get('/services', indexController.displayServicesPage);
/* GET Contact Us page from index.js from controllers */
router.get('/contact', indexController.displayContactPage);

// Login, Register and Logout pages
// 1-1)Get  Route for the displaying the Login Page  
router.get('/login', indexController.displayLoginPage);
// 1-2)Post Route for the processing the Login Page  
router.post('/login', indexController.processLoginPage);
// 2-1)Get  Route for the displaying the Register Page  
router.get('/register', indexController.displayRegisterPage);
// 2-2)Post Route for the processing the Register Page  
router.post('/register', indexController.processRegisterPage);
// 3)GET to perform LogOut
router.get('/logout', indexController.performLogout);


module.exports = router;
