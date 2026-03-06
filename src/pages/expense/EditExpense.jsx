import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateExpense } from "../../features/expense/expenseSlice";
import toast from "react-hot-toast";

const EditExpense = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const expenses = useSelector((store) => store.expense.list);
  const categories = useSelector((store) => store.category.list);

  const existingExpense = expenses.find((item) => item.id === id);

  const [input, setInput] = useState({
    name: "",
    category: "",
    amount: "",
    date: "",
  });

  useEffect(() => {
    if (existingExpense) {
      setInput({
        name: existingExpense.name,
        category: existingExpense.category,
        amount: existingExpense.amount,
        date: existingExpense.date,
      });
    }
  }, [existingExpense]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch( updateExpense({ id: id, data: input}) );
    toast.success("Expense Updated Successfully...")
    navigate("/expenses");
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">edit expense</h2>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              id="name"
              value={input.name}
              onChange={handleChange}
              placeholder="expense name"
              className="w-full px-4 py-2.5 border rounded-lg"
            />

            <select
              id="category"
              value={input.category}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border rounded-lg"
            >
              <option value="">select category</option>

              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <input
              id="amount"
              type="number"
              value={input.amount}
              onChange={handleChange}
              placeholder="amount"
              className="w-full px-4 py-2.5 border rounded-lg"
            />

            <input
              id="date"
              type="date"
              value={input.date}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border rounded-lg"
            />

            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2.5 rounded-lg"
            >
              update expense
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditExpense;
