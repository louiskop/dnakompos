
// internal imports
const ErrorHandler = require('../utils/errorHandler');

// export middleware function
module.exports = (err, req, res, next) => {

    // err is ErrorHandler object

    // check if statusCode and message is valid
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // update response with error object
    res.status(err.statusCode).json({
        success : false,
        error: err,
    });

}