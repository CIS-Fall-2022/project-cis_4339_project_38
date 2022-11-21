const express = require("express");
const router = express.Router();
const { json } = require("body-parser");

//const orgID = process.env.ORG_ID;

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



//GET the count of attendees of an event
//Reference: Tutorials
router.get("/eventAttendees", (req, res, next) => { 
    var checkDate = new Date() 
    eventdata.aggregate([
            {$match: {date: {
                $gt : new Date(checkDate.setMonth(checkDate.getMonth() - 2)),
                $lt : new Date()
            }} },
            {$group: {_id: "$eventName", total: { $sum: { $size:"$attendees"}}}}
        ], 
            (error, data) => {
                if (error) {
                    return next(error);
                } else {
                    res.json(data);
                }
            }
        )
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

//PUT Update and Event
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
                                consol
                                return next(error);
                            } else {
                                res.json(data);
                            }
                        }
                    );
                }
                else if (data.length == 1){
                    res.send("Attendee has already been added. Please add a new person!")
                    Promise.reject("I think a new person is trying to RSVP for the event!").then(null, function(err) { console.log(err); });
                     }  
            }
        }
    );
    
});

//DELETE delete Event
router.delete("/deleteEvent/:id", (req, res, next) => { 
    eventdata.findOneAndRemove({ _id: req.params.id }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

//DELETE Delete Attendee from Event
router.delete('/deleteClient/:id', (req, res, next) => {
    //only add attendee if not yet signed uo
    eventdata.find( 
        { _id: req.params.id, attendees: req.body.attendee }, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                if (data.length == 0) {
                    eventdata.findOneAndRemove(
                        { _id: req.params.id }, 
                        { $push: { attendees: req.body.attendee } },
                        (error, data) => {
                            if (error) {
                                consol
                                return next(error);
                            } else {
                                res.json(data);
                            }
                        }
                    );
                }
                
            }
        }
    );
    
});
module.exports = router;
