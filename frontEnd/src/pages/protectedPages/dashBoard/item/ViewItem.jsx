import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "../../../../axios/axios.config.js";
import toast from "react-hot-toast";

function ViewItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    if (id) getItemById();
  }, [id]);

  if (loading && !product) {
    return (
      <div className="p-6 text-center text-gray-200 bg-gray-800 rounded-2xl animate-pulse">
        Loading item details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6 text-center text-gray-200 bg-gray-800 rounded-2xl">
        Item not found.
      </div>
    );
  }

  return (
    <div className="w-full h-auto py-12 bg-gray-50">
      <div className="p-6 bg-gray-800 shadow-xl rounded-2xl max-w-3xl mx-auto my-12 text-gray-100 flex flex-col gap-6">

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          View Item Details
        </h1>

        {/* Product Image */}
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-h-96 object-cover rounded-2xl shadow-lg border-2 border-blue-500"
          />
        )}

        {/* Name */}
        <div className="flex flex-col">
          <span className="font-semibold text-gray-300 mb-1 text-sm sm:text-base">Name</span>
          <span className="text-white text-lg sm:text-2xl font-semibold">{product.name}</span>
        </div>

        {/* Stock */}
        <div className="flex flex-col">
          <span className="font-semibold text-gray-300 mb-1 text-sm sm:text-base">Stock</span>
          <span className={`text-lg sm:text-2xl font-medium ${product.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </span>
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <span className="font-semibold text-gray-300 mb-1 text-sm sm:text-base">Price</span>
          <span className="text-lg sm:text-2xl font-bold text-white">
            {product.price} <span className="text-red-400 font-semibold">Birr</span>
          </span>
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <span className="font-semibold text-gray-300 mb-1 text-sm sm:text-base">Description</span>
          <p
            className="text-gray-200 overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 4,
            }}
          >
            {product.description || "No description available"}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            onClick={() => navigate(-1)}
            className="
              flex-1
              bg-gray-700 hover:bg-gray-600
              text-white font-bold
              py-3 sm:py-4
              rounded-2xl
              shadow-lg hover:shadow-xl
              transition-all duration-300
              transform hover:scale-105
              text-base sm:text-lg
            "
          >
            Back
          </button>
          <button
            onClick={() => navigate(`/dashboard/items/edit/${id}`)}
            className="
              flex-1
              bg-blue-600 hover:bg-blue-700
              text-white font-bold
              py-3 sm:py-4
              rounded-2xl
              shadow-lg hover:shadow-xl
              transition-all duration-300
              transform hover:scale-105
              text-base sm:text-lg
            "
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewItem;
