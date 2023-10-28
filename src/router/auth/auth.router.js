const { Router } = require("express");
const { register, login, currentUser } = require("./auth.controller");
const { protect } = require("../../middleware/auth");

const router = Router();

router.get("/me", protect, currentUser);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
