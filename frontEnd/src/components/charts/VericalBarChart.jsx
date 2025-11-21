import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function VerticalBarChart({ labels = [], values = [], title = "" }) {
  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: values,
        borderWidth: 1,
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
      },
    ],
  };

  const options = {
    indexAxis: 'x', // Vertical chart (default)
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: title,
      },
      tooltip: {
        enabled: true,
      },
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
    <div className="w-full h-96 max-w-4xl mx-auto p-4 bg-white rounded-2xl shadow">
      <Bar data={data} options={options} />
    </div>
  );
}

export default VerticalBarChart;
