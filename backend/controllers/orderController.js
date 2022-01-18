
// internal imports
const Order = require('../models/order');
const Product = require('../models/product');

const ErrorHandler = require('../utils/errorHandler');
const asyncErrors = require('../middleware/asyncErrors');

// create new order
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