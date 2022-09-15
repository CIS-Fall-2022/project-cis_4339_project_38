const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//collection for intakeData
//client data is for guests of the nonprofit orgs
let org_data = new Schema({
	org_id: { type: String, default: uuid.v1 },
	org_name: {
		type: String,
		require = true
	},
	org_description: {
		type: String,
	},
	org_contact: {
		phoneNumbers: {
        	type: Array,
        	require: true
   		},
		email: {
        	type: String,
		}
    },
	org_address: {
        line1: {
            type: String,
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
}, {
    collection: 'organizationData',
    timestamps: true

});
let client_data = new Schema({
    client_id: { type: String, default: uuid.v1 },
    firstName: {
        type: String,
        require: true
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        require: true
    },
    contact: {
		phoneNumbers: {
        	type: Array,
        	require: true
   		},
		email: {
        	type: String,
		}
    },
	date_birth: {
		type: Date,
	},
	gender: {
        type: String,
    },
	ethnicity: {
		type: String,
	},
    address: {
        line1: {
            type: String,
        },
        line2: {
            type: String,
        },
        city: {
            type: String,
            require: true
        },
        county: {
            type: String,
        },
        zip: {
            type: String,
        }
    },
	emergency_contact: {
		contactname: {
			type: String,
		},
		contactnumber: {
			type: String,
		},
		relation: {
			type: String,
		}
	},
	healthinfo: {
		height: {
			type: String,
		},
		weight: {
			type: number(3)
		},
		blood_type: {
			type: String,
		},
		pre_conditions: {
			type: String,
		},
		current_meds: {
			type: String,
		},
		allergy: {
			type: String,
		}
	},
	organization_info: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'organization'
	}], //Wanted to create a "virtual foreign key" to link data from organization schema, found a relevant example on Stack Overflow here --> https://stackoverflow.com/questions/41175771/mongodbnodejs-foreign-keys-entire-document
}, {
    collection: 'clientData',
    timestamps: true
});

//collection for eventData
let event_data = new Schema({
    event_id: { type: String, default: uuid.v1 },
	org_id: {type: String, default: uuid.v1},
    eventName: {
        type: String,
        require: true
    },
    services: {
        type: Array,
    },
    date: {
        type: Date,
        require: true
    },
    address: {
        line1: {
            type: String,
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
        type: String,
    },
    attendees: [{
        type: String,
    }],
	organization_info: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'organization'
	}],
}, {
    collection: 'eventData'
});


// create models from mongoose schemas
const organization = mongoose.model('organizationData', org_data);
const clientinfo = mongoose.model('clientData', client_data);
const eventdata = mongoose.model('eventData', event_data);
// package the models in an object to export 
module.exports = { organization, clientinfo, eventdata }