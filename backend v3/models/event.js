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
        county: {
            type: String,
        },
        zip: {
            type: String,
        }
    },
    description: {
        type: String
    },
    attendees: [{
        type: String
    }],
    org_info: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orgModel'
    }]
}, {
    collection: 'eventData'
});


module.exports = mongoose.model('eventModel', eventDataSchema);