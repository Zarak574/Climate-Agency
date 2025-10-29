// PressureSolarScatter.js
import React, { useEffect, useState } from "react";
import { Scatter } from "react-chartjs-2";
import "../../css/LineChartStyles.css";
import SpinnerImg from "../../assets/hot_1.png";

const PressureSolarScatter = () => {
  const [data, setData] = useState({ pressure: [], solar: [] });

  useEffect(() => {
    fetch("http://localhost:8000/pressure_vs_solar")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (data.pressure.length === 0) {
    return (
      <div className="chart-container">
        <div className="chart-loading">
          <div className="spinner-with-logo">
            <img src={SpinnerImg} alt="Loading..." className="spinner-logo" />
          </div>
          <p>Loading pressure vs solar data...</p>
        </div>
      </div>
    );
  }

  const scatterData = {
    datasets: [
      {
        label: "Pressure vs Solar",
        data: data.pressure.map((p, i) => ({ x: p, y: data.solar[i] })),
        backgroundColor: "rgb(255, 162, 0)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Air Pressure vs Solar Radiation",
        font: { size: 18 },
      },
    },
    scales: {
      x: { title: { display: true, 
        // text: "Air Pressure (hPa)"
       } },
      y: { title: { display: true, 
        // text: "Solar Radiation (kWh/m²)" 
      } },
    },
  };

  return (
    <div className="chart-container">
      <Scatter data={scatterData} options={options} />
    </div>
  );
};

export default PressureSolarScatter;
