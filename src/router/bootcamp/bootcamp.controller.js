const Bootcamp = require("../../models/bootcamp.js");
const asyncHandler = require("../../middleware/asynchandler.js");
const HttpError = require("../../utils/error.js");

/**
 * @description get all bootcamps
 * @method GET
 * @route /api/v1/bootcamps
 * @access public
 */
exports.httpGetBootcamps = asyncHandler(async (req, res, next) => {
    const bootcamps = await Bootcamp.find().populate({
        path: "courses",
    });
    res.status(200).json(res.advancedResults);
});

/**
 * @description get bootcamp by id
 * @method GET
 * @route /api/v1/bootcamps/:id
 * @access public
 */
exports.httpGetBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id).populate({
        path: "courses",
    });
    if (!bootcamp) {
        return next(
            new HttpError(`Bootcamp with id ${req.params.id} not found`, 404)
        );
    }
    return res.status(200).json({ success: true, data: bootcamp });
});

/**
 * @description create bootcamp
 * @method Post
 * @route /api/v1/bootcamps/
 * @access private
 */
exports.httpCreateBootcamp = asyncHandler(async (req, res, next) => {
    req.body.user = req.user._id;
    const publishedBootcamps = await Bootcamp.find({ user: req.user._id });

    // If the user is not an admin they can only publish one bootcamp
    if (publishedBootcamps && req.user.role !== "admin") {
        return next(
            new HttpError(
                `User with ID ${req.user._id} has already published a bootcamp`,
                400
            )
        );
    }
    const bootcamp = await Bootcamp.create(req.body);
    return res.status(201).json({ success: true, data: bootcamp });
});

/**
 * @description update bootcamp
 * @method PUT
 * @route /api/v1/bootcamps/:id
 * @access private
 */
exports.httpUpdateBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
        return next(
            new HttpError(`Bootcamp with id ${req.params.id} not found`, 404)
        );
    }
    if (
        bootcamp.user.toString() !== req.user._id &&
        req.user.role !== "admin"
    ) {
        return next(
            new ErrorResponse(
                `User ${req.user._id} is not authorized to update this bootcamp`,
                401
            )
        );
    }
    await bootcamp.updateOne(req.body, { new: true, runValidators: true });
    return res.status(200).json({ success: true, data: bootcamp });
});

/**
 * @description delete bootcamp
 * @method DELETE
 * @route /api/v1/bootcamps/:id
 * @access private
 */

exports.httpDeleteBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
        return next(
            new HttpError(`Bootcamp with id ${req.params.id} not found`, 404)
        );
    }
    if (
        bootcamp.user.toString() !== req.user._id &&
        req.user.role !== "admin"
    ) {
        return next(
            new ErrorResponse(
                `User ${req.user._id} is not authorized to delete this bootcamp`,
                401
            )
        );
    }
    await bootcamp.deleteOne();
    return res.sendStatus(202);
});
