import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, fetchCategoryByUser } from "../../features/category/categorySlice";
import toast from "react-hot-toast";

const Category = () => {
  const user = useSelector(store => store.auth.user);
  const categories = useSelector(store => store.category.list)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoryByUser(user.uid))
  },[user])

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Expenses related to this category will also be deleted. Are you sure?",
    );

    if (!confirmDelete) return;

    dispatch(deleteCategory(id));

    toast.success("Category and related expenses deleted");
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
                category management
              </h2>
              <p className="text-gray-500 text-sm">
                manage your expense categories
              </p>
            </div>

            <Link
              to={"/add-category"}
              className="bg-teal-600 text-white px-4 md:px-5 py-2.5 rounded-lg font-medium hover:bg-teal-700 transition shadow-sm w-full sm:w-auto"
            >
              + add category
            </Link>
          </div>

          {/* Responsive Table Wrapper */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            {/* horizontal scroll only on small screens */}
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead className="bg-gray-50 border-b">
                  <tr className="text-gray-600 text-sm">
                    <th className="px-4 md:px-6 py-3 whitespace-nowrap">
                      SR NO.
                    </th>
                    <th className="px-4 md:px-6 py-3 whitespace-nowrap">
                      category name
                    </th>
                    <th className="px-4 md:px-6 py-3 whitespace-nowrap">
                      created date
                    </th>
                    <th className="px-4 md:px-6 py-3 text-right whitespace-nowrap">
                      actions
                    </th>
                  </tr>
                </thead>

                <tbody className="text-gray-700 text-sm">
                  {categories.length > 0 ? categories.map((category, idx) => {
                    return (
                      <tr className="border-b hover:bg-gray-50" key={category.id}>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                          {idx+1}
                        </td>
                        <td className="px-4 md:px-6 py-4 font-medium whitespace-nowrap">
                          {category.name}
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                          {category.date}
                        </td>
                        <td className="px-4 md:px-6 py-4 text-right space-x-2 whitespace-nowrap">
                          <Link to={`/edit-category/${category.id}`} className="px-3 py-1 text-xs md:text-sm bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200">
                            edit
                          </Link>
                          <button onClick={() => {handleDelete(category.id)}} className="px-3 py-1 text-xs md:text-sm bg-red-100 text-red-600 rounded-md hover:bg-red-200">
                            delete
                          </button>
                        </td>
                      </tr>
                    );
                  }) :
                  <tr>
                    <td colSpan={4} className="py-4 text-center">
                      No data found... Please add category..
                    </td>
                  </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
