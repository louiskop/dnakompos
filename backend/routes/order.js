
// package imports
const express = require('express');
const router = express.Router();

// internal imports
const { newOrder, getSingleOrder, getActiveUserOrders } = require('../controllers/orderController');
const { isAuthenticatedUser, authRoles } = require('../middleware/auth');

// configure routes
router.route('/order/new').post(isAuthenticatedUser, newOrder);
router.route('/order/me').get(isAuthenticatedUser, getActiveUserOrders);
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);


// export router
module.exports = router;