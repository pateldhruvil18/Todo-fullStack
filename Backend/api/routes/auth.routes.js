const express = require("express");
const router = express.Router();

const { register, login, getMe, verifyOtp } = require("../controllers/auth.controller");
const protect = require("../middlewares/auth.middleware");
const { validateRegister, validateLogin } = require("../validators/auth.validator");

router.post("/register", validateRegister, register);
router.post("/verify-otp", verifyOtp)
router.post("/login", validateLogin, login);
router.post("/me",protect, getMe);

module.exports = router
