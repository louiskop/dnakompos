
// internal imports
const Review = require('../models/review');

const ErrorHandler = require('../utils/errorHandler');
const asyncErrors = require('../middleware/asyncErrors');


// create review => /api/review/new
exports.createReview = asyncErrors( async (req, res, next) => {

    // get info for review
    const reviewInfo = {
        body: req.body.reviewBody,
        user: req.user.id,
    };

    // create review
    const review = await Review.create(reviewInfo);

    // send res
    res.status(200).json({
        success: true,
        review
    });

});

// get all reviews => /api/reviews
exports.getReviews = asyncErrors( async (req, res, next) => {

    // get reviews
    const reviews = await Review.find();

    // return reviews
    res.status(200).json({
        success: true,
        count: reviews.length,
        reviews,
    });

});

// delete a review => /api/admin/review/:id
exports.deleteReview = asyncErrors( async (req, res, next) => {

    // get review
    const review = await Review.findById(req.params.id);

    // check if review exists
    if(!review){
        return next(new ErrorHandler(`Review does not exist with id: ${req.params.id}`, 404));    
    }

    // delete review
    await review.remove();

    // send res
    res.status(200).json({
        success: true,
    });

});
