import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "../../css/LineChartStyles.css";
import SpinnerImg from "../../assets/hot_1.png";

const SatelliteImageryIndexChart = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/satellite_imagery_index")
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
          <p>Loading satellite imagery data...</p>
        </div>
      </div>
    );
  }

  const chartData = {
    labels: data.map((d) => d.month),
    datasets: [
      {
        label: "Satellite Imagery Index",
        data: data.map((d) => d.index),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Satellite Imagery Index Trends",
        font: { size: 18 },
      },
      legend: { display: false },
    },
    scales: {
      y: { min: 0, max: 10 },
    },
  };

  return <div className="chart-container"><Line data={chartData} options={options} /></div>;
};

export default SatelliteImageryIndexChart;
