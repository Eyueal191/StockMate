import React, { lazy, Suspense } from "react";
import Loading from "../../../../components/Loading.jsx";

const HorizontalBarChart = lazy(() =>
  import("../../../../components/charts/HorizontalBarChart.jsx")
);

function LowStock() {
  // 50 products
  const labels = [
    "Product A","Product B","Product C","Product D","Product E",
    "Product F","Product G","Product H","Product I","Product J",
    "Product K","Product L","Product M","Product N","Product O",
    "Product P","Product Q","Product R","Product S","Product T",
    "Product U","Product V","Product W","Product X","Product Y",
    "Product Z","Product AA","Product AB","Product AC","Product AD",
    "Product AE","Product AF","Product AG","Product AH","Product AI",
    "Product AJ","Product AK","Product AL","Product AM","Product AN",
    "Product AO","Product AP","Product AQ","Product AR","Product AS",
    "Product AT","Product AU","Product AV","Product AW","Product AX",
  ];

  const values = [
    5,8,3,6,2,4,7,1,9,2,
    3,5,8,4,2,7,6,3,5,1,
    9,2,4,6,8,3,2,5,7,1,
    6,4,3,8,2,5,7,1,9,3,
    4,6,2,7,1,8,5,3,6,2,
  ];

  const title = "Low Stock Products";

  return (
    <div className="w-full min-h-screen p-4 md:p-6">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        Low Stock Items
      </h2>

      {/* Scrollable container */}
      <div className="w-full max-h-screen overflow-y-auto rounded-2xl shadow bg-white p-4">
        <Suspense fallback={<Loading />}>
          <HorizontalBarChart labels={labels} values={values} title={title} />
        </Suspense>
      </div>
    </div>
  );
}

export default LowStock;
