// src/pages/admin/SalesOverview.jsx
import React, { lazy, Suspense } from 'react';
import Loading from '../../../../components/Loading.jsx';

// Lazy load the LineChart component
const LineChart = lazy(() => import('../../../../components/charts/LineChart.jsx'));

function SalesOverview() {
  // Example data for the chart
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  const dataPoints = [12000, 15000, 14000, 17000, 16000, 19000, 22000];

  return (
    <div className="w-full min-h-screen p-6 bg-gray-50 flex flex-col">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Sales Overview</h2>

      <div className="flex-1">
        <Suspense fallback={<Loading />}>
          <LineChart
            labels={labels}
            dataPoints={dataPoints}
            title="Monthly Sales"
            borderColor="rgba(54, 162, 235, 1)"
            backgroundColor="rgba(54, 162, 235, 0.2)"
          />
        </Suspense>
      </div>
    </div>
  );
}

export default SalesOverview;
