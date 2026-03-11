import { useTodos } from "../hooks/useTodos";
import TodoForm from "../components/TodoForm";
import TodoCard from "../components/TodoCard";
import Loader from "../components/Loader";
import type { Todo } from "../types/todo.types";

export default function Dashboard() {

  const { data, isLoading, refetch } = useTodos();

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">

      <div className="max-w-3xl mx-auto">

        {/* Page Title */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            My Tasks
          </h1>
          <p className="text-gray-500 mt-1">
            Organize and manage your todos efficiently
          </p>
        </div>

        {/* Todo Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <TodoForm refetch={refetch} />
        </div>

        {/* Todo List */}
        <div className="space-y-4">

          {data?.length === 0 && (
            <div className="text-center text-gray-500 py-10 bg-white rounded-xl shadow-sm">
              No tasks yet. Add your first todo 🚀
            </div>
          )}

          {data?.map((todo: Todo) => (
            <TodoCard
              key={todo._id}
              todo={todo}
              refetch={refetch}
            />
          ))}

        </div>

      </div>

    </div>
  );
}