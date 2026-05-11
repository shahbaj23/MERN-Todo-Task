import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { logout } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("user");
  const navigate = useNavigate()

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  console.log(username);
  return (
    <nav className="bg-white shadow-md px-6 py-4 sticky z-50 top-0">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <h1 className="text-xl font-bold text-gray-800 tracking-wide">
          📝 Todo App
        </h1>

        <div>
          {token ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-medium">{username}</span>

              <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full">
                {username?.[0]?.toUpperCase()}
              </div>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white cursor-pointer px-3 py-1 rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
