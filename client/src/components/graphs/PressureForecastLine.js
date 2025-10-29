// PressureForecastLine.js
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "../../css/LineChartStyles.css";
import SpinnerImg from "../../assets/hot_1.png";

const PressureForecastLine = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/pressure_forecast")
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
          <p>Loading pressure forecast...</p>
        </div>
      </div>
    );
  }

  const chartData = {
    labels: data.forecast_months,
    datasets: [{
      label: "Forecasted Pressure (hPa)",
      data: data.forecast_values,
      borderColor: "#338f7a",
      backgroundColor: "rgba(178, 255, 247, 0.5)",
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
        text: "Pressure Forecast",
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
          // text: "Pressure (hPa)",
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

export default PressureForecastLine;
