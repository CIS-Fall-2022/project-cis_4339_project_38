const express = require("express");
const router = express.Router();
const { json } = require("body-parser");

const orgID = process.env.ORG_ID;

//importing data model schemas
let  eventdata  = require("../models/event.js"); 
let { primarydata } = require("../models/primary.js")
let { orgData } = require("../models/org.js");


//POST
router.post("/createevent", (req, res, next) => { 
    eventdata.create( 
        req.body, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.send("You have created a new event!")
                console.log("We have a new event: ", (data))
            }
        }
    );
});

//GET all entries
router.get("/allevents", (req, res, next) => { 
    eventdata.find( 
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
    eventdata.find({ _id: req.params.id }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

//GET entries based on search query
//Ex: '...?eventName=Food&searchBy=name' 
router.get("/search/", (req, res, next) => { 
    let dbQuery = "";
    if (req.query["searchBy"] === 'name') {
        dbQuery = { eventName: { $regex: `^${req.query["eventName"]}`, $options: "i" } }
    } else if (req.query["searchBy"] === 'date') {
        dbQuery = {
            date:  req.query["eventDate"]
        }
    };
    eventdata.find( 
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

//GET events for which a client is signed up
router.get("/client/:id", (req, res, next) => { 
    eventdata.find( 
        { attendees: req.params.id }, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//GET the count of attendees of an event
router.get("/total/:eventName", (req, res, next) => { 
    eventdata.aggregate([
        { $match : { eventName : req.params.eventName } },
        { $unwind : "$attendees"  },
        { $project : {eventName : 1, address: 1, orgName : 1, descsription : 1}},
        { $count : "total" }
 

    ], (error, data) => {
        if (error) {
            return next(error)
        } else {
        res.json(data);
        console.log(data)
        }
});
});


//PUT
router.put("/:id", (req, res, next) => {
    eventdata.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json("Event has been updated");
                console.log("We received updates for this event: ", (data))
            }
        }
    );
});

//PUT add attendee to event
router.put("/addAttendee/:id", (req, res, next) => {
    //only add attendee if not yet signed uo
    eventdata.find( 
        { _id: req.params.id, attendees: req.body.attendee }, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                if (data.length == 0) {
                    eventdata.updateOne(
                        { _id: req.params.id }, 
                        { $push: { attendees: req.body.attendee } },
                        (error, data) => {
                            if (error) {
                                return next(error);
                            } else {
                                res.json(data);
                            }
                        }
                    );
                }
                else if (data.length == 1){
                    res.send("Attendee has already been added. Please add a new person!")
                    Promise.reject("Whoops! I think someone is trying to register for the event!").then(null, function(err) { console.log(err); });
            }  
            }
        }
    );
    
});
//DELETE Delete Event
router.delete('/event/:id', (req, res, next) => {
    //mongoose will use studentID of document
    eventdata.findOneAndRemove({ eventID: req.params.id}, (error, data) => {
        if (error) {
          return next(error);
        } else {
           res.status(200).json({
             msg: data
           });
//          res.send('Event has been deleted');
        }
      });
});

//DELETE Delete Attendee from Event
router.delete('/event/:id', (req, res, next) => {
    eventdata.findOneAndRemove({ attendee: req.params.attendees}, (error,data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            });
                
        }    

    });
});
module.exports = router;
