import React from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-teal-50 to-white">
          <div className="max-w-6xl mx-auto px-4 py-20 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              manage your expenses
              <span className="text-teal-600"> smarter</span>
            </h1>

            <p className="mt-5 text-gray-500 text-lg max-w-2xl mx-auto">
              A simple and powerful way to track your spending, manage
              categories, and stay in control of your finances.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/signup"
                className="bg-teal-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-teal-700 transition shadow-md"
              >
                get started
              </Link>

              <Link
                to="/login"
                className="border border-teal-600 text-teal-600 px-8 py-3 rounded-lg font-medium hover:bg-teal-50 transition"
              >
                login
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4">
            <h2 className="text-3xl font-bold text-teal-600">10K+</h2>
            <p className="text-gray-500 text-sm">expenses tracked</p>
          </div>

          <div className="p-4">
            <h2 className="text-3xl font-bold text-teal-600">2K+</h2>
            <p className="text-gray-500 text-sm">active users</p>
          </div>

          <div className="p-4">
            <h2 className="text-3xl font-bold text-teal-600">100%</h2>
            <p className="text-gray-500 text-sm">secure data</p>
          </div>

          <div className="p-4">
            <h2 className="text-3xl font-bold text-teal-600">24/7</h2>
            <p className="text-gray-500 text-sm">access anywhere</p>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto px-4 pb-20 grid md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition">
            <div className="text-teal-600 text-3xl mb-3">💰</div>
            <h3 className="text-lg font-semibold text-gray-800">
              track expenses
            </h3>
            <p className="text-gray-500 mt-2 text-sm">
              Record your daily spending easily and stay aware of where your
              money goes.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition">
            <div className="text-teal-600 text-3xl mb-3">📂</div>
            <h3 className="text-lg font-semibold text-gray-800">
              manage categories
            </h3>
            <p className="text-gray-500 mt-2 text-sm">
              Organize expenses into categories for better financial insights.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition">
            <div className="text-teal-600 text-3xl mb-3">📊</div>
            <h3 className="text-lg font-semibold text-gray-800">
              analyze spending
            </h3>
            <p className="text-gray-500 mt-2 text-sm">
              Understand your financial habits and make smarter decisions.
            </p>
          </div>
        </div>

        {/* Call To Action */}
        <div className="bg-teal-600 text-white py-14">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold">
              start managing your money today
            </h2>

            <p className="mt-3 text-teal-100">
              Join thousands of users who track their expenses smarter.
            </p>

            <Link
              to="/signup"
              className="inline-block mt-6 bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              create free account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
