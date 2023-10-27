const { Router } = require("express");
const AuthRouter = require("./auth/auth.router");

const router = Router();
router.use("/auth", AuthRouter);

module.exports = router;
