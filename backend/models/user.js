
// package imports
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
        minlength: [6, 'Your password must be longer than 6 characters'],
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

// encrypt passwords before saving (no arrow func, because of 'this')
userSchema.pre('save', async function(next){

    // check if password was updated
    if(!this.isModified('password')){
        next();
    }

    // encrypt (length of hash = 10)
    this.password = await bcrypt.hash(this.password, 10);


});


// export schema
module.exports = mongoose.model('User', userSchema);