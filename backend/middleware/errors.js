
// internal imports
const ErrorHandler = require('../utils/errorHandler');

// export middleware function
module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;

    // developer errors
    if(process.env.NODE_ENV === 'DEVELOPMENT'){

        res.status(err.statusCode).json({
            success: false,
            error: err,
            errorMessage: err.message,
            errorStack: err.stack,
        });

    }

    // production errors
    if(process.env.NODE_ENV === 'PRODUCTION'){
        
        err.message = err.message || "Internal Server Error";

        // mongoose wrong object id error
        if(err.name === 'CastError'){
            const message = `Resource not found. Invalid: ${err.path}`;
            err = new ErrorHandler(message,400);
        }

        // mongoose validation errors
        if(err.name === 'ValidationError'){
            const message = Object.values(err.errors).map(value => value.message);
            err = new ErrorHandler(message, 400);
        }

        // mongoose duplicate key error
        if(err.code === 11000){
            const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
            err = new ErrorHandler(message, 400);
        }

        // wrong JWT error
        if(err.name === 'JsonWebTokenError'){
            const message = 'JSON Web Token is invalid. Try again!';
            err = new ErrorHandler(message, 400);
        }

        // expired JWT error
        if(err.name === 'TokenExpiredError'){
            const message = 'JSON Web Token is expired. Try again!';
            err = new ErrorHandler(message, 400);
        }

        res.status(err.statusCode).json({
            success : false,
            message: err.message,
        });

    }

}