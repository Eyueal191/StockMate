import React, { lazy, Suspense } from "react";
import Loading from "../../../../components/Loading";

const HorizontalBarChart = lazy(() =>
  import("../../../../components/charts/HorizontalBarChart.jsx")
);

function TopItems() {
  // 50 example products
  const labels = Array.from({ length: 50 }, (_, i) => `Product ${String.fromCharCode(65 + (i % 26))}${i >= 26 ? i - 25 : ""}`);
  const values = Array.from({ length: 50 }, () => Math.floor(Math.random() * 20) + 1);

  const title = "Top Selling Products by Quantity";

  return (
    <div className="w-full min-h-screen px-4 md:px-6 pm bg-gray-50 py-12">
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
