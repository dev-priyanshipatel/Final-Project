import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpensesByUser } from "../../features/expense/expenseSlice";
import { fetchCategoryByUser } from "../../features/category/categorySlice";
import { Link } from "react-router-dom";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.auth.user);
  const expenses = useSelector((store) => store.expense.list);
  const categories = useSelector((store) => store.category.list);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (user) {
      dispatch(fetchExpensesByUser(user.uid));
      dispatch(fetchCategoryByUser(user.uid));
    }
  }, [user]);



  const totalExpense = expenses.reduce((sum, item) => {
    return sum + Number(item.amount);
  }, 0);


  const filteredExpenses = expenses.filter((exp) => {
    if (!startDate || !endDate) return true;

    return exp.date >= startDate && exp.date <= endDate;
  });


  const topExpenses = [...filteredExpenses]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);



  const chartData = categories.map((cat) => {
    const total = filteredExpenses
      .filter((exp) => exp.category === cat.id)
      .reduce((sum, exp) => sum + Number(exp.amount), 0);

    return {
      name: cat.name,
      value: total,
    };
  });

  const COLORS = ["#14b8a6", "#0ea5e9", "#f97316", "#ef4444", "#6366f1"];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}

          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

              <p className="text-gray-500">overview of your finances</p>
            </div>

            <Link
              to="/add-expense"
              className="bg-teal-600 text-white px-5 py-2 rounded-lg hover:bg-teal-700"
            >
              + Add Expense
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border rounded-xl p-6 shadow-sm">
              <p className="text-gray-500 text-sm">Total Expense</p>

              <h2 className="text-2xl font-bold text-red-500 mt-2">
                ₹ {totalExpense}
              </h2>
            </div>

            <div className="bg-white border rounded-xl p-6 shadow-sm">
              <p className="text-gray-500 text-sm">Total Transactions</p>

              <h2 className="text-2xl font-bold mt-2">
                {filteredExpenses.length}
              </h2>
            </div>

            <div className="bg-white border rounded-xl p-6 shadow-sm">
              <p className="text-gray-500 text-sm">Categories</p>

              <h2 className="text-2xl font-bold mt-2">{categories.length}</h2>
            </div>
          </div>

          <div className="bg-white p-6 border rounded-xl shadow-sm mb-8 flex gap-4">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border px-3 py-2 rounded-lg"
            />

            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border px-3 py-2 rounded-lg"
            />
          </div>

          <div className="bg-white border rounded-xl p-6 shadow-sm mb-8">
            <h3 className="text-lg font-semibold mb-4">Expense Distribution</h3>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h3 className="font-semibold text-gray-700">Top Expenses</h3>
            </div>

            <table className="min-w-full text-left">
              <thead className="bg-gray-50">
                <tr className="text-sm text-gray-600">
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Date</th>
                </tr>
              </thead>

              <tbody>
                {topExpenses.length > 0 ? (
                  topExpenses.map((exp) => (
                    <tr key={exp.id} className="border-t">
                      <td className="px-6 py-3">{exp.name}</td>

                      <td className="px-6 py-3 text-red-500">₹ {exp.amount}</td>

                      <td className="px-6 py-3">{exp.date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-4">
                      No expenses found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
