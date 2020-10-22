//<!-- File Name : Assignment1 -->
//<!-- Student's Name : JiHyeok Kim -->
//<!-- StudentID : 301105279 -->
//<!-- Date : 10/8/2020 -->

let express = require('express');
let router = express.Router();

// inside of routes folder, you can find index.js file
// This method is running some functions when the application receives a request to the specified route(For example, hompage)

/* You can put another templete depending on various pages from views*/

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