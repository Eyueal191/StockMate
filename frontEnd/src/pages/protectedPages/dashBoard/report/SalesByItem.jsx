import React, { useState, useEffect, lazy, Suspense } from "react";
import Loading from "../../../../components/Loading.jsx";
import Axios from "../../../../axios/axios.config.js";

// Lazy load the VerticalBarChart
const VerticalBarChart = lazy(() =>
  import("../../../../components/charts/VericalBarChart.jsx")
);

function SalesByItem() {
  const [report, setReport] = useState([]);

  const labels = report.map((r) => r.name);
  const values = report.map((r) => r.sale);

  const getReport = async () => {
    try {
      const res = await Axios.get("/api/report/sales-by-item");
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

 
 return (
    <div className="w-full h-full p-4 bg-gray-50">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        Sales By Item
      </h2>

      <Suspense fallback={<Loading />}>
        <VerticalBarChart labels={labels} values={values} title="Sales by Item" />
      </Suspense>
    </div>
  );
}

export default SalesByItem;
