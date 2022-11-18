const express = require("express"); 
const router = express.Router(); 
const mongoose = require('mongoose');

//const orgID = process.env.ORGID;
//importing data model schemas
let { primarydata } = require("../models/primary.js"); 
let { eventdata } = require("../models/event.js"); 
let  orgData  = require("../models/org.js");


//GET Organization name
router.get("/getorgName", (req, res, next) => { 
    orgData.aggregate(
        [{$match: {}}]
    )

}
)


module.exports = router;
