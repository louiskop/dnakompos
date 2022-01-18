
// package imports
const express = require('express');
const router = express.Router();

// internal imports
const { registerUser,
        loginUser,
        logoutUser,
        forgotPassword,
        resetPassword,
        userDetails,
        updatePassword,
        updateDetails,
} = require('../controllers/userController');

const { isAuthenticatedUser } = require('../middleware/auth');

// configure routes
router.route('/user/register').post(registerUser);
router.route('/user/login').post(loginUser);
router.route('/user/logout').get(logoutUser);
router.route('/user/details').get(isAuthenticatedUser, userDetails);
router.route('/user/details/update').put(isAuthenticatedUser, updateDetails);

router.route('/user/password/forgot').post(forgotPassword);
router.route('/user/password/reset/:token').put(resetPassword);
router.route('/user/password/update').put(isAuthenticatedUser, updatePassword);

// export routes
module.exports = router;