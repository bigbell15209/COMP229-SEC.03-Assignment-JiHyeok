let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//create a reference to the model
let Business = require('../models/business');

// Get Route for the  List Page - Read Operation
module.exports.displayBusinessList = (req,res,next) => {
    Business.find((err,businessList) => {
        if(err)
        {
            return console.error(err);
            res.end()
        }

        else
        {
            res.render('business/list', {title : 'Businesses', 
            BusinessList: businessList, 
            displayName: req.user ? req.user.displayName : ''})//pushing to the view
        }

    });
}

// 1-1)Export the get Route for the displaying the Add Page - CREATE Operation
module.exports.displayAddPage= (req, res, next) => {
    res.render('business/add', {title : 'Add Business',
    displayName: req.user ? req.user.displayName : ''})//pushing to the view
};
// 1-2)Export the Post Route for the processing the Add Page - CREATE Operation
module.exports.processAddPage = (req, res, next) => {
    let newBusiness = Business({
        "name":req.body.name,
        "number": req.body.number,
        "email": req.body.email
    });

    Business.create(newBusiness,(err,Business) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //reflesh the list
            res.redirect('/business-list');
        }
    });
}

// 2-1)Export the Get Route for the displaying the Edit Page - UPDATE Operation
module.exports.displayEditPage = (req, res, next) => {
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
            res.render('business/edit', {title: 'Edit Business', business: businessToEdit,
            displayName: req.user ? req.user.displayName : ''})
        }
    });
}

// 2-2)Export the Post Route for the processing the Edit Page - UPDATE Operation
module.exports.processEditPage = (req, res, next) => {
    let id= req.params.id

    let updatedBusiness = Business({
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
            //reflesh the list
            res.redirect('/business-list');        
        }
    });
}

// 3)Export the Get route to perform Deletion - DELETE Operation
module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Business.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //reflesh the list
            res.redirect('/business-list');        
        }
    });
}