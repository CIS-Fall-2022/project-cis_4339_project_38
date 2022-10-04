const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let primaryDataSchema = new Schema({
    _id: { type: String, default: uuid.v1 },
    firstName: {
        type: String,
        require: true
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    phoneNumbers: {
        type: Array,
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
            required: true
        },
        county: {
            type: String,
        },
        zip: {
            type: String,
        }
    },
    emergency_contact: {
            contactName: {
                type: String
            },
            contactNum: {
                type: String
            },
            relation: {
                type: String
            }
    },
    healthinfo: {
        height: {
            type: String
        },
        weight: {
            type: Number
        },
        blood_type: {
            type: String
        },
        pre_conditions: [{
            type: String
        }],
        current_meds: [{
            type: String
        }],
        allergy: [{
            type: String
        }]
    },
    organization_info: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'orgModel'
    }]
}, {
    collection: 'primaryData',
    timestamps: true
});


module.exports = mongoose.model('primaryModel', primaryDataSchema);