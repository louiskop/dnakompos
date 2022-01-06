
// package imports
const express = require('express');
const router = express.Router();

// internal imports
const { registerUser, loginUser, logoutUser } = require('../controllers/userController');

// configure routes
router.route('/user/register').post(registerUser);
router.route('/user/login').post(loginUser);
router.route('/user/logout').get(logoutUser);

// export routes
module.exports = router;