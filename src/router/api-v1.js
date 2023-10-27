const { Router } = require("express");
const AuthRouter = require("./auth/auth.router");
const BootcampRouter = require("./bootcamp/bootcamp.router");

const router = Router();

router.use("/auth", AuthRouter);
router.use("/bootcamps", BootcampRouter);
module.exports = router;
