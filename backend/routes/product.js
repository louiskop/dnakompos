
// package imports
const express = require('express');
const { get } = require('mongoose');
const router = express.Router();

// internal imports
const { createProduct } = require('../controllers/productController');

// configure routes
router.route('/product/new').post(createProduct);


// export routes
module.exports = router;