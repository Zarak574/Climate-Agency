import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "../../css/TemperatureVariabilityChart.css"; 

const TemperatureVariabilityChart = () => {
  const [data, setData] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/temperature_variability")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        const uniqueRegions = [...new Set(result.regions)];
        setSelectedRegion(uniqueRegions[0]);
      });
  }, []);

  if (!data || !selectedRegion) {
    return (
      <div className="chart-container">
        <div className="chart-loading">
          <div className="spinner" />
          <p>Loading temperature variability...</p>
        </div>
      </div>
    );
  }

  const filtered = data.months
    .map((month, i) => ({
      month,
      region: data.regions[i],
      variability: data.variability[i],
    }))
    .filter((d) => d.region === selectedRegion);

  const chartData = {
    labels: filtered.map((d) => d.month),
    datasets: [
      {
        label: `Temp Variability (${selectedRegion})`,
        data: filtered.map((d) => d.variability),
        fill: false,
        backgroundColor: "orange",
        borderColor: "orange"
      },
      
    ],
  };

  return (
    <div className="chart-container" >
      {/* Dropdown for selecting region */}
      <div className="select-region-container">
        <label>Select Region: </label>
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="select-region"
        >
          {[...new Set(data.regions)].map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      {/* Chart area */}
      <div className="chart-area" style={{height: "470px"}}>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default TemperatureVariabilityChart;
