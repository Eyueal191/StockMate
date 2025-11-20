import React, { useState } from "react";

function SalesFilterBar({ onFilter }) {
  const [seller, setSeller] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleFilter = () => {
    if (onFilter) {
      onFilter({ seller, startDate, endDate });
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 md:items-center p-2 bg-gray-50 rounded shadow-sm">
      <input
        type="text"
        placeholder="Seller Name"
        value={seller}
        onChange={(e) => setSeller(e.target.value)}
        className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={handleFilter}
        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
      >
        Filter
      </button>
    </div>
  );
}
export default SalesFilterBar;
