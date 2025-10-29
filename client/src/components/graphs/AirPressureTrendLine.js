// AirPressureLine.js
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Title } from "chart.js";
import "../../css/LineChartStyles.css";
import SpinnerImg from "../../assets/hot_1.png";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Title);

const AirPressureTrendLine = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/air_pressure_trend")
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
          <p>Loading air pressure data...</p>
        </div>
      </div>
    );
  }

  const chartData = {
    labels: data.dates,
    datasets: [{
      label: "Air Pressure (hPa)",
      data: data.pressure,
      borderColor: "#80CBC4",
      backgroundColor: "rgba(180, 235, 230,0.5)",
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
        text: "Air Pressure Trend",
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
          // text: "Pressure (hPa)",
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

export default AirPressureTrendLine;
