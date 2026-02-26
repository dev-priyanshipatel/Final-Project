import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { googleSignin, signup } from "../features/auth/authSlice";
import toast from "react-hot-toast";

const Signup = () => {
    const dispatch = useDispatch();

    const [input, setInput] = useState({
      name: "",
      email: "",
      password: "",
      confirmpassword:''
    });

    const handleChange = (e) => {
        setInput({...input, [e.target.id] : e.target.value});
    }

    const handleSignup = (e) => {
        e.preventDefault();
        
        dispatch(signup(input));
        toast.success("Signup successfull...")
    }

    const handleGoogleSignin = () => {
      dispatch(googleSignin());
      toast.success("Signup successfull...");
    }
    

return (
  <div className="min-h-screen bg-white flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
        <p className="text-gray-500 text-sm mt-2">Sign up to continue</p>
      </div>

      {/* Google Button */}
      <button onClick={handleGoogleSignin} className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2.5 font-medium text-gray-700 hover:bg-gray-50 transition">
        <svg viewBox="0 0 48 48" className="w-5 h-5">
          <path
            fill="#FFC107"
            d="M43.611 20.083H42V20H24v8h11.303C33.659 32.657 29.215 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C33.909 6.053 29.218 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
          />
        </svg>
        Sign up with Google
      </button>

      {/* Divider */}
      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 h-px bg-gray-200"></div>
        <span className="text-sm text-gray-400">OR</span>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>

      {/* Form */}
      <form className="space-y-5" onSubmit={handleSignup}>
        <input
          type="text"
          id="name"
          onChange={handleChange}
          value={input.name}
          placeholder="Full Name"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
        />

        <input
          type="email"
          id="email"
          onChange={handleChange}
          value={input.email}
          placeholder="Email Address"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
        />

        <input
          type="password"
          id="password"
          onChange={handleChange}
          value={input.password}
          placeholder="Password"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
        />

        <input
          type="password"
          id="confirmpassword"
          onChange={handleChange}
          value={input.confirmpassword}
          placeholder="Confirm Password"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
        />

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2.5 rounded-lg font-semibold hover:bg-teal-700 transition"
        >
          Sign Up
        </button>
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account?
        <Link to="/login" className="text-teal-600 font-medium ml-1">
          Login
        </Link>
      </p>
    </div>
  </div>
);

};

export default Signup;
