import React from "react";
import WindSpeedHistogram from "./graphs/WindSpeedHistogram";
import HumidityTrendLine from "./graphs/HumidityTrendLine";
import AirPressureTrendLine from "./graphs/AirPressureTrendLine";
import HumidityForecastLine from "./graphs/HumidityForecastLine"
import PressureForecastLine from "./graphs/PressureForecastLine"
import "../css/AtmosphericConditions.css"; 

const AtmosphericConditions = () => {
  return (
    <div className="atmp-dashboard-container">
      <h2 className="dashboard-heading">Atmospheric Insights</h2>
      <div className="atmp-chart-wrapper">
        <WindSpeedHistogram />
         <HumidityForecastLine/>
        <PressureForecastLine/>
        <HumidityTrendLine />
        <AirPressureTrendLine />
      </div>
    </div>
  );
};

export default AtmosphericConditions;
