import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "../../css/TotalPrecipitationChart.css"; // Make sure this file exists
import SpinnerImg from "../../assets/hot_1.png"; // Replace with your spinner logo if available

const TotalPrecipitationChart = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/total_precipitation")
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
          <p>Loading total precipitation data...</p>
        </div>
      </div>
    );
  }

  const chartData = {
    labels: data.months,
    datasets: [
      {
        label: "Total Precipitation (mm)",
        data: data.total_precip,
        backgroundColor: "#338f7a",
        borderColor: "#338f7a",
        fill: true,
        tension: 0.3,
        pointRadius: 2,
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
        text: "Monthly Total Precipitation",
        font: { size: 18 },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => `${value} mm`,
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default TotalPrecipitationChart;
