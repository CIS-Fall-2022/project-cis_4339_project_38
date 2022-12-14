const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let eventDataSchema = new Schema({
    _id: { type: String, default: uuid.v1 },
    eventName: {
        type: String,
        require: true
    },
    services: {
        type: Array,
    },
    date: {
        type: Date,
        required: true
    },
    address: {
        line1: {
            type: String
        },
        line2: {
            type: String,
        },
        city: {
            type: String,
        },
        country: {
            type: String,
        },
        zip: {
            type: String,
        }
    },
    description: {
        type: String
    },
    attendees: {
        type: [String]
    },
    orgName: {
        type: String,
        require: true,
        default: process.env.ORG_NAME
    }
}, {
    collection: 'eventData'
});


module.exports = mongoose.model('eventData', eventDataSchema);
