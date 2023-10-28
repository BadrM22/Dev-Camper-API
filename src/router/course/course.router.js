const { Router } = require("express");
const {
    httpGetCourses,
    httpGetCourse,
    httpCreateCourse,
    httpUpdateCourse,
    httpDeleteCourse,
} = require("./course.controller");
const { protect, authorize } = require("../../middleware/auth");

const router = Router({ mergeParams: true });

router.get("/", httpGetCourses);
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
