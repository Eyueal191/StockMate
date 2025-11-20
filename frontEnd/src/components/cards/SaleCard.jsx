// src/pages/protectedPages/dashBoard/sale/SaleCard.jsx
import React from "react";

function SaleCard({ sale }) {
  return (
    <div
      className="
        bg-white shadow-lg rounded-2xl overflow-hidden
        flex flex-col
        w-[100%] max-w-[450px] aspect-square
        p-4
        transition-shadow duration-300
        hover:shadow-2xl
        mx-auto
        h-[330px]
      "
    >
      {/* Sale Item Image */}
      {sale.item.image ? (
        <img
          src={sale.item.image}
          alt={sale.item.name}
          className="w-full h-[40%] object-cover rounded-t-2xl flex-shrink-0"
        />
      ) : (
        <div className="w-full h-[40%] bg-gray-200 rounded-t-2xl flex items-center justify-center">
          No Image
        </div>
      )}

      {/* Sale Details */}
      <div className="flex flex-col flex-1 mt-2 justify-between">
        <div className="flex flex-col gap-1">
          {/* Item Name */}
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 line-clamp-1">
            {sale.item.name}
          </h2>

          {/* Seller */}
          <p className="text-blue-600 font-semibold text-sm sm:text-base md:text-lg flex">
            Seller: {sale.seller}
          </p>

          {/* Date */}
          <p className="text-gray-500 text-xs sm:text-sm md:text-base">
            Date: {new Date(sale.date).toLocaleDateString()}
            
          </p>
            {/* Quantity on left */}
          <p className="text-green-600 font-medium text-sm sm:text-base md:text-lg">
            Quantity: {sale.quantity}
          </p>
        </div>

        {/* Update + Delete */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-3 gap-2">
          <button className="py-2 px-4 rounded-xl font-semibold text-white bg-green-600 hover:bg-red-700 transition-colors duration-300 shadow-sm text-sm sm:text-base md:text-lg">
            Delete
          </button>

          {/* Delete button */}
          <button className="py-2 px-4 rounded-xl font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors duration-300 shadow-sm text-sm sm:text-base md:text-lg">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
export default SaleCard;
