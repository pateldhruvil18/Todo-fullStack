const httpStatus = require("http-status");
const Todo = require("../models/todo.schema");
const { handleError } = require("../utils/handleError");
const { buildResponse } = require("../utils/buildResponse");

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    res.status(httpStatus.OK).json(todos);
  } catch (error) {
    handleError(res, error);
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    const todo = await Todo.create({
      title,
      description,
      dueDate,
      priority,
      user: req.user._id,
    });

    res.status(httpStatus.CREATED).json(todo);
  } catch (error) {
    handleError(res, error);
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Todo not found",
      });
    }

    const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(httpStatus.OK).json(updated);
  } catch (error) {
    handleError(res, error);
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(httpStatus.NOT_FOUND).json({ message: "Todo not found" });
    }
    await Todo.findByIdAndDelete(req.params.id);
    res.status(httpStatus.OK).json(buildResponse("Todo deleted"));
  } catch (error) {
    handleError(res, error);
  }
};
