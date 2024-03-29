
// create + send json web token & save in the cookie

const sendToken = (user, statusCode, res) => {

    // create jwt 
    const token = user.getJWT();


    // specify options for cookie
    const options = {

        // specify expiry date in milliseconds
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),

        // http only cookie 
        httpOnly: true,

    };

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token, 
        user
    });


};


module.exports = sendToken;