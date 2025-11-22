import React, { useState, useEffect, lazy, Suspense } from "react";
import Loading from "../../../../components/Loading.jsx";
import Axios from "../../../../axios/axios.config.js";

// Lazy load the HorizontalBarChart
const HorizontalBarChart = lazy(() =>
  import("../../../../components/charts/HorizontalBarChart.jsx")
);

function LowStock() {
  const [lowStockItems, setLowStockItems] = useState([]);

  // Map backend data to chart labels and values
  const labels = lowStockItems.map((item) => item.name);
  const values = lowStockItems.map((item) => item.stock);

  const getLowStockItems = async () => {
    try {
      const res = await Axios.get("/api/report/low-stock-items");
      if (res.data.success) {
        setLowStockItems(res.data.lowStockItems);
      }
    } catch (error) {
      console.log("Error Message:", error.message);
    }
  };

  useEffect(() => {
    getLowStockItems();
  }, []);

  const title = "Low Stock Products";

  return (
    <div className="w-full min-h-screen px-4 md:px-6 py-12 bg-gray-50">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        Low Stock Items
      </h2>

      {/* Scrollable chart wrapper */}
      <div className="w-full max-h-[80vh] overflow-y-auto overflow-x-auto rounded-2xl shadow bg-white px-4">
        <Suspense fallback={<Loading />}>
          <HorizontalBarChart labels={labels} values={values} title={title} />
        </Suspense>
      </div>
    </div>
  );
}

export default LowStock;
