import React, { lazy, Suspense } from 'react';
import Loading from "../../../../components/Loading.jsx";

const DonutChart = lazy(() => import("../../../../components/charts/DonutChart.jsx"));

function RevenueAnalytics() {
  // Sample data
  const labels = [
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Books",
    "Sports",
    "Toys",
    "Health",
    "Beauty",
    "Automotive"
  ];
  const dataPoints = [12000, 8000, 5000, 3000, 2000, 1500, 1000, 700, 500];
  const colors = [
    "rgba(54, 162, 235, 0.8)",
    "rgba(255, 99, 132, 0.8)",
    "rgba(255, 206, 86, 0.8)",
    "rgba(75, 192, 192, 0.8)",
    "rgba(153, 102, 255, 0.8)",
    "rgba(255, 159, 64, 0.8)",
    "rgba(199, 199, 199, 0.8)",
    "rgba(255, 99, 255, 0.8)",
    "rgba(0, 128, 0, 0.8)",
  ];

  const title = "Revenue Analytics";

  return (
    <div className="w-full min-h-screen px-4 md:px-6 py-12 bg-gray-50">
        <Suspense fallback={<Loading />}>
        <DonutChart labels={labels} dataPoints={dataPoints} colors={colors} title={title} />
      </Suspense>
    </div>
  );
}

export default RevenueAnalytics;
