const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let orgDataSchema = new Schema({
    _id: { type: String, 
           unique : true 
        },
    orgName: {
        type: String
    },
    org_desc: {
        type: String
    },
    org_contact: {
        phoneNumber: [{
            type: String
        }],
        email: [{
            type: String
        }] 
    },
    org_address: {
        line1: {
            type: String
        },
        line2: {
            type: String
        },
        city: {
            type: String
        },
        country: {
            type: String
        },
        zip: {
            type: String
        }
    }
}, {
    collection: 'orgData'
});

module.exports = mongoose.model('orgData', orgDataSchema);
