import { useState } from "react";
import { deleteTodo, updateTodo } from "../services/todo.service";
import type { Todo, Priority } from "../types/todo.types";

type TodoCardProps = {
  todo: Todo;
  refetch: () => void;
};

export default function TodoCard({ todo, refetch }: TodoCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || "");
  const [priority, setPriority] = useState<Priority>(todo.priority);
  const [dueDate, setDueDate] = useState(
    todo.dueDate ? todo.dueDate.split("T")[0] : ""
  );

  const remove = async () => {
    await deleteTodo(todo._id);
    refetch();
  };

  const saveUpdate = async () => {
    await updateTodo(todo._id, {
      title,
      description,
      priority,
      dueDate,
    });

    setIsEditing(false);
    refetch();
  };

  const priorityColor: Record<Priority, string> = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex flex-col md:flex-row md:items-start md:justify-between gap-4">

      {/* Left Content */}
      <div className="flex flex-col gap-2 w-full">

        {isEditing ? (
          <>
            <input
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="flex flex-col md:flex-row gap-3">

              <select
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>

              <input
                type="date"
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />

            </div>
          </>
        ) : (
          <>
            <h3 className="text-lg font-semibold text-gray-800">
              {todo.title}
            </h3>

            {todo.description && (
              <p className="text-gray-600 text-sm">{todo.description}</p>
            )}

            <div className="flex items-center gap-3 mt-2">

              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${priorityColor[todo.priority]}`}
              >
                {todo.priority}
              </span>

              {todo.dueDate && (
                <span className="text-xs text-gray-600">
                  Due: {new Date(todo.dueDate).toLocaleDateString()}
                </span>
              )}

            </div>
          </>
        )}

      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 md:flex-col md:items-end">

        {isEditing ? (
          <button
            onClick={saveUpdate}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            Edit
          </button>
        )}

        <button
          onClick={remove}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Delete
        </button>

      </div>

    </div>
  );
}