import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import "../../css/RainfallDistributionPie.css"; // ⬅️ Import your CSS
import SpinnerImg from "../../assets/hot_1.png"; // Optional spinner logo

ChartJS.register(ArcElement, Tooltip, Legend);

const RainfallDistributionPie = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/rainfall_distribution")
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
          <p>Loading Rainfall Distribution Pie Chart...</p>
        </div>
      </div>
    );
  }

  const chartData = {
    labels: data.regions,
    datasets: [
      {
        label: "Rainfall Distribution",
        data: data.rainfall,
        backgroundColor: [
          "#338f7a", "#80CBC4", "#0f635c", "#9cc7c3", "#6f42c1", "#20c997",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="chart-container">
      <Pie data={chartData} />
    </div>
  );
};

export default RainfallDistributionPie;
