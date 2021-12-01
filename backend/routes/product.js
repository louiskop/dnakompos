
// package imports
const express = require('express');
const { get } = require('mongoose');
const router = express.Router();

// internal imports
const { getProducts } = require('../controllers/productController');

// test routes
router.route('/products').get(getProducts);


// export routes
module.exports = router;