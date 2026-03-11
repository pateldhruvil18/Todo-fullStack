import { useState } from "react";
import { createTodo } from "../services/todo.service";
import { toast } from "sonner";

type TodoFormProps = {
  refetch: () => void;
};

export default function TodoForm({ refetch }: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [dueDate, setDueDate] = useState("");

  const submit = async () => {
    if (!title.trim()) return;

    await createTodo({
      title,
      description,
      priority,
      dueDate,
    });
    toast.success("todo created succefully")
    setTitle("");
    setDescription("");
    setPriority("low");
    setDueDate("");

    refetch();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">

      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Add New Task
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        {/* Title */}
        <input
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Priority */}
        <select
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        {/* Description */}
        <textarea
          className="border border-gray-300 rounded-lg p-3 md:col-span-2 focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Due Date */}
        <input
          type="date"
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

      </div>

      {/* Button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={submit}
          disabled={!title}
          className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:shadow-2xl transition disabled:opacity-50"
        >
          Add Task
        </button>
      </div>

    </div>
  );
}