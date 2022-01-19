
// package imports
const express = require('express');
const router = express.Router();

// internal imports
const { isAuthenticatedUser, authRoles } = require('../middleware/auth');
const { createReview, getReviews, deleteReview} = require('../controllers/reviewController');

// configure routes
router.route('/review/new').post(isAuthenticatedUser, createReview);
router.route('/reviews').get(getReviews);
router.route('/admin/review/:id').delete(isAuthenticatedUser, authRoles('admin'), deleteReview);

// export router
module.exports = router;