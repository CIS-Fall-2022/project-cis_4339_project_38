const express = require("express"); 
const router = express.Router(); 
const mongoose = require('mongoose');

//importing data model schemas
let  primarydata  = require("../models/primary.js"); 
let { eventdata } = require("../models/event.js"); 
let { orgdata } = require("../models/org.js")

//POST
router.post("/createprimary", (req, res, next) => { 
    primarydata.create( req.body,(error, data) => { 
        if (error) {
            return next(error);
        } else {
            res.send('Client is created!')
            console.log('We have a new client: ', (data)) 
        }
    }
);
primarydata.createdAt;
primarydata.updatedAt;
primarydata.createdAt instanceof Date;
});

//GET all entries
router.get("/allprimaries", (req, res, next) => { 
    primarydata.find( 
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    ).sort({ 'updatedAt': -1 }).limit(10);
});

//GET single entry by ID
router.get("/id/:id", (req, res, next) => {
    primarydata.find( 
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

//GET entries based on search query
//Ex: '...?firstName=Bob&lastName=&searchBy=name' 
router.get("/search/", (req, res, next) => { 
    let dbQuery = "";
    if (req.query["searchBy"] === 'name') {
        dbQuery = { firstName: { $regex: `^${req.query["firstName"]}`, $options: "i" }, lastName: { $regex: `^${req.query["lastName"]}`, $options: "i" } }
    } else if (req.query["searchBy"] === 'number') {
        dbQuery = {
            "phoneNumbers.primaryPhone": { $regex: `^${req.query["phoneNumbers.primaryPhone"]}`, $options: "i" }
        }
    };
    primarydata.find( 
        dbQuery, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//GET events for a single client
router.get("/events/:id", (req, res, next) => { 
    
});



//PUT update (make sure req body doesn't have the id)
router.put("/:id", (req, res, next) => { 
    primarydata.findOneAndUpdate( 
        { _id: req.params.id }, 
        req.body,
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.send('Client is updated!');
                console.log('We have an Client update: ', (data))
            }
        }
    );
});

router.delete('/primary/:id', (req, res, next) => {
    //mongoose will use studentID of document
    primarydata.findOneAndRemove({ eventID: req.params.id}, (error, data) => {
        if (error) {
          return next(error);
        } else {
           res.status(200).json({
             msg: data
           });
          res.send('This client has been deleted!');
        }
      });
});

module.exports = router;