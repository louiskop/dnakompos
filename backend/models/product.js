
// package imports
const mongoose = require('mongoose');

// create schema
const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required : [true, 'Please enter product name'],
        trim: true,
        maxLength: [50, 'Product name cannot exceed 50 characters'], 
    },

    price : {
        type: Number,
        required: [true, 'Please enter product price'],
        maxLength: [6,  'Price cannot exceed R 999 999'],
        default: 0.0,
    },

    description : {
        type: String, 
        required: [true, 'Please enter product description'],
    },

    stock : {
        type: Number,
        required: [true, 'Please specify amount of stock'],
    },

    images : [{

        public_id : {
            type: String,
            required: true,
        },

        url : {
            type: String,
            required: true,
        }

    }],

    user : {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },

    category : {
        type: String,
        required: [true, 'Please enter product category'],
        enum : {
            values : [
                'Compost',
                'Tools',
            ],
            message : 'Please select a existing category',
        },
    },

});

// export schema
module.exports = mongoose.model(
    'Product',
    productSchema
);