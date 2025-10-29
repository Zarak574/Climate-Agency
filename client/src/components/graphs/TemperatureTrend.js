import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "../../css/LineChartStyles.css";
import SpinnerImg from "../../assets/hot_1.png";

const TemperatureTrend = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/trend")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  if (!data) {
    return (
      <div className="chart-container">
        <div className="chart-loading">
          <div className="spinner-with-logo">
            <img src={SpinnerImg} alt="Loading..." className="spinner-logo" />
          </div>
          <p>Loading temperature trend...</p>
        </div>
      </div>
    );
  }

  const chartData = {
    labels: data.dates,
    datasets: [
      {
        label: "Temperature Trend",
        data: data.temperature,
        borderColor: "#FFB433",
        backgroundColor: "#FBF8EF",
        fill: true,
      },
    ],
  };

  return (
    <div className="chart-container">
      <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

export default TemperatureTrend;
