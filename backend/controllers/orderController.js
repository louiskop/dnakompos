
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