// SolarHeatmap.js
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, Tooltip, Title } from "chart.js";
import { MatrixController, MatrixElement } from "chartjs-chart-matrix";
import { Chart } from "react-chartjs-2";
import "../../css/LineChartStyles.css";

ChartJS.register(CategoryScale, LinearScale, MatrixController, MatrixElement, Tooltip, Title);

const SolarHeatmap = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/solar_heatmap")
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("Error loading heatmap data:", err));
  }, []);

  if (!data.length) {
    return (
      <div className="chart-container">
        <div className="chart-loading">
          <p>Loading heatmap...</p>
        </div>
      </div>
    );
  }

  const regions = [...new Set(data.map((d) => d.Region))];
  const months = [...new Set(data.map((d) => d.month))];

  const chartData = {
    datasets: [
      {
        label: "Solar Radiation",
        data: data.map((d) => ({
          x: d.month,
          y: d.Region,
          v: d.solar,
        })),
        backgroundColor: (ctx) => {
          const val = ctx.raw.v;
          const opacity = Math.min(val / 2000, 1);
          return `rgba(255, 165, 0, ${opacity})`;
        },
        borderColor: "#fff",
        borderWidth: 1,
        width: (ctx) => {
          const chartArea = ctx.chart.chartArea;
          if (!chartArea) return 10;
          const cellWidth = chartArea.width / months.length;
          return Math.max(5, Math.min(cellWidth, 20));
        },
        height: (ctx) => {
          const chartArea = ctx.chart.chartArea;
          if (!chartArea) return 10;
          const cellHeight = chartArea.height / regions.length;
          return Math.max(5, Math.min(cellHeight, 20));
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: { top: 20, bottom: 20, left: 10, right: 10 },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx) =>
            `Region: ${ctx.raw.y}, Month: ${ctx.raw.x}, Solar: ${ctx.raw.v.toFixed(1)} kWh/m²`,
        },
      },
      title: {
        display: true,
        text: "Solar Radiation Heatmap (kWh/m²)",
        font: { size: 18 },
        padding: { bottom: 10 },
      },
    },
    scales: {
      x: {
        type: "category",
        labels: months,
        // title: { display: true, text: "Month" },
        grid: { display: false },
        ticks: {
          autoSkip: true,
          maxRotation: 45,
          minRotation: 30,
          font: { size: 12 },
        },
      },
      y: {
        type: "category",
        labels: regions,
        // title: { display: true, text: "Region" },
        grid: { display: false },
        ticks: {
          font: { size: 12 },
        },
      },
    },
  };

  return (
    <div className="heatmap-scroll">
      <div className="chart-container" style={{ minWidth: "1000px", height: "300px" }}>
        <Chart type="matrix" data={chartData} options={options} />
      </div>
    </div>
  );
};

export default SolarHeatmap;
