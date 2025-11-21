// src/pages/admin/SalesByItem.jsx
import React, { lazy, Suspense } from 'react';
import Loading from '../../../../components/Loading.jsx';

// Lazy load the VerticalBarChart
const VerticalBarChart = lazy(() =>
  import('../../../../components/charts/VericalBarChart.jsx')
);

function SalesByItem() {
  // Generate 50 products
  const labels = Array.from({ length: 50 }, (_, i) => `Product ${i + 1}`);

  // Generate random sales values for each product (example)
  const values = Array.from({ length: 50 }, () =>
    Math.floor(Math.random() * 20000) + 1000
  );

  return (
    <div className="w-full h-full p-4 bg-gray-50">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        Sales By Item
      </h2>

      <Suspense fallback={<Loading />}>
        <VerticalBarChart
          labels={labels}
          values={values}
          title="Sales by Item"
        />
      </Suspense>
    </div>
  );
}

export default SalesByItem;
