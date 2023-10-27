const Course = require("../../models/course");
const asyncHandler = require("../../middleware/asynchandler");
const HttpError = require("../../middleware/errorhandler");

/**
 * @description get all courses
 * @route /api/v1/courses
 * @method get
 * @access public
 */

exports.httpGetCourses = asyncHandler(async (req, res, next) => {
    const courses = await Course.find();
    return res
        .status(200)
        .json({ success: true, count: courses.length, data: courses });
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
 * @route /api/v1/courses/
 * @method post
 * @access private
 */
exports.httpCreateCourse = asyncHandler(async (req, res, next) => {
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
    await course.deleteOne();
    return res.sendStatus(202);
});
