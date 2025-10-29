// HumidityLine.js
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Title } from "chart.js";
import "../../css/LineChartStyles.css";
import SpinnerImg from "../../assets/hot_1.png"; // Replace with your actual spinner

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Title);

const HumidityTrendLine = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/humidity_over_time")
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) {
    return (
      <div className="chart-container">
        <div className="chart-loading">
          <div className="spinner-with-logo">
            <img src={SpinnerImg} alt="Loading..." className="spinner-logo" />
          </div>
          <p>Loading humidity data...</p>
        </div>
      </div>
    );
  }

  const chartData = {
    labels: data.dates,
    datasets: [{
      label: "Humidity (%)",
      data: data.humidity,
      borderColor: "#FFB433",
      backgroundColor: "rgba(255, 209, 149, 0.4)",
      fill: true,
      tension: 0.3,
      pointRadius: 2,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Humidity Over Time",
        font: { size: 18 },
      },
      legend: {
        position: "top",
        labels: { font: { size: 14 } },
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          // text: "Humidity (%)",
          font: { size: 14 }
        }
      },
      x: {
        title: {
          display: true,
          // text: "Date",
          font: { size: 14 }
        }
      }
    }
  };

  return (
    <div className="chart-container">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default HumidityTrendLine;
