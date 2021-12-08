
// package imports
const mongoose = require('mongoose');

// create schema
const userSchema = new mongoose.Schema({

    name: {
        type: String, 
        required: [true, 'Please enter your name'],
        maxLength: [30, 'Your name cannot exceed 30 characters'],
    },

    email: {
        type: String, 
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email adress']
    },

    password: {
        type: String, 
        required: [true, 'Please enter your password'],
        minLength: [6, 'Your password must be longer than 6 characters'],
        select: false,
    },

    role: {
        type: String,
        default: 'user',
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    resetPasswordToken: {
        type: String,
    },

    resetPasswordExpire: {
        type: Date,
    }

});

mongoose.exports = mongoose.model('User', userSchema);