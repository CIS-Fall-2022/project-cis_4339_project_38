const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let orgDataSchema = new Schema({
    _id: { type: String, default: uuid.v1 },
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
        county: {
            type: String
        },
        zip: {
            type: Number
        }
    }
}, {
    collection: 'orgData'
});

module.exports = mongoose.model('orgModel', orgDataSchema);
