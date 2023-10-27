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
    const bootcamps = await Bootcamp.find();
    return res
        .status(200)
        .json({ success: true, count: bootcamps.length, data: bootcamps });
});

/**
 * @description get bootcamp by id
 * @method GET
 * @route /api/v1/bootcamps/:id
 * @access public
 */
exports.httpGetBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);
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
    await bootcamp.deleteOne();
    return res.sendStatus(202);
});
