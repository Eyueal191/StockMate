// src/pages/protectedPages/dashBoard/sale/SaleCard.jsx
import React, { useContext, useState } from "react";
import { StockContext } from "../../stockContext/StockContext.jsx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Axios from "../../axios/axios.config.js"; // make sure path is correct
import ImageIcon from "lucide-react/dist/esm/icons/image.js"; // imported icon

function SaleCard({ sale }) {
  const navigate = useNavigate();
  const { refetchSaleList } = useContext(StockContext);
  const [loading, setLoading] = useState(false); // added loading state

  // Delete sale handler
  const deleteHandler = async () => {
    if (loading) return; // prevent multiple clicks
    setLoading(true); // set loading state

    try {
      const res = await Axios.delete(`/api/sale/${sale._id}`);
      if (res.data.success) {
        toast.success("Sale deleted successfully!");
        await refetchSaleList(); // refresh sale list
        setTimeout(() => navigate("/dashboard/sales"), 2000); // navigate after 2s
      } else {
        toast.error(res.data.message || "Delete failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Deletion error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        bg-white shadow-lg rounded-2xl overflow-hidden
        flex flex-col
        w-full max-w-[440px] aspect-square
        p-4
        transition-shadow duration-300
        hover:shadow-2xl
        mx-auto
        h-[500px]
      "
    >
      {/* Sale Item Image */}
      {sale.item.image ? (
        <img
          src={sale.item.image}
          alt={sale.item.name}
          className="w-full h-[200px] object-cover rounded-t-2xl flex-shrink-0"
        />
      ) : (
        <div className="w-full h-[200px] bg-gray-200 rounded-t-2xl flex items-center justify-center text-gray-500">
          <ImageIcon className="w-full h-full p-8 text-gray-400" />
        </div>
      )}

      {/* Sale Details */}
      <div className="flex flex-col flex-1 mt-3 justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 line-clamp-1">
            {sale.item.name}
          </h2>
          {sale.item.description && (
            <p className="text-gray-600 text-sm sm:text-base md:text-lg line-clamp-2">
              {sale.item.description}
            </p>
          )}
          <p className="text-blue-600 font-medium text-sm sm:text-base md:text-lg">
            Seller: {sale.seller}
          </p>
          <p className="text-gray-500 text-xs sm:text-sm md:text-base">
            Date: {new Date(sale.date).toLocaleDateString()}
          </p>
          <p className="text-green-600 font-medium text-sm sm:text-base md:text-lg">
            Quantity: {sale.quantity}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-4 gap-3">
          <button
            className="flex-1 py-2 px-4 rounded-xl font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors duration-300 shadow-sm text-sm sm:text-base md:text-lg"
            onClick={() => navigate(`/dashboard/sales/edit/${sale._id}`)}
          >
            Update
          </button>
          <button
            className="flex-1 py-2 px-4 rounded-xl font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors duration-300 shadow-sm text-sm sm:text-base md:text-lg"
            onClick={deleteHandler}
            disabled={loading} // prevent double click while loading
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
export default SaleCard;
