import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../../../../axios/axios.config.js";
import toast from "react-hot-toast";
import Loading from "../../../../components/Loading.jsx";

function AddItem() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
  });
  const [image, setImage] = useState(null);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await Axios.get("/api/category/categories");
      if (res?.data?.success) setCategories(res.data.categories || []);
      else toast.error("Failed to fetch categories list.");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error fetching categories.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // File input handler
  const handleFileChange = (e) => {
    setImage(e.target.files?.[0] || null);
  };

  // Add new item
  const handleAdd = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      if (image) formData.append("image", image);

      const res = await Axios.post("/api/item", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        toast.success("Item added successfully!");
        navigate("/dashboard/items");
      } else toast.error(res.data.message || "Add failed.");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-auto py-8 bg-gray-50 flex justify-center px-4 sm:px-6 lg:px-8 relative">
      
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 rounded-2xl">
          <Loading />
        </div>
      )}

      <div className="w-full max-w-xl bg-gray-800 rounded-2xl shadow-2xl border border-gray-400 p-6 sm:p-8 relative">
        
        {/* Header */}
        <h1 className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-6">
          <span className="font-extrabold text-gray-100 text-[clamp(1.5rem,5vw,2.5rem)] sm:text-[clamp(1.75rem,4vw,2.25rem)]">
            Add New Item
          </span>
          <span className="w-20 sm:w-28 h-1.5 mt-2 sm:mt-4 bg-gray-400 rounded-full"></span>
        </h1>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleAdd}>

          {/* Name */}
          <div className="flex flex-col">
            <label className="text-gray-100 font-semibold mb-1 text-[clamp(0.875rem,2vw,1rem)] sm:text-[clamp(1rem,1.5vw,1.125rem)]">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              className="bg-gray-100 border border-gray-300 rounded-lg p-2 text-gray-900 text-[clamp(0.875rem,2vw,1rem)] sm:text-[clamp(1rem,1.5vw,1.125rem)] focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
              required
            />
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <label className="text-gray-100 font-semibold mb-1 text-[clamp(0.875rem,2vw,1rem)] sm:text-[clamp(1rem,1.5vw,1.125rem)]">
              Price: (<span className="text-red-500">Birr</span>)
            </label>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={handleChange}
              className="bg-gray-100 border border-gray-300 rounded-lg p-2 text-gray-900 text-[clamp(0.875rem,2vw,1rem)] sm:text-[clamp(1rem,1.5vw,1.125rem)] focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
              required
              min="0"
            />
          </div>

          {/* Stock */}
          <div className="flex flex-col">
            <label className="text-gray-100 font-semibold mb-1 text-[clamp(0.875rem,2vw,1rem)] sm:text-[clamp(1rem,1.5vw,1.125rem)]">
              Stock:
            </label>
            <input
              type="number"
              name="stock"
              value={data.stock}
              onChange={handleChange}
              className="bg-gray-100 border border-gray-300 rounded-lg p-2 text-gray-900 text-[clamp(0.875rem,2vw,1rem)] sm:text-[clamp(1rem,1.5vw,1.125rem)] focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
              required
              min="0"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label className="text-gray-100 font-semibold mb-1 text-[clamp(0.875rem,2vw,1rem)] sm:text-[clamp(1rem,1.5vw,1.125rem)]">
              Category:
            </label>
            <select
              name="category"
              value={data.category}
              onChange={handleChange}
              className="bg-gray-100 border border-gray-300 rounded-lg p-2 text-gray-900 text-[clamp(0.875rem,2vw,1rem)] sm:text-[clamp(1rem,1.5vw,1.125rem)] focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
              required
            >
              <option value="" disabled>Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="text-gray-100 font-semibold mb-1 text-[clamp(0.875rem,2vw,1rem)] sm:text-[clamp(1rem,1.5vw,1.125rem)]">
              Description:
            </label>
            <textarea
              name="description"
              rows={4}
              value={data.description}
              onChange={handleChange}
              className="bg-gray-100 border border-gray-300 rounded-lg p-2 text-gray-900 text-[clamp(0.875rem,2vw,1rem)] sm:text-[clamp(1rem,1.5vw,1.125rem)] focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none resize-none transition"
            />
          </div>

          {/* Image Upload */}
          <div className="flex flex-col">
            <label className="text-gray-100 font-semibold mb-1 text-[clamp(0.875rem,2vw,1rem)] sm:text-[clamp(1rem,1.5vw,1.125rem)]">
              Image: (Optional)
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="bg-gray-100 border border-gray-300 rounded-lg p-2 text-gray-900 text-[clamp(0.875rem,2vw,1rem)] sm:text-[clamp(1rem,1.5vw,1.125rem)] focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
              disabled={loading}
            />
          </div>

          {/* Submit Button */}
          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition disabled:bg-blue-400 text-[clamp(0.875rem,2vw,1rem)] sm:text-[clamp(1rem,1.5vw,1.125rem)] flex items-center justify-center"
              disabled={loading}
            >
              {loading ? <Loading /> : "Add Item"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default AddItem;
