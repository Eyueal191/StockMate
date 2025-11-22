import React from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading.jsx";

function ItemCard({ product="Loading" }) {
  const navigate = useNavigate();
  const { _id, name, description, price, stock, image, category } = product;

  const stockClass = stock > 0 ? "text-green-400" : "text-red-400";
if(product==="Loading") return <Loading/>
  return (
    <div
      className="
        bg-gray-800 shadow-lg rounded-2xl overflow-hidden
        flex flex-col
        w-full max-w-[440px] aspect-square
        p-4
        transition-shadow duration-300
        hover:shadow-2xl
        mx-auto
        h-[520px] sm:h-[500px]
        "
    >
      {/* Product Image */}
      {image ? (
        <img
          src={image || "/placeholder.png"}
          alt={name}
          className="w-full object-cover rounded-t-2xl flex-shrink-0"
          style={{ aspectRatio: "4/3" }}
        />
      ) : (
        <Loading />
      )}

      {/* Product Details */}
      <div className="flex flex-col flex-1 mt-3">
        {/* Top Section */}
        <div className="flex flex-col gap-1 sm:gap-2">
          <span className="text-sm text-gray-400 tracking-wide">
            {category?.name || "Uncategorized"}
          </span>

          <h2 className="text-lg sm:text-xl font-semibold text-white line-clamp-1">
            {name}
          </h2>

          <p
            className="text-gray-300 overflow-hidden mb-4 sm:mb-6"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3, // clamp to 3 lines for fixed layout
              lineHeight: "1.4rem",
              fontSize: "clamp(0.875rem, 1vw, 1rem)",
            }}
          >
            {description || "No description available"}
          </p>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-3 mt-auto">
          {/* Price & Stock */}
          <div className="flex justify-between items-center">
            <span className={`text-sm font-medium ${stockClass}`}>
              {stock > 0 ? `${stock} in stock` : "Out of stock"}
            </span>

            <span className="text-base sm:text-lg font-semibold text-white">
              {price ? (
                <>
                  {price} <span className="text-red-400">Birr</span>
                </>
              ) : (
                "N/A"
              )}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate(`/dashboard/items/view/${_id}`)}
              className="py-2.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 shadow-sm"
            >
              View Product
            </button>

            <button
              onClick={() => navigate(`/dashboard/items/edit/${_id}`)}
              className="py-2.5 rounded-xl font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors duration-300 shadow-sm"
            >
              Update Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
