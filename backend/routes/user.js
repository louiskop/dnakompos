
// package imports
const express = require('express');
const router = express.Router();

// internal imports
const { registerUser, loginUser, logoutUser, forgotPassword } = require('../controllers/userController');

// configure routes
router.route('/user/register').post(registerUser);
router.route('/user/login').post(loginUser);
router.route('/user/logout').get(logoutUser);

router.route('/user/password/forgot').post(forgotPassword);

// export routes
module.exports = router;