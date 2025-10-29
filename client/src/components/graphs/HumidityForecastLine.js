// HumidityForecastLine.js
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "../../css/LineChartStyles.css";
import SpinnerImg from "../../assets/hot_1.png";

const HumidityForecastLine = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/humidity_forecast")
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
          <p>Loading humidity forecast...</p>
        </div>
      </div>
    );
  }

  const chartData = {
    labels: data.forecast_months,
    datasets: [{
      label: "Forecasted Humidity (%)",
      data: data.forecast_values,
      borderColor: "#f19900",
      backgroundColor: "rgba(255, 224, 166, 0.5)",
      fill: true,
      tension: 0.4
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Humidity Forecast",
        font: { size: 18 }
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
          // text: "Month",
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

export default HumidityForecastLine;
