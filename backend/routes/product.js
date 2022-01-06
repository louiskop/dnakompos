
// package imports
const express = require('express');
const { get } = require('mongoose');
const router = express.Router();

// internal imports
const { createProduct, getProducts, getSingleProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { isAuthenticatedUser } = require('../middleware/auth');

// configure routes
router.route('/admin/product/new').post(isAuthenticatedUser, createProduct);
router.route('/admin/product/:id').put(isAuthenticatedUser, updateProduct).delete(isAuthenticatedUser, deleteProduct);
router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);


// export routes
module.exports = router;