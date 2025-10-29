import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "../../css/LineChartStyles.css";
import SpinnerImg from "../../assets/hot_1.png";

const WeatherStationScoresChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/weather_station_scores")
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("Error loading weather station scores:", err));
  }, []);

  if (!Array.isArray(data) || !data.length) {
    return (
      <div className="chart-container">
        <div className="chart-loading">
          <div className="spinner-with-logo">
            <img src={SpinnerImg} alt="Loading..." className="spinner-logo" />
          </div>
          <p>Loading weather station scores...</p>
        </div>
      </div>
    );
  }

  const chartData = {
    labels: data.map((d) => d.Region),
    datasets: [
      {
        label: "Avg Weather Station Score",
        data: data.map((d) => d.score),
        backgroundColor: "rgba(35, 190, 175, 0.5)",
      },
    ],
  };

  return (
    <div className="chart-container" style={{ height: "400px" }}>
  <Bar
    data={chartData}
    options={{
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "Weather Station Score Distribution",
          font: { size: 18 },
        },
      },
      scales: {
        y: { min: 0, max: 100 },
      },
    }}
  />
</div>

  );
};

export default WeatherStationScoresChart;
