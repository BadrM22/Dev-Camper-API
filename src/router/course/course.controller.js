const Course = require("../../models/course");
const asyncHandler = require("../../middleware/asynchandler");
const HttpError = require("../../middleware/errorhandler");
const Bootcamp = require("../../models/bootcamp");

/**
 * @description get all courses
 * @route /api/v1/courses
 * @route /api/v1/bootcampId/courses
 * @method get
 * @access public
 */

exports.httpGetCourses = asyncHandler(async (req, res, next) => {
    if (req.params.bootcampId) {
        const courses = await Course.find({ bootcamp: req.params.bootcampId });
        return res
            .status(200)
            .json({ success: true, count: courses.length, data: courses });
    }
    return res.status(200).json(res.advancedResults);
});

/**
 * @description get course by id
 * @route /api/v1/courses/:id
 * @method get
 * @access public
 */
exports.httpGetCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
        return next(
            new HttpError(`Course with id ${req.params.id} not found`, 404)
        );
    }
    return res.status(200).json({ success: true, data: course });
});

/**
 * @description create course
 * @route /api/v1/bootcamps/bootcampId/courses/
 * @method post
 * @access private
 */
exports.httpCreateCourse = asyncHandler(async (req, res, next) => {
    req.body.bootcamp = req.params.bootcampId;
    req.body.user = req.user._id;
    const bootcamp = await Bootcamp.findById(req.params.bootcampId);
    if (!bootcamp) {
        return next(
            new HttpError(
                `No bootcamp with the id of ${req.params.bootcampId}`,
                404
            )
        );
    }
    if (
        bootcamp.user.toString() !== req.user._id &&
        req.user.role !== "admin"
    ) {
        return next(
            new ErrorResponse(
                `User ${req.user.id} is not authorized to add a course to bootcamp ${bootcamp._id}`,
                401
            )
        );
    }
    const course = await Course.create(req.body);
    return res.status(201).json({ success: true, data: course });
});

/**
 * @description update course
 * @route /api/v1/courses/:id
 * @method put
 * @access private
 */
exports.httpUpdateCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
        if (!course) {
            return next(
                new HttpError(`Course with id ${req.params.id} not found`, 404)
            );
        }
    }
    if (course.user.toString() !== req.user._id && req.user.role !== "admin") {
        return next(
            new ErrorResponse(
                `User ${req.user.id} is not authorized to update course ${course._id}`,
                401
            )
        );
    }
    await course.updateOne(req.body, { new: true, runValidators: true });
    return res.status(200).json({ success: true, data: course });
});

/**
 * @description delete course
 * @route /api/v1/courses/:id
 * @method delete
 * @access private
 */
exports.httpDeleteCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
        if (!course) {
            return next(
                new HttpError(`Course with id ${req.params.id} not found`, 404)
            );
        }
    }
    if (course.user.toString() !== req.user._id && req.user.role !== "admin") {
        return next(
            new ErrorResponse(
                `User ${req.user.id} is not authorized to delete course ${course._id}`,
                401
            )
        );
    }
    await course.deleteOne();
    return res.sendStatus(202);
});
