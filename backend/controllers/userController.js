
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

// login user => /api/login
exports.loginUser = asyncErrors( async (req, res, next) => {

    // get email and password of user
    const {email, password} = req.body;

    // validate email and password is entered
    if(!email || !password){
        return next(new ErrorHandler('Please enter email and password', 400));
    }

    // find user in db
    const user = await User.findOne({email}).select('+password');

    // check if user exists
    if(!user){
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    // check if password is correct
    const isPasswordCorrect = await User.comparePassoword(password);

    if(!isPasswordCorrect){
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    // get JWT
    const token = user.getJWT();

    // send back user token
    res.status(200).json({
        success: true,
        token
    });

}); 