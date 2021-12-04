
// Error class

class ErrorHandler extends Error{

    constructor(message, statusCode){
        
        // call parent class 'Error' constructor
        super(message);

        this.statusCode = statusCode;

        // give error .stack property
        Error.captureStackTrace(this, this.constructor);

    }


}   

module.exports = ErrorHandler;