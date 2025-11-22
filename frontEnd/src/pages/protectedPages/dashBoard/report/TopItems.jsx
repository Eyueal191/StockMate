import React, { useState, useEffect, lazy, Suspense } from "react";
import Loading from "../../../../components/Loading.jsx";
import Axios from "../../../../axios/axios.config.js";

// Lazy load the HorizontalBarChart
const HorizontalBarChart = lazy(() =>
  import("../../../../components/charts/HorizontalBarChart.jsx")
);

function TopItems() {
  const [report, setReport] = useState([]);

  // Map backend data to chart labels and values
  const labels = report.map((r) => r.name);
  const values = report.map((r) => r.sale);

  const getReport = async () => {
    try {
      const res = await Axios.get("/api/report/top-items");
      if (res.data.success) {
        setReport(res.data.report);
      }
    } catch (error) {
      console.log("Error Message:", error.message);
    }
  };

  useEffect(() => {
    getReport();
  }, []);

  const title = "Top Selling Products by Quantity";

  return (
    <div className="w-full min-h-screen px-4 md:px-6 py-12 bg-gray-50">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        Top Sale Items
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

export default TopItems;
