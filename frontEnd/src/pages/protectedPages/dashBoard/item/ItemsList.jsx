import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useVirtualizer } from "@tanstack/react-virtual";
import ItemCard from "../../../../components/cards/ItemCard.jsx";
import { useNavigate } from "react-router-dom";
import Loading from "../../../../components/Loading.jsx";
import { StockContext } from "../../../../stockContext/StockContext.jsx";
import { useContext } from "react";
function ItemsList() {
  const products = useSelector((state) => state.items.list) || [];
  const parentRef = useRef();
  const {refetchItemsList} = useContext(StockContext);
  const navigate = useNavigate();
  const [columns, setColumns] = useState(1);

  // Responsive columns
  useEffect(() => {
     refetchItemsList();
    const breakpoints = { md: 768, lg: 1024, xl: 1280, "2xl": 1536 };

    const updateColumns = () => {
      const w = window.innerWidth;
      if (w < breakpoints.md) setColumns(1);
      else if (w < breakpoints.lg) setColumns(2);
      else if (w < breakpoints.xl) setColumns(3);
      else setColumns(4);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const rowCount = Math.ceil(products.length / columns);

  // Estimate row height dynamically: cardHeight + gap
  const estimateRowHeight = () => {
    let cardHeight;
    if (columns === 1) cardHeight = 560; // mobile: taller
    else if (columns === 2) cardHeight = 520; // tablet
    else if (columns === 3) cardHeight = 500; // laptop
    else cardHeight = 480; // large screen
    return cardHeight + 20; // add 20px gap between rows
  };

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateRowHeight(),
    overscan: 3,
  });

  if (products.length === 0) return <Loading />;

  return (
    <div className="p-4">
      {/* Title + Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 py-4">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <span>Items List</span>
          <span className="block mt-4 w-20 sm:w-24 md:w-32 lg:w-36 xl:w-40 2xl:w-48 h-1 bg-blue-600 rounded-full"></span>
        </h1>

        <button
          onClick={() => navigate("/dashboard/items/add")}
          className="
            mt-4 sm:mt-0 bg-blue-600 text-white px-5 py-3
            rounded-lg font-bold text-lg transition-colors
            shadow-lg hover:shadow-xl animate-[sideBounce_2s_ease-in-out_infinite]
            hover:animate-none
          "
        >
          Add New Item
        </button>
      </div>

      {/* Virtualized List */}
      <div
        ref={parentRef}
        className="relative overflow-auto h-[90vh] w-full border border-gray-200 rounded-xl bg-gray-200"
      >
        <div className="px-5 pt-5 pb-5">
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {rowVirtualizer.getVirtualItems().map((row) => {
              const start = row.index * columns;
              const end = Math.min(start + columns, products.length);
              const rowProducts = products.slice(start, end);

              return (
                <div
                  key={row.key}
                  className="grid"
                  style={{
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                    gap: "20px",
                    position: "absolute",
                    top: 0,
                    transform: `translateY(${row.start}px)`,
                    width: "100%",
                  }}
                >
                  {rowProducts.map((product) => (
                    <ItemCard key={product._id} product={product} />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemsList;
