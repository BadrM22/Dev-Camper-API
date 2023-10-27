const { Router } = require("express");
const {
    httpGetCourses,
    httpGetCourse,
    httpCreateCourse,
    httpUpdateCourse,
    httpDeleteCourse,
} = require("./course.controller");

const router = Router();

router.get("/", httpGetCourses);
router.get("/:id", httpGetCourse);
router.post("/", httpCreateCourse);
router.put("/:id", httpUpdateCourse);
router.delete("/:id", httpDeleteCourse);

module.exports = router;
