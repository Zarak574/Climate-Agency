
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "../../css/TemperatureTrendsChart.css";
import SpinnerImg from "../../assets/hot_1.png";


const TemperatureTrendsChart = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/temperature_trends")
      .then((res) => res.json())
      .then((json) => {
        // Optional: format dates nicely (e.g., "Apr 2023")
        const formattedDates = json.dates.map(date =>
          new Date(date).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric"
          })
        );
        setData({ ...json, dates: formattedDates });
      });
  }, []);

 if (!data) {
  return (
    <div className="chart-loading">
      <div className="spinner-with-logo">
        <img src={SpinnerImg} alt="Loading..." className="spinner-logo" />
      </div>
      <p>Loading temperature trends...</p>
    </div>
  );
}



  const chartData = {
    labels: data.dates,
    datasets: [
      {
        label: "Max Temperature (°C)",
        data: data.max_temp,
        borderColor: "#FFB433",
        backgroundColor: "rgba(240, 136, 39, 0.17)",
        fill: true,
        tension: 0.4,
        borderDash: [5, 5], // Dotted/dashed line style
        pointRadius: 2,
      },
      {
        label: "Min Temperature (°C)",
        data: data.min_temp,
        borderColor: "#80CBC4",
        backgroundColor: "rgba(95, 253, 219, 0.2)",
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
        text: "Yearly Temperature Trends",
        font: { size: 18 },
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxRotation: 30,
          minRotation: 30,
          font: { size: 10 },
        },
      },
     y: {
  ticks: {
    callback: function(value) {
      return value + "°C";
    }
  }
}

    },
  };

  return (
    <div className="chart-container">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default TemperatureTrendsChart;
