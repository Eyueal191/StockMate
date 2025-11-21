// src/components/charts/LineChart.jsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart({ labels = [], dataPoints = [], title = "", borderColor = "rgba(54, 162, 235, 1)", backgroundColor = "rgba(54, 162, 235, 0.2)" }) {
  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: dataPoints,
        fill: true, // for area under the line
        borderColor,
        backgroundColor,
        tension: 0.3, // smooth curves
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: !!title,
        text: title,
        font: { size: 18, weight: "bold" },
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        grid: { display: true },
      },
    },
  };

  return (
    <div className="w-full h-96 max-w-5xl mx-auto p-4 bg-white rounded-2xl shadow">
      <Line data={data} options={options} />
    </div>
  );
}

export default LineChart;
