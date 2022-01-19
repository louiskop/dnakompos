
// package imports
const express = require('express');
const router = express.Router();

// internal imports
const { newOrder, getSingleOrder, getActiveUserOrders, getAllOrders, processOrder, deleteOrder } = require('../controllers/orderController');
const { isAuthenticatedUser, authRoles } = require('../middleware/auth');

// configure routes
router.route('/order/new').post(isAuthenticatedUser, newOrder);
router.route('/order/me').get(isAuthenticatedUser, getActiveUserOrders);
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);

router.route('/admin/orders').get(isAuthenticatedUser, authRoles('admin'), getAllOrders);
router.route('/admin/order/:id').put(isAuthenticatedUser, authRoles('admin'), processOrder)
                                .delete(isAuthenticatedUser, authRoles('admin'), deleteOrder);

// export router
module.exports = router;