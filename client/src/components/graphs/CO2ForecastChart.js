// CO2ForecastChart.js
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "../../css/LineChartStyles.css";
import SpinnerImg from "../../assets/hot_1.png";

const CO2ForecastChart = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/co2_trend_forecast")
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
          <p>Loading CO2 data...</p>
        </div>
      </div>
    );
  }

  const chartData = {
    labels: data.months,
    datasets: [
      {
        label: "Observed CO2 (ppm)",
        data: data.co2.slice(0, data.forecast_start - 1),
        borderColor: "#338f7a",
        fill: false,
      },
      {
        label: "Forecasted CO2",
        data: data.co2.slice(data.forecast_start - 1),
        borderColor: "red",
        borderDash: [5, 5],
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "CO2 Levels with Forecast",
        font: { size: 18 },
      },
    },
    scales: {
      x: { title: { display: true, 
        // text: "Month" 
      } },
      y: { title: { display: true, 
        // text: "CO2 (ppm)"
       } },
    },
  };

  return (
    <div className="chart-container">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default CO2ForecastChart;
