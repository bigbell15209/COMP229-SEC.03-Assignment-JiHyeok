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

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET About page. */
router.get('/about', indexController.displayAboutPage);

/* GET Products page. */
router.get('/projects', indexController.displayProductsPage);

/* GET Services page. */
router.get('/services', indexController.displayServicesPage);

/* GET Contact Us page. */
router.get('/contact', indexController.displayContactPage);

module.exports = router;
