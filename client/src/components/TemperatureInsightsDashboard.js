import React from "react";
import TemperatureTrendsChart from "./graphs/TemperatureTrendsChart";
import AverageTempByStationChart from "./graphs/AverageTempByStationChart";
import TemperatureVariabilityChart from "./graphs/TemperatureVariabilityChart";
import "../css/TemperatureInsightsDashboard.css"; // Import CSS file
import TemperatureSummaryCards from "./graphs/TemperatureSummaryCards";

const TemperatureInsightsDashboard = () => (
  <div className="temp-dashboard-container">
    <h2 className="dashboard-heading">Temperature Insights</h2>
    <div className="temp-chart-wrapper">
      <TemperatureTrendsChart />
      <TemperatureVariabilityChart />
      <AverageTempByStationChart />
      <TemperatureSummaryCards/>

    </div>
  </div>
);

export default TemperatureInsightsDashboard;
