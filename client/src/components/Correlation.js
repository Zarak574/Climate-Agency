import React from "react";
import CorrelationHeatmap from "./graphs/CorrelationHeatmap";
import ForecastChart from "./graphs/ForecastChart";
import TemperatureTrend from "./graphs/TemperatureTrend";
import "../css/Correlation.css"; 

const Correlation = () => {
  return (
    <div className="corr-dashboard-container">
        <h2 className="dashboard-heading">Correlation Insights</h2>
        <div className="corr-chart-wrapper">
          <ForecastChart />
          <CorrelationHeatmap />
          <TemperatureTrend />
        </div>
    </div>
  );
};

export default Correlation;
