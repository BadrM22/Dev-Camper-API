const { Router } = require("express");
const {
    httpGetBootcamps,
    httpGetBootcamp,
    httpCreateBootcamp,
    httpUpdateBootcamp,
    httpDeleteBootcamp,
} = require("./bootcamp.controller.js");

const router = Router();

router.get("/", httpGetBootcamps);
router.get("/:id", httpGetBootcamp);
router.post("/", httpCreateBootcamp);
router.put("/:id", httpUpdateBootcamp);
router.delete("/:id", httpUpdateBootcamp);

module.exports = router;
