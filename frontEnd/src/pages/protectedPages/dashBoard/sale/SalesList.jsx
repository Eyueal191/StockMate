// src/pages/protectedPages/dashBoard/sale/SalesList.jsx
import React, { useEffect, useRef, useState, lazy } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

const SaleCard = lazy(() => import("../../../../components/cards/SaleCard.jsx"));

const exampleSales = [
  {
    _id: "s1",
    seller: "John Doe",
    date: "2024-12-10T10:30:00Z",
    quantity: 4,
    item: {
      name: "Wireless Headphones",
      image: "https://images.unsplash.com/photo-1518444021422-6bd1e0dd3b63"
    }
  },
  {
    _id: "s2",
    seller: "Sarah Smith",
    date: "2024-12-09T13:15:00Z",
    quantity: 2,
    item: {
      name: "Smart Watch",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
    }
  },
  {
    _id: "s3",
    seller: "Alex Carter",
    date: "2024-12-07T09:45:00Z",
    quantity: 10,
    item: {
      name: "Bluetooth Speaker",
      image: "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab"
    }
  },
  {
    _id: "s4",
    seller: "John Doe",
    date: "2024-12-05T16:20:00Z",
    quantity: 1,
    item: {
      name: "Gaming Mouse",
      image: "https://images.unsplash.com/photo-1584270354949-1f5b3c43b1d1"
    }
  },
  {
    _id: "s5",
    seller: "Maria Lopez",
    date: "2024-12-03T11:10:00Z",
    quantity: 5,
    item: {
      name: "Laptop Cooling Pad",
      image: "https://images.unsplash.com/photo-1587202372775-989772b1fb0c"
    }
  },
  {
    _id: "s6",
    seller: "David Chen",
    date: "2024-12-02T14:05:00Z",
    quantity: 3,
    item: {
      name: "Mechanical Keyboard",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4"
    }
  },
  {
    _id: "s7",
    seller: "Alex Carter",
    date: "2024-11-29T18:25:00Z",
    quantity: 8,
    item: {
      name: "Portable SSD 1TB",
      image: "https://images.unsplash.com/photo-1586880244406-556ebe35f282"
    }
  },
  {
    _id: "s8",
    seller: "Maria Lopez",
    date: "2024-11-27T12:00:00Z",
    quantity: 6,
    item: {
      name: "4K Web Camera",
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3"
    }
  },
  {
    _id: "s9",
    seller: "Sarah Smith",
    date: "2024-11-25T15:40:00Z",
    quantity: 9,
    item: {
      name: "USB-C Hub",
      image: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68"
    }
  },
  {
    _id: "s10",
    seller: "David Chen",
    date: "2024-11-22T10:50:00Z",
    quantity: 7,
    item: {
      name: "Ergonomic Office Chair",
      image: "https://images.unsplash.com/photo-1585559605151-208f3c8a6efc"
    }
  }
];

function SalesList() {
  const [sales] = useState(exampleSales);

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

  const rowCount = Math.ceil(sales.length / columns);
  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 340,
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
            const end = Math.min(start + columns, sales.length);
            const rowSales = sales.slice(start, end);

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
