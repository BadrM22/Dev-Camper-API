const asyncHandler = require("../../middleware/asynchandler");
const HttpError = require("../../middleware/errorhandler");
const Review = require("../../models/reviews");
const Bootcamp = require("../../models/bootcamp");

/**
 * @description get all reviews
 * @rotue /api/v1/reviews
 * @route /api/v1/bootcamps/:bootcampId/reviews
 * @access public
 */

exports.httpGetReviews = asyncHandler(async (req, res, next) => {
    if (req.params.bootcampId) {
        const reviews = await Review.find({ bootcamp: req.params.bootcampId });
        return res
            .status(200)
            .json({ success: true, count: reviews.length, data: reviews });
    }
    return res.status(200).json(res.advancedResults);
});

/**
 * @description get single review
 * @rotue /api/v1/reviews/:id
 * @access public
 */
exports.httpGetReview = asyncHandler(async (req, res, next) => {
    const review = await Review.find({ _id: req.params.id });
    if (!review) {
        return next(
            new HttpError(`Review with ID ${req.params.id} not found`, 404)
        );
    }
    return res.status(200).json({ success: true, data: review });
});

/**
 * @description create review
 * @route POST /api/v1/bootcamps/:bootcampId/reviews
 * @access private
 */

exports.createReview = asyncHandler(async (req, res, next) => {
    req.body.bootcamp = req.params.bootcampId;
    req.body.user = req.user._id;
    const bootcamp = await Bootcamp.findById(req.params.bootcampId);
    if (!bootcamp) {
        return next(
            new ErrorResponse(
                `No bootcamp with the id of ${req.params.bootcampId}`,
                404
            )
        );
    }
    const review = await Review.create(req.body);
    return res.status(201).json({ success: true, data: review });
});

/**
 * @description create review
 * @route PUT /api/v1/reviews/:id
 * @access private
 */

exports.httpUpdateReview = asyncHandler(async (req, res, next) => {
    const review = await Review.findById(req.params.id);
    if (!review) {
        return next(
            new ErrorResponse(`No review with the id of ${req.params.id}`, 404)
        );
    }
    if (review.user.toString() !== req.user._id && req.user.role !== "admin") {
        return next(new ErrorResponse(`Not authorized to update review`, 401));
    }
    await review.updateOne(req.body, { new: true, runValidators: true });
    return res.status(200).json({ success: true, data: review });
});

/**
 * @description delete review
 * @route DELETE /api/v1/reviews/:id
 * @access private
 */

exports.httpDeleteReview = asyncHandler(async (req, res, next) => {
    const review = await Review.findById(req.params.id);
    if (!review) {
        return next(
            new ErrorResponse(`No review with the id of ${req.params.id}`, 404)
        );
    }
    if (review.user.toString() !== req.user._id && req.user.role !== "admin") {
        return next(new ErrorResponse(`Not authorized to update review`, 401));
    }
    await review.deleteOne();
    return res.sendStatus(202);
});
