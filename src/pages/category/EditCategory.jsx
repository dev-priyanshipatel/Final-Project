import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCategory } from "../../features/category/categorySlice";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const EditCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = useSelector((store) => store.category.list);

  const existingCategory = categories.find((item) => item.id === id);

  const [input, setInput] = useState({ name: "" ,date: "",});

  useEffect(() => {
    if (existingCategory) {
      setInput({ name: existingCategory.name, date: existingCategory.date});
    }
  }, [existingCategory]);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

     dispatch(
      updateCategory({ id, name: input.name, date: input.date }),
    );

    toast.success("Category updated successfully....");

    navigate("/category");
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">edit category</h2>
          <p className="text-gray-500 text-sm">update category details</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
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
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

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
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2.5 rounded-lg font-semibold hover:bg-teal-700 transition"
          >
            update category
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
