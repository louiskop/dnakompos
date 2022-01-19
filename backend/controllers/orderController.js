
// internal imports
const Order = require('../models/order');
const Product = require('../models/product');

const ErrorHandler = require('../utils/errorHandler');
const asyncErrors = require('../middleware/asyncErrors');

// create new order => /api/order/new
exports.newOrder = asyncErrors( async (req, res, next) => {

    // get info from req
    const {
        itemsOrdered,
        shippingInfo,
        itemsPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
    } = req.body;

    // create new order
    const order = await Order.create({
        itemsOrdered,
        shippingInfo,
        itemsPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id,
    });

    // send res
    res.status(200).json({
        successs: true,
        order
    });

});

// get single order => /api/order/:id
exports.getSingleOrder = asyncErrors( async (req, res, next) => {

    //get order and populate
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    // check if order exists
    if(!order){
        return next(new ErrorHandler(`No order found with id: ${req.params.id}`, 404));
    }

    // return order
    res.status(200).json({
        sucess: true,
        order,
    })

});

// get current user orders => /api/order/me
exports.getActiveUserOrders = asyncErrors( async (req, res, next) => {

    // get all orders
    const orders = await Order.find({ user: req.user.id });

    // return orders
    res.status(200).json({
        sucess: true,
        orders
    });

});

// admin routes

// get all orders => /api/admin/orders
exports.getAllOrders = asyncErrors( async (req, res, next) => {

    // get all orders
    const orders = await Order.find();

    // get total amount received
    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice;
    });

    // return orders
    res.status(200).json({
        success: true,
        count: orders.length,
        totalAmount,
        orders,
    });

});

// update & process orders => api/admin/order/:id
exports.processOrder = asyncErrors(async (req, res, next) => {

    // get order
    const order = await Order.findById(req.params.id);

    // check if order exists
    if(!order){
        return next(new ErrorHandler(`No order found with id: ${req.params.id}`, 404));
    }

    // check if order has been delivered
    if(order.orderStatus === 'Delivered'){
        return next(new ErrorHandler('You have already delivered this order', 400));
    }

    // update stock
    order.itemsOrdered.forEach(async (item) => {
        await updateStock(item.product, item.quantity);
    });

    // change order status
    order.orderStatus = req.body.orderStatus;
    order.deliveredAt = Date.now();

    // save the order
    await order.save({ validateBeforeSave: false});
    
    // send res
    res.status(200).json({
        success: true,
    });

});

// function for stock updating
async function updateStock(id, quantity){
    
    // get product
    const product = await Product.findById(id);

    // decrease stock
    product.stock = product.stock - quantity;

    // save product
    await product.save({ validateBeforeSave: false });

}

// delete order => /api/admin/order/:id
exports.deleteOrder = asyncErrors( async (req, res, next) => {

    // get order
    const order = await Order.findById(req.params.id);

    // check if order exists
    if(!order){
        return next(new ErrorHandler(`Order does not exist with id: ${req.params.id}.`));
    }

    // delete order
    await order.remove();

    // return res
    res.status(200).json({
        success: true,
    });
    
});