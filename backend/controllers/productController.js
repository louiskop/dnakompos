
// import models
const Product = require('../models/product');


// create product => /api/admin/product/new
exports.createProduct = async (req, res, next) => {

    // create new product
    const product = await Product.create(req.body);
    
    // send new product
    res.status(201).json({
        success : true,
        product,
    });

};


// get all products => /api/products
exports.getProducts = async (req, res, next) => {

    // get all products
    const products = await Product.find();

    // send products
    res.status(200).json({
        success: true,
        count: products.length,
        products,
    });

};


// get single product => api/product/:id
exports.getSingleProduct = async (req, res, next) => {

    // get product
    const product = await Product.findById(req.params.id);

    // check if product exists
    if(!product){
        res.status(404).json({
            success : false,
            message : "Product not found",
        });
    }

    // return product
    res.status(200).json({
        success: true,
        product 
    });

};


// update product => api/admin/product/:id
exports.updateProduct = async (req, res, next) => {

    // get product
    let product = await Product.findById(req.params.id);

    // check if product exists
    if(!product){
        res.status(404).json({
            success : false,
            message : "Product not found",
        });
    }

    // update product
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    // send updated product
    res.status(200).json({
        success: true,
        product,
    });

};

// delete product => api/admin/product/:id
exports.deleteProduct = async (req, res, next) => {

    // get product
    const product = await Product.findById(req.params.id);

    // check if product exists
    if(!product){
        res.status(404).json({
            success : false,
            message : "Product not found",
        });
    }

    // remove product
    await product.remove();

    res.status(200).json({
        success : true,
        message : "The product has been deleted."
    });


};