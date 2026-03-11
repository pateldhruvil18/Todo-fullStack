const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {getTodos, createTodo, updateTodo, deleteTodo} = require("../controllers/todo.controller")

router.get("/", protect, getTodos);
router.post("/", protect, createTodo);
router.put("/:id",protect, updateTodo);
router.delete("/:id", protect, deleteTodo);

module.exports = router