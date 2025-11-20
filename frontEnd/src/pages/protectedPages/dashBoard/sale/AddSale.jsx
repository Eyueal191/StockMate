import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../../../../axios/axios.config.js";
import toast from "react-hot-toast";

function AddSale() {
  const navigate = useNavigate();

  // Keep key as "name" to match backend
  const [data, setData] = useState({
    name: "",
    quantity: "",
    seller: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      // Sending data directly to backend
      const res = await Axios.post("/api/sale", data);

      if (res.data.success) {
        toast.success("Sale added successfully!");
        navigate("/dashboard/sales");
      } else {
        toast.error(res.data.message || "Add failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error occurred.");
    }
  };

  return (
    <div className="w-full h-full bg-gray-50">
      <div className="w-full py-12 bg-gray-50 flex justify-center px-4 sm:px-6 lg:px-8">
        <div className="border xl:mr-[37vw] w-full max-w-xl mx-auto bg-gray-800 rounded-2xl shadow-2xl border-gray-400 p-6 sm:p-8">

          {/* Header */}
          <h1 className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-6">
            <span className="font-extrabold text-gray-100 text-[clamp(1.5rem,5vw,2.5rem)] sm:text-[clamp(1.75rem,4vw,2.25rem)]">
              Record a New Sale
            </span>
            <span className="w-20 sm:w-28 h-1.5 mt-2 sm:mt-4 bg-gray-400 rounded-full"></span>
          </h1>

          {/* Form */}
          <form className="flex flex-col gap-4" onSubmit={handleAdd}>

            {/* Item Name */}
            <div className="flex flex-col">
              <label className="text-gray-100 font-semibold mb-1 text-[clamp(0.875rem,2vw,1rem)] sm:text-[clamp(1rem,1.5vw,1.125rem)]">
                Item Name:
              </label>
              <input
                type="text"
                name="name"
                placeholder="Insert name of the product"
                value={data.name}
                onChange={handleChange}
                className="bg-gray-100 border border-gray-300 rounded-lg p-2 text-gray-900 text-[clamp(0.875rem,2vw,1rem)] sm:text-[clamp(1rem,1.5vw,1.125rem)] focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
                required
              />
            </div>

            {/* Quantity */}
            <div className="flex flex-col">
              <label className="text-gray-100 font-semibold mb-1 text-[clamp(0.875rem,2vw,1rem)] sm:text-[clamp(1rem,1.5vw,1.125rem)]">
                Quantity:
              </label>
              <input
                type="number"
                name="quantity"
                value={data.quantity}
                placeholder="Insert soldItem's quantity"
                onChange={handleChange}
                className="bg-gray-100 border border-gray-300 rounded-lg p-2 text-gray-900 text-[clamp(0.875rem,2vw,1rem)] sm:text-[clamp(1rem,1.5vw,1.125rem)] focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
                required
                min="0"
              />
            </div>

            {/* Seller */}
            <div className="flex flex-col">
              <label className="text-gray-100 font-semibold mb-1 text-[clamp(0.875rem,2vw,1rem)] sm:text-[clamp(1rem,1.5vw,1.125rem)]">
                Seller:
              </label>
              <input
                type="text"
                name="seller"
                value={data.seller}
                placeholder="Insert seller's name"
                onChange={handleChange}
                className="bg-gray-100 border border-gray-300 rounded-lg p-2 text-gray-900 text-[clamp(0.875rem,2vw,1rem)] sm:text-[clamp(1rem,1.5vw,1.125rem)] focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
              />
            </div>

            {/* Submit Button */}
            <div className="mt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition text-[clamp(0.875rem,2vw,1rem)] sm:text-[clamp(1rem,1.5vw,1.125rem)]"
              >
                Add Sale
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
export default AddSale;
