const express = require("express");
const router = express.Router();

const {register, login, getMe, verifyOtp} = require("../controllers/auth.controller");
const protect = require("../middleware/auth.middleware");

router.post("/register",register);
router.post("/verify-otp", verifyOtp)
router.post("/login",login);
router.post("/me",protect, getMe);

module.exports = router