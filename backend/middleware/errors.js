
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

        res.status(err.statusCode).json({
            success : false,
            message: err.message,
        });

    }

}