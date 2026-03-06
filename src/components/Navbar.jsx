import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setUser } from "../features/auth/authSlice";
import { auth } from "../firebase/firebase.config";

const Navbar = ({ isLoggedIn = false, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth.user);

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (!confirmLogout) return;

    try {
      await signOut(auth);

      dispatch(setUser(null));

      toast.success("Logged out successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <nav className="bg-teal-50/60 backdrop-blur-md border-b border-teal-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* logo */}
          <Link to="/" className="flex items-center gap-3 group">
            {/* Icon */}
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold text-lg shadow-md group-hover:scale-105 transition">
              ₹
            </div>

            {/* Brand Name */}
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-bold tracking-wide text-gray-800 group-hover:text-teal-600 transition">
                Spend
                <span className="text-teal-600 ml-1">Wise</span>
              </span>
              <span className="text-xs text-gray-400 tracking-wider">
                smart expense tracker
              </span>
            </div>
          </Link>

          {/* desktop links */}
          <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
            <Link to="/" className="hover:text-teal-600 transition">
              Home
            </Link>

            <Link to="/dashboard" className="hover:text-teal-600 transition">
              Dashboard
            </Link>

            <Link to="/expenses" className="hover:text-teal-600 transition">
              Expenses
            </Link>

            <Link to="/category" className="hover:text-teal-600 transition">
              Category
            </Link>

            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
              >
                login
              </Link>
            )}
          </div>

          {/* mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700"
          >
            ☰
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-white border-t">
          <Link to="/" className="block text-gray-700 hover:text-teal-600">
            home
          </Link>

          <Link
            to="/expenses"
            className="block text-gray-700 hover:text-teal-600"
          >
            expenses
          </Link>

          <Link
            to="/category"
            className="block text-gray-700 hover:text-teal-600"
          >
            category
          </Link>

          {user ? (
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              logout
            </button>
          ) : (
            <Link
              to="/login"
              className="block w-full text-center bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
            >
              login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
