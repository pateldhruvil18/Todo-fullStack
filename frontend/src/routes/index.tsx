import { Link } from "@tanstack/react-router";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col   items-center justify-center px-6">

      {/* Hero Section */}
      <div className="text-center max-w-3xl">

        <h1 className="text-5xl md:text-6xl font-bold text-gray-600 mb-6">
          Organize Your Tasks
          <span className="text-black"> Effortlessly</span>
        </h1>

        <p className="text-gray-600 text-lg mb-8">
          A simple and powerful todo app to manage your daily tasks,
          stay productive, and keep everything organized.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">

          <Link
            to="/register"
            className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:shadow-2xl transition"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="border  text-white px-6 py-3 bg-black rounded-lg hover:shadow-2xl font-medium transition"
          >
            Login
          </Link>

        </div>

      </div>

      {/* Feature Section */}
      <div className="grid md:grid-cols-3 gap-6 mt-20 max-w-5xl w-full">

        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-semibold mb-2">
            Create Tasks
          </h3>
          <p className="text-gray-600 text-sm">
            Quickly add and organize your daily tasks to stay productive.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-semibold mb-2">
            Track Progress
          </h3>
          <p className="text-gray-600 text-sm">
            Mark tasks as completed and keep track of your progress easily.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-semibold mb-2">
            Stay Organized
          </h3>
          <p className="text-gray-600 text-sm">
            Manage priorities, due dates, and focus on what matters most.
          </p>
        </div>

      </div>

    </div>
  );
}