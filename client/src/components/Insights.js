import React from "react";
import TemperatureTrendsChart from "./graphs/TemperatureTrendsChart";
import TemperatureVariabilityChart from "./graphs/TemperatureVariabilityChart";
import "../css/TemperatureInsightsDashboard.css"; 
import TemperatureSummaryCards from "./graphs/TemperatureSummaryCards";
import WindSpeedHistogram from "./graphs/WindSpeedHistogram";
import HumidityTrendLine from "./graphs/HumidityTrendLine";
import AirPressureTrendLine from "./graphs/AirPressureTrendLine";
import HumidityForecastLine from "./graphs/HumidityForecastLine"
import PressureForecastLine from "./graphs/PressureForecastLine"

const Insights = () => (
  <div className="temp-ashboard-container">
    <h2 className="dashboard-heading">Insights</h2>
    <div className="temp-chart-wrapper">
      <TemperatureTrendsChart />
      <TemperatureVariabilityChart />
      <TemperatureSummaryCards/>
      <WindSpeedHistogram />
      <HumidityForecastLine/>
      <PressureForecastLine/>
      <HumidityTrendLine />
      <AirPressureTrendLine />
    </div>
  </div>
);

export default Insights;
