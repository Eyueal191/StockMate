import React, { useState, useEffect, lazy, Suspense } from "react";
import Axios from "../../../../axios/axios.config.js";
import Loading from "../../../../components/Loading.jsx";

const LineChart = lazy(() =>
  import("../../../../components/charts/LineChart.jsx")
);

function SalesByDate() {
  const [salesByDate, setSalesByDate] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const labels = salesByDate.map((item) => item.date);
  const dataPoints = salesByDate.map((item) => item.sales);

  const getSalesByDate = async () => {
    try {
      let url = "/api/report/sales-by-date";
      if (from && to) url += `?from=${from}&to=${to}`;

      const res = await Axios.get(url);
      if (res.data.success) setSalesByDate(res.data.report);
    } catch (error) {
      console.log("Error fetching sales by date:", error.message);
    }
  };

  useEffect(() => {
    getSalesByDate();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    getSalesByDate();
  };

  return (
    <div className="w-full min-h-screen px-4 md:px-8 py-12 bg-gray-50">
      <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-gray-800 mb-8">
        Sales By Date (Daily Trend)
      </h2>

      {/* Filter Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-center gap-4 mb-8 bg-white p-6 rounded-2xl shadow-lg"
      >
        <div className="flex flex-col w-full md:w-auto">
          <label className="text-[clamp(0.8rem,2vw,1rem)] font-semibold text-gray-700 mb-1">
            From:
          </label>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-[clamp(0.8rem,2vw,1rem)]"
          />
        </div>

        <div className="flex flex-col w-full md:w-auto">
          <label className="text-[clamp(0.8rem,2vw,1rem)] font-semibold text-gray-700 mb-1">
            To:
          </label>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-[clamp(0.8rem,2vw,1rem)]"
          />
        </div>

        <button
          type="submit"
          className="w-full md:w-auto mt-3 md:mt-0 px-6 py-3 bg-blue-600 text-white font-semibold rounded-2xl md:mt-6 shadow hover:bg-blue-700 hover:scale-105 transition-transform duration-150 text-[clamp(0.9rem,2.2vw,1.1rem)]"
        >
          Apply Filter
        </button>
      </form>

      {/* Chart Container */}
      <div className="w-full h-[70vh] overflow-auto rounded-2xl shadow-xl bg-white p-6">
        <Suspense fallback={<Loading />}>
          <LineChart
            labels={labels}
            dataPoints={dataPoints}
            borderColor="rgba(59, 130, 246, 1)"
            backgroundColor="rgba(59, 130, 246, 0.2)"
          />
        </Suspense>
      </div>
    </div>
  );
}

export default SalesByDate;
