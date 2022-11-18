const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let orgDataSchema = new Schema({
    _id: { type: String, default: uuid.v1 },
    orgName: {
        type: String,
        default: process.env.orgName
    },

}, {
    collection: 'orgData'
});

module.exports = mongoose.model('orgData', orgDataSchema);
