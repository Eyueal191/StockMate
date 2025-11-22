import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartDataLabels);

function VerticalBarChart({ labels = [], values = [] }) {
  const colors = [
    "#2563EB", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6",
    "#06B6D4", "#F43F5E", "#84CC16", "#D946EF", "#0EA5E9"
  ];

  const filtered = labels
    .map((label, i) => ({ label, value: values[i] }))
    .filter(item => typeof item.value === "number" && item.value > 0)
    .sort((a, b) => b.value - a.value);

  const sortedLabels = filtered.map(item => item.label);
  const sortedValues = filtered.map(item => item.value);

  const data = {
    labels: sortedLabels,
    datasets: [
      {
        label: "Quantity Sold",
        data: sortedValues,
        backgroundColor: sortedValues.map((_, i) => colors[i % colors.length]),
        borderRadius: 4,
        borderWidth: 1,
        barThickness: "flex",   
        maxBarThickness: 42,
      },
    ],
  };

  const options = {
    indexAxis: "x",
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(30,41,59,0.9)",
        titleColor: "#fff",
        bodyColor: "#e5e7eb",
      },
      datalabels: {
        anchor: "end",
        align: "end",
        color: "#000",
        rotation: -45,
        font: (ctx) => {
          const barWidth =
            ctx.chart.getDatasetMeta(0).data[ctx.dataIndex].width;
          return { size: Math.max(10, Math.min(barWidth * 0.35, 14)), weight: "bold" };
        },
        formatter: (value) => value,
      },
    },

    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#374151",
          maxRotation: 30,
          minRotation: 0,
          autoSkip: true,
          autoSkipPadding: 20,
        },
      },
      y: {
        beginAtZero: true,
        grid: { color: "rgba(156,163,175,0.2)" },
        ticks: {
          color: "#374151",
          font: { weight: 500 },
        },
      },
    },
  };

  return (
    <div className="w-full h-full overflow-x-auto rounded-lg p-2 max-h-[60vh]">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full h-full min-w-[600px]">
        <Bar data={data} options={options} plugins={[ChartDataLabels]} />
      </div>
    </div>
  );
}

export default VerticalBarChart;
