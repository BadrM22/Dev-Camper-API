const { Router } = require("express");
const {
    httpGetBootcamps,
    httpGetBootcamp,
    httpCreateBootcamp,
    httpUpdateBootcamp,
    httpDeleteBootcamp,
} = require("./bootcamp.controller.js");

const router = Router();

// router.use("/:bootcampId/courses")

router.get("/", httpGetBootcamps);
router.get("/:id", httpGetBootcamp);
router.post("/", httpCreateBootcamp);
router.put("/:id", httpUpdateBootcamp);
router.delete("/:id", httpDeleteBootcamp);

module.exports = router;
