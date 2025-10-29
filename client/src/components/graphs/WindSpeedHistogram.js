// WindSpeedHistogram.js
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import "../../css/WindSpeedHistogram.css"; // Your custom styling
import SpinnerImg from "../../assets/hot_1.png"; // Replace with your image path

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const WindSpeedHistogram = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/wind_speed_distribution")
      .then((res) => res.json())
      .then((json) => setData(json.wind_speeds));
  }, []);

  if (!data.length) {
    return (
      <div className="chart-container">
        <div className="chart-loading">
          <div className="spinner-with-logo">
            <img src={SpinnerImg} alt="Loading..." className="spinner-logo" />
          </div>
          <p>Loading wind speed data...</p>
        </div>
      </div>
    );
  }

  const bins = Array.from({ length: 10 }, (_, i) => i * 10);
  const counts = bins.map((bin, i) =>
    data.filter((v) => v >= bin && v < (bins[i + 1] || Infinity)).length
  );

  const chartData = {
    labels: bins.map((b) => `${b}-${b + 9} km/h`),
    datasets: [
      {
        label: "Frequency",
        data: counts,
        backgroundColor: "#B4EBE6",
        borderRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: { font: { size: 14 } },
      },
      title: {
        display: true,
        text: "Wind Speed Distribution",
        font: { size: 18 },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          // text: "Wind Speed Range (km/h)",
          font: { size: 14 },
        },
      },
      y: {
        title: {
          display: true,
          // text: "Frequency",
          font: { size: 14 },
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-container">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default WindSpeedHistogram;
