import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../features/category/categorySlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddCategory = () => {
    const dispatch = useDispatch() ;
    const navigate = useNavigate();
    const user = useSelector(store => store.auth.user);

  const [input, setInput] = useState({
    name: "",
    date: "",
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.name.trim()) {
      toast.error("Category name is required");
      return;
    }

    if (input.name.length < 3) {
      toast.error("Category name must be at least 3 characters");
      return;
    }

    if (!input.date) {
      toast.error("Please select a date");
      return;
    }

    dispatch(addCategory({
        name : input.name,
        date : input.date,
        uid : user.uid
    }))
    toast.success("Category Added Successfully...");
    navigate('/category');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add category</h2>
          <p className="text-gray-500 text-sm">create a new expense category</p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Category Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              category name
            </label>
            <input
              id="name"
              type="text"
              value={input.name}
              onChange={handleChange}
              placeholder="enter category name"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
            />
          </div>

          {/* Date */}
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              date
            </label>
            <input
              id="date"
              type="date"
              value={input.date}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2.5 rounded-lg font-semibold hover:bg-teal-700 transition"
          >
            add category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
