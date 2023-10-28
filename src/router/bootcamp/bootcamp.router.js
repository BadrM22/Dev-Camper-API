const { Router } = require("express");
const {
    httpGetBootcamps,
    httpGetBootcamp,
    httpCreateBootcamp,
    httpUpdateBootcamp,
    httpDeleteBootcamp,
} = require("./bootcamp.controller.js");
const CourseRouter = require("../course/course.router.js");
const advancedResults = require("../../middleware/advancedResults.js");
const Bootcamp = require("../../models/bootcamp.js");
const { protect, authorize } = require("../../middleware/auth");
const router = Router();

router.use("/:bootcampId/courses", CourseRouter);

router.get("/", advancedResults(Bootcamp, "courses"), httpGetBootcamps);
router.get("/:id", httpGetBootcamp);
router.post("/", protect, authorize("publisher", "admin"), httpCreateBootcamp);

router.put(
    "/:id",
    protect,
    authorize("publisher", "admin"),
    httpUpdateBootcamp
);
router.delete(
    "/:id",
    protect,
    authorize("publisher", "admin"),
    httpDeleteBootcamp
);

module.exports = router;
