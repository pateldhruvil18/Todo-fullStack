import { Link } from "@tanstack/react-router";

export default function Navbar() {

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold text-black hover:shadow-2xl transition"
        >
          TodoApp
        </Link>

        {/* User Name (center) */}
        {token && user?.name && (
          <div className="hidden md:block text-gray-600 font-medium">
            Welcome, <span className="text-black">{user.name}</span>
          </div>
        )}

        {/* Buttons */}
        <div className="flex items-center gap-3">

          {!token && (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg border  text-white bg-black hover:shadow-2xl transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 rounded-lg border  text-white bg-black hover:shadow-2xl transition"
              >
                Sign Up
              </Link>
            </>
          )}

          {token && (
            <>
              <Link
                to="/dashboard"
                className="px-4 py-2 rounded-lg bg-black text-white hover:shadow-2xl transition"
              >
                Dashboard
              </Link>

              <button
                onClick={logout}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}

        </div>

      </div>

    </nav>
  );
}