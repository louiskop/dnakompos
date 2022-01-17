
// internal imports

// import models
const User = require('../models/user');

// import errorHandler and middleware
const ErrorHandler = require('../utils/errorHandler');
const asyncErrors = require('../middleware/asyncErrors');
const ApiFeatures = require('../utils/apiFeatures');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');

// package imports
const crypto = require('crypto');

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

// forgot password => /api/user/password/forgot
exports.forgotPassword = asyncErrors( async (req, res, next) => {

    // find user in db
    const user = await User.findOne({ email: req.body.email });

    // check if user exists
    if(!user){
        return next(new ErrorHandler('No user found with this email', 401));
    }

    // get password reset token
    const resetToken = user.getPasswordResetToken();

    // save token to the user
    await user.save({ validateBeforeSave : false });

    // create reset password url
    const resetURL = `${req.protocol}://${req.get('host')}/api/user/password/reset/${resetToken}`;

    // create reset message
    const message = `Your password reset token : \n\n${resetURL}\n\n If you have not requested this email, you can ignore this message.`;

    // send the email
    try{

        // send email
        await sendEmail({
            email: user.email,
            subject: 'DnaKompos Password Recovery',
            message
        });

        // success response
        res.status(200).json({
            success: true, 
            message: `Email sent to ${user.email}`
        });

    } catch (error) {

        // clear token
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        // save changes to user
        await user.save({ validateBeforeSave : false });
    
        return next(new ErrorHandler(error.message, 500));
    }


});

// reset password => /api/user/password/reset/:token
exports.resetPassword = asyncErrors( async (req, res, next) => {

    // hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    // get user with that token
    const user = await User.findOne({ 
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    // check if user exists
    if(!user){
        return next(new ErrorHandler('Password reset token is invalid or has expired.',400));
    }

    // check if the passwords match
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Passwords do not match.', 400));
    }

    // set new password
    user.password = req.body.password;

    // set password reset token & expiry date
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    // save user
    await user.save();

    // return jwt 
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