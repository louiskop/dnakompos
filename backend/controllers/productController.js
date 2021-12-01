
// import models
const Product = require('../models/product');


// create product => /api/product/new
exports.createProduct = async (req, res, next) => {

    // create new product
    const product = await Product.create(req.body);
    
    // send new product
    res.status(201).json({
        success : true,
        product,
    });

};