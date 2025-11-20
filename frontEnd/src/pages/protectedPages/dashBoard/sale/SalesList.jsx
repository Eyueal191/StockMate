// src/pages/protectedPages/dashBoard/sale/SalesList.jsx
import React, { useEffect, useRef, useState, lazy, useContext } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { StockContext } from "../../../../stockContext/StockContext.jsx";
const SaleCard = lazy(() => import("../../../../components/cards/SaleCard.jsx"));

function SalesList() {
  const { saleList } = useContext(StockContext); // use context sales
  const parentRef = useRef();
  const [columns, setColumns] = useState(1);

  // Responsive columns
  useEffect(() => {
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

  const rowCount = Math.ceil(saleList.length / columns);
  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 520,
    overscan: 3,
  });

  return (
    <div className="p-4 flex flex-col gap-4">
      {/* Virtualized list */}
      <div
        ref={parentRef}
        className="relative overflow-y-scroll h-[75vh] w-full border border-gray-200 rounded-2xl p-4 bg-gray-500"
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((row) => {
            const start = row.index * columns;
            const end = Math.min(start + columns, saleList.length);
            const rowSales = saleList.slice(start, end);

            return (
              <div
                key={row.key}
                className="grid"
                style={{
                  gridTemplateColumns: `repeat(${columns}, 1fr)`,
                  gap: "20px",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${row.start}px)`,
                  height: "320px",
                }}
              >
                {rowSales.map((sale) => (
                  <SaleCard key={sale._id} sale={sale} />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SalesList;
