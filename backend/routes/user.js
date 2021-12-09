
// package imports
const express = require('express');
const router = express.Router();

// internal imports
const { registerUser } = require('../controllers/userController');

// configure routes
router.route('/user/register').post(registerUser);

// export routes
module.exports = router;