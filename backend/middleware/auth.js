
// internal imports
const asyncErrors = require('./asyncErrors');
const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');

// package imports
const jwt = require('jsonwebtoken');

// check whether user is authenticated
exports.isAuthenticatedUser = asyncErrors( async (req, res, next) => {

    console.log("[+] Running authenticatedUser middleware ... ");
    
    // get jwt from cookie
    const { token } = req.cookies;

    // check validity of cookie
    if(!token){
        return next(new ErrorHandler('Login to access this resource',401));
    }

    // verify and decode the jwt
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // find the user with that id and assign it to the request object
    req.user = await User.findById(decoded.id);

    next();
});