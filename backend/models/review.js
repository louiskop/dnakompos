
// package imports
const mongoose = require('mongoose');

// create schema
const reviewSchema = mongoose.Schema({

    // user : {}

    body : {
        type: String,
        required: [true, 'Please enter a review...'],
        maxLength: [300, 'Review body cannot exceed 200 characters'],
    },
    
    date : {
        type: Date,
        default: Date.now,
    },


});


// export schema
module.exports = mongoose.model(
    'Review',
    reviewSchema
);