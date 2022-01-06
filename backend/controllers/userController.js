
// internal imports

// import models
const User = require('../models/user');

// import errorHandler and middleware
const ErrorHandler = require('../utils/errorHandler');
const asyncErrors = require('../middleware/asyncErrors');
const ApiFeatures = require('../utils/apiFeatures');
const sendToken = require('../utils/jwtToken');

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

    sendToken(user, 201, res);
    
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
    const isPasswordCorrect = await user.comparePassword(password);

    if(!isPasswordCorrect){
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    sendToken(user, 200, res);

}); 

// logout user => /api/logout
exports.logoutUser = asyncErrors( async (req, res, next) => {

    // clear the token on the cookie
    res.cookie('token', null, {
        expires : new Date(Date.now()),
        httpOnly: true,  
    });

    // return res
    res.status(200).json({
        success: true,
        message: "Logged out"
    });

});