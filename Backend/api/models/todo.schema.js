const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
    {
       title: {
        type: String,
        required: true
       },
       description : String,
       completed: {
        type: Boolean,
        default: false
       },
       priority: {
        type: String,
        enum: ["low", "medium","high"],
        default: "low"
       },
       dueDate: Date,
       user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
       }
    },
    {timestamps:true}
)

module.exports = mongoose.model("Todo", todoSchema)
