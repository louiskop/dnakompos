
// internal imports

// import models
const User = require('../models/user');

// import errorHandler and middleware
const ErrorHandler = require('../utils/errorHandler');
const asyncErrors = require('../middleware/asyncErrors');
const ApiFeatures = require('../utils/apiFeatures');

// register user => /api/register
exports.registerUser = asyncErrors( async (req, res, next) => {

    // get user details from req.body
    const {name, email, password} = req.body;

    // create user
    const user = await User.create({
        name,
        password,
        email,
    });

    // get JWT 
    const token = user.getJWT();

    // send back user JWT
    res.status(201).json({
        success: true,
        token,
    });
    
});