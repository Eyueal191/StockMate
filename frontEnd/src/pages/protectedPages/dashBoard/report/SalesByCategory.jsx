import React, { lazy, Suspense } from "react";
import Loading from "../../../../components/Loading.jsx";

// Lazy load DonutChart
const DonutChart = lazy(() => import("../../../../components/charts/DonutChart.jsx"));

function SalesByCategory() {
  // --- SAMPLE DATA ---
  const sampleLabels = ["Electronics", "Fashion", "Home & Kitchen", "Sports", "Books"];
  const sampleDataPoints = [4500, 3200, 2800, 1500, 900];
  const sampleColors = [
    "rgba(54, 162, 235, 0.7)", // Blue
    "rgba(255, 99, 132, 0.7)", // Pink
    "rgba(255, 206, 86, 0.7)", // Yellow
    "rgba(75, 192, 192, 0.7)", // Teal
    "rgba(153, 102, 255, 0.7)" // Purple
  ];

  return (
    <div className="w-full h-full p-6">
      <h2 className="text-2xl font-semibold mb-4">Sales By Category</h2>

      <Suspense fallback={<Loading />}>
        <div className="max-w-4xl mx-auto">
          <DonutChart labels={sampleLabels} dataPoints={sampleDataPoints} colors={sampleColors} />
        </div>
      </Suspense>
    </div>
  );
}

export default SalesByCategory;
