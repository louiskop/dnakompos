
// package imports
const mongoose = require('mongoose');

// create schema
const orderSchema = new mongoose.Schema({

    shippingInfo : {

        address: {
            type: String,
            required: true,
        },

        city: {
            type: String, 
            required: true,
        },

        phoneNum: {
            type: String,
            required: true,
        },

        postalCode: {
            type: String,
            required: true,
        }

    },

    user : {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'User',
    },

    itemsOrdered: [{
        
        name: {
            type: String,
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
        },

        image: {
            type: String, 
            required: true,
        },

        price: {
            type: String, 
            required: true,

        },

        product: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Product',
            required: true,
        },

    }],

    // payments with stripe
    paymentInfo: {
        
        id: {
            type: String,
        },

        status: {
            type: String,
        }
    },

    paidAt: {
        type: Date,
    },

    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },

    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },

    totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },

    orderStatus: {
        type: String,
        required: true,
        default: 'Processing',
    },

    deliveredAt: {
        type: Date,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

});

// export schema
module.exports = mongoose.model('Order', orderSchema);