const { Router } = require("express");
const {
    httpGetCourses,
    httpGetCourse,
    httpCreateCourse,
    httpUpdateCourse,
    httpDeleteCourse,
} = require("./course.controller");
const { protect, authorize } = require("../../middleware/auth");
const advancedResults = require("../../middleware/advancedResults");
const Course = require("../../models/course");

const router = Router({ mergeParams: true });

router.get(
    "/",
    advancedResults(Course, { path: "bootcamp", select: "name description" }),
    httpGetCourses
);

router.get("/:id", httpGetCourse);

router.post("/", protect, authorize("publisher", "admin"), httpCreateCourse);

router.put("/:id", protect, authorize("publisher", "admin"), httpUpdateCourse);

router.delete(
    "/:id",
    protect,
    authorize("publisher", "admin"),
    httpDeleteCourse
);

module.exports = router;
