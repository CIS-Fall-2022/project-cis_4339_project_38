const express = require("express"); 
const router = express.Router(); 

//importing data model schemas
let { primarydata } = require("../models/primary.js"); 
let { eventdata } = require("../models/event.js"); 
let { orgdata } = require("../models/org.js");

//GET all entries
router.get("/", (req, res, next) => { 
    orgdata.find( 
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
    orgdata.find( 
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
        dbQuery = { orgname: { $regex: `^${req.query["orgName"]}`, $options: "i" }}
    };
    orgdata.find( 
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


//POST
router.post("/", (req, res, next) => { 
    primarydata.create( 
        req.body,
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data); 
            }
        }
    );
    primarydata.createdAt;
    primarydata.updatedAt;
    primarydata.createdAt instanceof Date;
});

//PUT update (make sure req body doesn't have the id)
router.put("/:id", (req, res, next) => { 
    orgdata.findOneAndUpdate( 
        { _id: req.params.id }, 
        req.body,
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//router.delete('/org/:id', (req, res, next) => {
    //mongoose will use studentID of document
 //   primaryModel.findOneAndRemove({ eventID: req.params.id}, (error, data) => {
  //      if (error) {
    //      return next(error);
      //  } else {
        //   res.status(200).json({
          //   msg: data
          // });
         // res.send('This client has been deleted!');
     //   }
    //  });
//});

module.exports = router;