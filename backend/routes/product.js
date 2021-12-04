
// package imports
const express = require('express');
const { get } = require('mongoose');
const router = express.Router();

// internal imports
const { createProduct, getProducts, getSingleProduct, updateProduct, deleteProduct } = require('../controllers/productController');

// configure routes
router.route('/admin/product/new').post(createProduct);
router.route('/admin/product/:id').put(updateProduct).delete(deleteProduct);
router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);


// export routes
module.exports = router;