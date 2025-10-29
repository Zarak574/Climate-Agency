import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "../../css/LineChartStyles.css";
import SpinnerImg from "../../assets/hot_1.png";

const SensorReliabilityChart = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/sensor_reliability")
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
          <p>Loading sensor reliability data...</p>
        </div>
      </div>
    );
  }

  const chartData = {
    labels: data.map((d) => d.month),
    datasets: [
      {
        label: "Sensor Reliability Index",
        data: data.map((d) => d.reliability),
        borderColor: "rgba(255, 159, 64, 1)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const latestReliability = (data[data.length - 1]?.reliability || 0) * 100;

  return (
    <div className="chart-container" style={{ height: "350px", width: "100%" }}>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Sensor Reliability Index Over Time",
              font: { size: 18 },
            },
            legend: { display: false },
          },
          scales: {
            x: { title: { display: true, text: "Month" } },
            y: { title: { display: true, text: "Reliability Index" }, min: 0, max: 1 },
          },
        }}
      />
      <div className="gauge-container">
        <h3>Latest Reliability Index</h3>
        <div className="gauge-bar">
          <div
            className="gauge-fill"
            style={{ width: `${latestReliability}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default SensorReliabilityChart;
