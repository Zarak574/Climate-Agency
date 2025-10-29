import React from "react";
import SolarHeatmap from "./graphs/SolarHeatmap";
import PressureSolarScatter from "./graphs/PressureSolarScatter";
import CO2ForecastChart from "./graphs/CO2ForecastChart";
import "../css/SolarAirMetrics.css"; 

const SolarAirMetrics = () => {
  return (
      <div className="solar-dashboard-container">
        <h2 className="dashboard-heading">Solar & Air Metrics</h2>
        <div className="solar-chart-wrapper">
          <PressureSolarScatter />
          <CO2ForecastChart />
          <SolarHeatmap />
        </div>
    </div>
  );
};

export default SolarAirMetrics;
