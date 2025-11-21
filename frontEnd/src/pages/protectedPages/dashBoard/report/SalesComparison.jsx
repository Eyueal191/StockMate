import React, { lazy, Suspense } from "react";
import Loading from "../../../../components/Loading";

const ComboChart = lazy(() => import("../../../../components/charts/ComboChart.jsx"));

function SalesComparison() {
  return (
    <div className="w-full h-full p-4">
      <Suspense fallback={<Loading />}>
        <ComboChart
          title="Product A"
          monthOne="January"
          monthTwo="February"
          salesMonthOne={1200}
          salesMonthTwo={1500}
        />
      </Suspense>
    </div>
  );
}

export default SalesComparison;
