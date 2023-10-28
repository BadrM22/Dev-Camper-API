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
const router = Router();

router.use("/:bootcampId/courses", CourseRouter);

router.get("/", advancedResults(Bootcamp, "courses"), httpGetBootcamps);
router.get("/:id", httpGetBootcamp);
router.post("/", httpCreateBootcamp);
router.put("/:id", httpUpdateBootcamp);
router.delete("/:id", httpDeleteBootcamp);

module.exports = router;
