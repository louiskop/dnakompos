
// package imports
const express = require('express');
const router = express.Router();

// internal imports
const { registerUser, loginUser } = require('../controllers/userController');

// configure routes
router.route('/user/register').post(registerUser);
router.route('/user/login').post(loginUser);

// export routes
module.exports = router;