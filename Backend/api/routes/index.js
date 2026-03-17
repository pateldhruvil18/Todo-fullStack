const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");
const todoRoutes = require("./todo.routes");
const uploadRoutes = require("./upload.routes");

router.use("/auth", authRoutes);
router.use("/todos", todoRoutes);
router.use("/upload", uploadRoutes);

module.exports = router;
