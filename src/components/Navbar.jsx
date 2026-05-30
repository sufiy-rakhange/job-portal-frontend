import { useState } from "react";
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-4">

        {/* Top Navbar */}
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-blue-600"
          >
            JobPortal
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">

            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition duration-200"
            >
              Home
            </Link>

            {isAuthenticated() ? (
              <>
                <Link
                  to="/add-job"
                  className="text-gray-700 hover:text-blue-600 transition duration-200"
                >
                  Add Job
                </Link>

                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-blue-600 transition duration-200"
                >
                  Dashboard
                </Link>

                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 transition duration-200"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700 focus:outline-none"
          >
            {menuOpen ? (
              <span className="text-3xl">&times;</span>
            ) : (
              <span className="text-3xl">&#9776;</span>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-4 border-t border-gray-200 pt-4">

            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition duration-200"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>

            {isAuthenticated() ? (
              <>
                <Link
                  to="/add-job"
                  className="text-gray-700 hover:text-blue-600 transition duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  Add Job
                </Link>

                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-blue-600 transition duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>

                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200 w-full"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 transition duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200 text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar