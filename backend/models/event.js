const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let eventDataSchema = new Schema({
    _id: { type: String, unique: true },
    eventName: {
        type: String,
        require: true
    },
    services: {
        type: Array,
        require: true
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
        require: true
    }
}, {
    collection: 'eventData'
});


module.exports = mongoose.model('eventData', eventDataSchema);
