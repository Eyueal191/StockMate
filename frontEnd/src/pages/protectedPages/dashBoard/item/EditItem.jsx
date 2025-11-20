import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "../../../../axios/axios.config.js";
import toast from "react-hot-toast";

// Custom Confirm Modal Component
const ConfirmModal = ({ open, message, onConfirm, onCancel }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-xl w-80 sm:w-96 text-gray-100 shadow-lg">
        <p className="mb-4 text-center">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold"
          >
            Confirm
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

function EditItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [data, setData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
  });

  const [image, setImage] = useState(null);

  // Fetch item by ID
  const getItemById = async () => {
    try {
      setLoading(true);
      const res = await Axios.get(`/api/item/${id}`);
      if (res.data.success) setProduct(res.data.item);
      else toast.error("Failed to fetch item details.");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to fetch item.");
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => { fetchCategories(); }, []);
  useEffect(() => { if (id) getItemById(); }, [id]);
  useEffect(() => {
    if (product) {
      setData({
        name: product.name || "",
        price: product.price || "",
        stock: product.stock || "",
        category: product.category?.name || "",
        description: product.description || "",
      });
    }
  }, [product]);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // File input handler
  const handleFileChange = (e) => {
    setImage(e.target.files?.[0] || null);
  };

  // Update item
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      if (image) formData.append("image", image);

      const res = await Axios.put(`/api/item/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        toast.success("Item updated successfully!");
        navigate("/dashboard/items");
      } else toast.error(res.data.message || "Update failed.");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Update error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Delete item
  const handleDelete = async () => {
    setShowDeleteModal(false);
    setLoading(true);
    try {
      const res = await Axios.delete(`/api/item/${id}`);
      if (res.data.success) {
        toast.success("Item deleted successfully!");
        navigate("/dashboard/items");
      } else toast.error(res.data.message || "Delete failed.");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Deletion error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !product) {
    return <div className="p-6 text-center text-gray-200 bg-gray-800 rounded-xl">Loading item details...</div>;
  }

  return (
    <div className="w-full h-auto py-12 my-0 bg-gray-50">
  <div className="p-6 bg-gray-800 shadow-2xl border border-gray-400 rounded-2xl max-w-xl mx-auto my-12">
    <h1 className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-6">
      <span className="text-[1.5rem] sm:text-[2rem] md:text-[2.25rem] lg:text-[2.5rem] font-extrabold text-gray-100">
        Edit Item Details
      </span>
      <span className="w-20 sm:w-30 h-1 mt-2 sm:mt-4 bg-gray-600 rounded-full"></span>
    </h1>

    <form className="flex flex-col gap-4" onSubmit={handleUpdate}>
      {/* Name */}
      <div className="flex flex-col">
        <label className="text-gray-100 font-semibold mb-1 text-sm sm:text-base md:text-lg">Name</label>
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange}
          className="bg-gray-100 border border-gray-300 rounded-lg p-2 text-gray-900 text-sm sm:text-base md:text-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
          required
        />
      </div>

      {/* Price */}
      <div className="flex flex-col">
        <label className="text-gray-100 font-semibold mb-1 text-sm sm:text-base md:text-lg">
          Price (<span className="text-red-500">Birr</span>)
        </label>
        <input
          type="number"
          name="price"
          value={data.price}
          onChange={handleChange}
          className="bg-gray-100 border border-gray-300 rounded-lg p-2 text-gray-900 text-sm sm:text-base md:text-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
          required
          min="0"
        />
      </div>

      {/* Stock */}
      <div className="flex flex-col">
        <label className="text-gray-100 font-semibold mb-1 text-sm sm:text-base md:text-lg">Stock</label>
        <input
          type="number"
          name="stock"
          value={data.stock}
          onChange={handleChange}
          className="bg-gray-100 border border-gray-300 rounded-lg p-2 text-gray-900 text-sm sm:text-base md:text-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
          required
          min="0"
        />
      </div>

      {/* Category */}
      <div className="flex flex-col">
        <label className="text-gray-100 font-semibold mb-1 text-sm sm:text-base md:text-lg">Category</label>
        <select
          name="category"
          value={data.category}
          onChange={handleChange}
          className="bg-gray-100 border border-gray-300 rounded-lg p-2 text-gray-900 text-sm sm:text-base md:text-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
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
        <label className="text-gray-100 font-semibold mb-1 text-sm sm:text-base md:text-lg">Description</label>
        <textarea
          name="description"
          rows={4}
          value={data.description}
          onChange={handleChange}
          className="bg-gray-100 border border-gray-300 rounded-lg p-2 text-gray-900 text-sm sm:text-base md:text-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none resize-none transition"
        />
      </div>

      {/* Current Image */}
      {product?.image && !image && (
        <div className="flex flex-col">
          <label className="text-gray-100 font-semibold mb-1 text-sm sm:text-base md:text-lg">Current Image</label>
          <p className="text-gray-300 italic text-xs sm:text-sm md:text-base">
            Image currently set. Select a file below to replace it.
          </p>
        </div>
      )}

      {/* Image Upload */}
      <div className="flex flex-col">
        <label className="text-gray-100 font-semibold mb-1 text-sm sm:text-base md:text-lg">New Image (Optional)</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className="bg-gray-100 border border-gray-300 rounded-lg p-2 text-gray-900 text-sm sm:text-base md:text-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
          disabled={loading}
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400 text-sm sm:text-base md:text-lg"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Item"}
        </button>
        <button
          type="button"
          onClick={() => setShowDeleteModal(true)}
          className="flex-1 bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-700 transition disabled:bg-red-400 text-sm sm:text-base md:text-lg"
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete Item"}
        </button>
      </div>
    </form>

    {/* Delete confirmation modal */}
    <ConfirmModal
      open={showDeleteModal}
      message="Are you sure you want to delete this item?"
      onConfirm={handleDelete}
      onCancel={() => setShowDeleteModal(false)}
    />
  </div>
</div>
  );
}

export default EditItem;
