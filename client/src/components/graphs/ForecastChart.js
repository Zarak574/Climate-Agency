import React, { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";
import "../../css/LineChartStyles.css";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const ForecastChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [forecastType, setForecastType] = useState("daily");

  useEffect(() => {
    fetchForecast(forecastType);
  }, [forecastType]);

  const fetchForecast = async (type) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ days: 30, type }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();

      setChartData({
        labels: data.dates,
        datasets: [
          {
            label: "Temperature (°C)",
            data: data.temperature.mean,
            borderColor: "#ffb433",
            backgroundColor: "rgba(245, 226, 171, 0.6)",
            fill: true,
            tension: 0.4,
          },
          {
            label: "Rainfall (mm)",
            data: data.rainfall.mean,
            borderColor: "#b4ebe6",
            backgroundColor: "rgba(172, 255, 248, 0.21)",
            fill: true,
            tension: 0.4,
          },
          {
            label: "Humidity (%)",
            data: data.humidity.mean,
            borderColor: "#338f7a",
            backgroundColor: "rgba(28, 129, 106, 0.1)",
            fill: true,
            tension: 0.4,
          },
        ],
      });
    } catch (err) {
      setError("Failed to load forecast data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chart-container" style={{ height: "400px", width: "100%"}}>
      <h2 className="text-2xl font-bold mb-4 text-center">Climate Forecast</h2>

      <div className="text-center mb-4">
        <label className="mr-2 font-semibold">Select Forecast Type:</label>
        <select
          className="border border-gray-300 p-2 rounded-md"
          value={forecastType}
          onChange={(e) => setForecastType(e.target.value)}
        >
          <option value="daily">30-Day Forecast</option>
          <option value="monthly">Monthly Forecast</option>
          <option value="yearly">Yearly Forecast</option>
        </select>
      </div>

      {loading ? (
        <div className="chart-loading">Loading chart...</div>
      ) : error ? (
        <div className="chart-loading text-red-500">{error}</div>
      ) : (
        <Chart
          key={forecastType}
          type="line"
          data={chartData}
          options={{
            responsive: true,
            animation: {
              duration: 1200,
              easing: "easeInOutQuart",
            },
            plugins: {
              legend: { position: "top" },
            },
            interaction: {
              mode: "index",
              intersect: false,
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: { precision: 2 },
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default ForecastChart;
