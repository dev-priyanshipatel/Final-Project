import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryByUser } from "../../features/category/categorySlice";
import { addExpense } from "../../features/expense/expenseSlice";
import toast from "react-hot-toast";

const AddExpense = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(store => store.auth.user);
  const categories = useSelector(store => store.category.list)

  const [input, setInput] = useState({
    name: "",
    category: "",
    amount: "",
    date: "",
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.id]: e.target.value,
    });
  };

  

  useEffect(() => {
    dispatch(fetchCategoryByUser(user.uid))
  }, [user])

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.name.trim()) {
      toast.error("Expense name is required");
      return;
    }

    if (input.name.length < 3) {
      toast.error("Expense name must be at least 3 characters");
      return;
    }

    if (!input.category) {
      toast.error("Please select a category");
      return;
    }

    if (!input.amount) {
      toast.error("Amount is required");
      return;
    }

    if (Number(input.amount) <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }

    if (!input.date) {
      toast.error("Please select a date");
      return;
    }

    dispatch(addExpense({...input, uid : user.uid}))
    navigate("/expenses");
    toast.success("Expense added successfully...");
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Add Expense</h2>
            <p className="text-gray-500 text-sm">create a new expense record</p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Expense Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                expense name
              </label>
              <input
                id="name"
                type="text"
                value={input.name}
                onChange={handleChange}
                placeholder="enter expense name"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
              />
            </div>

            {/* Category Dropdown */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                category
              </label>
              <select
                id="category"
                value={input.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none bg-white"
              >
                <option value="">select category</option>
                {
                  categories && categories.map((category) => {
                    return <option key={category.id} value={category.id}>{category.name}</option>
                  })
                }
              </select>
            </div>

            {/* Amount */}
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                amount
              </label>
              <input
                id="amount"
                type="number"
                value={input.amount}
                onChange={handleChange}
                placeholder="enter amount"
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
              add expense
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddExpense;
