const Todo = require("../models/Todo");

exports.getTodos = async (req, res) => {
    const todos = await Todo.find({user: req.user._id});
    res.json(todos);
}

exports.createTodo = async (req, res) => {
    const {title, description, priority, dueDate} = req.body

    const todo = await Todo.create({
        title,
        description,
        dueDate,
        priority,
        user: req.user._id
    });

    res.json(todo);
}

exports.updateTodo = async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    if(!todo){
        return res.status(404).json({
            message: "Todo not found"
        })
    }

    const updated = await Todo.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    );

    res.json(updated)
};

exports.deleteTodo = async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({
        message: "Todod deleted"
    })
}