const express = require("express"); 
const router = express.Router(); 
const mongoose = require('mongoose');

//importing data model schemas
let { primarydata } = require("../models/primary.js"); 
let { eventdata } = require("../models/event.js"); 
let  orgData  = require("../models/org.js");

//POST
router.post('/createorg', (req, res, next) => { 
    orgData.create(req.body, (error, data) => { 
        if (error) {
            return next(error);
        } else {
            res.send('Organization is created!');
            console.log('We have a new organization: ', (data))
        }
    });
});

//GET all entries
router.get("/allorgs", (req, res, next) => { 
    orgData.find( 
        (error, data) => {
            if (error) {
                res.send('Sorry! Unable to view organizations')
                return next(error);
            } else {
                res.json(data);
            }
        }
    ).sort({ 'updatedAt': -1 }).limit(10);
});

//GET single entry by ID
router.get("/:id", (req, res, next) => {
    orgData.find( 
        { _id: req.params.id }, 
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});






//PUT update (make sure req body doesn't have the id)
router.put("/:id", (req, res, next) => { 
    orgData.findOneAndUpdate( 
        { _id: req.params.id }, 
        req.body,
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.send('Organization is updated!');
                console.log('We have an Organization update: ', (data))
            }
        }
    );
});

router.delete('/:id', (req, res, next) => {
   // mongoose will use orgID of document
    orgData.findOneAndRemove({ _ID: req.params.id}, (error, data) => {
        if (error) {
          return next(error);
        } else {
           res.status(200).json({
             msg: data
           });
    //      res.send('This organization is now disbanded!');
        }
      });
});

module.exports = router;
