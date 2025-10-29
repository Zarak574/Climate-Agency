import React from "react";
import TotalPrecipitationChart from "./graphs/TotalPrecipitationChart";
import RainfallVsPrecipChart from "./graphs/RainfallVsPrecipChart";
import RainfallDistributionPie from "./graphs/RainfallDistributionPie";
import RainfallForecastLine from "./graphs/RainfallForecastLine";
import "../css/PrecipitationDashboard.css"; 
import RainfallSummaryCards from "./graphs/RainfallSummaryCards";

const PrecipitationDashboard = () => {
  return (
    <div className="rain-dashboard-container">
      <h2 className="dashboard-heading">Precipitation & Rainfall Insights</h2>
      <div className="rain-chart-wrapper">
        <RainfallSummaryCards/>
        <RainfallVsPrecipChart />
        <RainfallDistributionPie />
        <TotalPrecipitationChart />
        <RainfallForecastLine />
      </div>
    </div>
  );
};

export default PrecipitationDashboard;
