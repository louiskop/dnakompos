
// internal imports

//  import models
const Product = require('../models/product');

//  import error handler and middleware
const ErrorHandler = require('../utils/errorHandler');
const asyncErrors = require('../middleware/asyncErrors');
const ApiFeatures = require('../utils/apiFeatures');


// create product => /api/admin/product/new
exports.createProduct = asyncErrors(async (req, res, next) => {

    // create new product
    const product = await Product.create(req.body);
    
    // send new product
    res.status(201).json({
        success : true,
        product,
    });

});


// get all products => /api/products (?keyword=xyz)
exports.getProducts = asyncErrors(async (req, res, next) => {

    // pagination
    const resultsPerPage = 2;
    const productCount = await Product.countDocuments();


    // new ApiFeatures instance for search, filtering, pagination
    const apiFeatures = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultsPerPage);

    // get all products
    const products = await apiFeatures.query;
    
    // send products
    res.status(200).json({
        success: true,
        count: products.length,
        totalProductCount: productCount,
        products,
    });

});


// get single product => api/product/:id
exports.getSingleProduct = asyncErrors(async (req, res, next) => {

    // get product
    const product = await Product.findById(req.params.id);

    // check if product exists
    if(!product){
        return next(new ErrorHandler('Product not Found', 404));
    }

    // return product
    res.status(200).json({
        success: true,
        product 
    });

});


// update product => api/admin/product/:id
exports.updateProduct = asyncErrors(async (req, res, next) => {

    // get product
    let product = await Product.findById(req.params.id);

    // check if product exists
    if(!product){
        return next(new ErrorHandler('Product not Found', 404));
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

});

// delete product => api/admin/product/:id
exports.deleteProduct = asyncErrors(async (req, res, next) => {

    // get product
    const product = await Product.findById(req.params.id);

    // check if product exists
    if(!product){
        return next(new ErrorHandler('Product not Found', 404));
    }

    // remove product
    await product.remove();

    res.status(200).json({
        success : true,
        message : "The product has been deleted."
    });


});