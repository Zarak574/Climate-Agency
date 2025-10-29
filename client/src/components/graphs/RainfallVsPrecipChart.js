import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "../../css/RainfallVsPrecipChart.css"; // ⬅️ Add this line
import SpinnerImg from "../../assets/hot_1.png"; // Optional spinner logo

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Legend, Tooltip);

const RainfallVsPrecipChart = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/rainfall_vs_precip")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) {
    return (
      <div className="chart-container">
        <div className="chart-loading">
          <div className="spinner-with-logo">
            <img src={SpinnerImg} alt="Loading..." className="spinner-logo" />
          </div>
          <p>Loading Rainfall vs. Precipitation chart...</p>
        </div>
      </div>
    );
  }

  const chartData = {
    labels: data.months,
    datasets: [
      {
        label: "Precipitation (mm)",
        data: data.precipitation,
        borderColor: "#80CBC4",
        backgroundColor: "rgba(137, 231, 255, 0.1)",
        fill: true,
        tension: 0.3,
      },
      {
        label: "Rainfall (mm)",
        data: data.rainfall,
        borderColor: "#0f635c",
        backgroundColor: "rgba(3, 107, 133, 0.1)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(2)} mm`,
        },
      },
      title: {
        display: true,
        text: "Rainfall vs. Total Precipitation",
        font: { size: 18 },
      },
    },
    scales: {
      x: {
        title: { display: true, text: "Month" },
      },
      y: {
        title: { display: true, text: "Millimeters (mm)" },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-container">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default RainfallVsPrecipChart;
