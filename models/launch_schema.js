// grab the things we need
var mongoose = require('mongoose');
var schema = mongoose.Schema;

// create a schema
var launchSchema = new schema({    
    name: {type: String, required: true},
    rocket_type: String,
    rocket_class: String,
    has_launched: Boolean,
    launch_successful: Boolean,
    location: {
        city: String,
        state: String,
        country: String,
        name: String
    },
    created_at: {type: Date, default: Date.now},
    updated_at: Date,
    notes: String
});

// create a model using the schema
var launch = mongoose.model('launch', launchSchema);

// make this available to our users in our Node applications
module.exports = launch;