
// package imports
const express = require('express');
const router = express.Router();

// internal imports
const { newOrder } = require('../controllers/orderController');
const { isAuthenticatedUser, authRoles } = require('../middleware/auth');

// configure routes
router.route('/order/new').post(isAuthenticatedUser, newOrder);

// export router
module.exports = router;