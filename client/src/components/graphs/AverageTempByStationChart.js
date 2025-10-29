import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "../../css/AverageTempByStationChart.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const AverageTempByStationChart = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/average_temp_by_station")
      .then((res) => res.json())
      .then((resData) => {
        console.log("Fetched Data:", resData);
        setData(resData);
      });
  }, []);

  if (!data) return (
    <div className="chart-container">
      <div className="chart-loading">
        <div className="spinner" />
        <p>Loading average temperature by station...</p>
      </div>
    </div>
  );

  const chartData = {
    labels: data.station_ids,
    datasets: [
      {
        label: "Average Temperature",
        data: data.average_temps,
        backgroundColor: "orange",
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.parsed.y.toFixed(2)} °C`;
          }
        }
      },
      legend: {
        display: true,
        labels: {
          font: { size: 12 },
          color: "black"
        }
      },
       title: {
        display: true,
        text: "Average Temperature By Station",
        font: { size: 20 }
      },
    },
    responsive: true,
    maintainAspectRatio: false, // Ensures the chart can adjust its size
    scales: {
      y: {
        beginAtZero: true,
      }
    }
  };

  return (
    <div className="chart-wrapper">
      <div className="chart-container">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default AverageTempByStationChart;
