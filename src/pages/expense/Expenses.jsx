import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpense, fetchExpensesByUser } from "../../features/expense/expenseSlice";
import { fetchCategoryByUser } from "../../features/category/categorySlice";
import toast from "react-hot-toast";

const Expenses = () => {

  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth.user);
  const categories = useSelector((store) => store.category.list);
  const expenses = useSelector((store) => store.expense.list);

  useEffect(() => {
    dispatch(fetchExpensesByUser(user.uid));
    dispatch(fetchCategoryByUser(user.uid));
  },[user])

  const getCategoryByID = (cid) => {
    const category = categories.find((cat) => {
      return cid == cat.id;
    })
    return category?.name;
  }

  const handleDelete = (id) => {
    dispatch(deleteExpense(id));
    toast.success("Expense deleted successfulyy...");
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white px-4 py-6 md:py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                expense management
              </h2>
              <p className="text-gray-500 text-sm">manage your expenses</p>
            </div>

            <Link
              to="/add-expense"
              className="bg-teal-600 text-white px-4 md:px-5 py-2.5 rounded-lg font-medium hover:bg-teal-700 transition shadow-sm w-full sm:w-auto"
            >
              + add expense
            </Link>
          </div>

          {/* Table */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead className="bg-gray-50 border-b">
                  <tr className="text-gray-600 text-sm">
                    <th className="px-4 md:px-6 py-3 whitespace-nowrap">
                      sr no.
                    </th>
                    <th className="px-4 md:px-6 py-3 whitespace-nowrap">
                      title
                    </th>
                    <th className="px-4 md:px-6 py-3 whitespace-nowrap">
                      category
                    </th>
                    <th className="px-4 md:px-6 py-3 whitespace-nowrap">
                      amount
                    </th>
                    <th className="px-4 md:px-6 py-3 whitespace-nowrap">
                      date
                    </th>
                    <th className="px-4 md:px-6 py-3 text-right whitespace-nowrap">
                      actions
                    </th>
                  </tr>
                </thead>

                <tbody className="text-gray-700 text-sm">
                  {expenses.length > 0 ? (
                    expenses.map((exp, idx) => {
                      return (
                        <tr className="border-b hover:bg-gray-50" key={exp.id}>
                          <td className="px-4 md:px-6 py-4">{idx + 1}</td>
                          <td className="px-4 md:px-6 py-4 font-medium">
                            {exp.name}
                          </td>
                          <td className="px-4 md:px-6 py-4">
                            {getCategoryByID(exp.category)}
                          </td>
                          <td className="px-4 md:px-6 py-4 text-red-600">
                            <strong>${exp.amount}</strong>
                          </td>
                          <td className="px-4 md:px-6 py-4">{exp.date}</td>
                          <td className="px-4 md:px-6 py-4 text-right space-x-2">
                            <Link to={`/edit-expense/${exp.id}`} className="px-3 py-1 text-xs md:text-sm bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200">
                              edit
                            </Link>
                            <button
                              onClick={() => handleDelete(exp.id)}
                              className="px-3 py-1 text-xs md:text-sm bg-red-100 text-red-600 rounded-md hover:bg-red-200"
                            >
                              delete
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-4 text-center">
                        No data found... Please add expense..
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Expenses;
