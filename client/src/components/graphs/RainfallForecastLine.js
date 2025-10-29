import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import "../../css/RainfallForecastLine.css"; // Add CSS file
import SpinnerImg from "../../assets/hot_1.png"; // Optional logo/spinner image

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler
);

const RainfallForecastLine = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/rainfall_forecast")
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
          <p>Loading rainfall forecast...</p>
        </div>
      </div>
    );
  }

  const chartData = {
    labels: data.forecast_months,
    datasets: [
      {
        label: "Forecasted Rainfall (mm)",
        data: data.forecast_values,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
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
          label: (ctx) => `${ctx.parsed.y.toFixed(2)} mm`,
        },
      },
      title: {
        display: true,
        text: "12-Month Rainfall Forecast",
        font: { size: 18 },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          // text: "Month",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          // text: "Rainfall (mm)",
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default RainfallForecastLine;
