import React from "react";
import GeospatialInsights from "./graphs/GeospatialInsights";
import '../css/Station.css';

const StationRegional = () => {
  return (
      <div className="station-dashboard-container">
        <h2 className="dashboard-heading">Regional Stations</h2>
        <div className="staion-chart-wrapper">
      <GeospatialInsights />
    </div>
    </div>
  );
};

export default StationRegional;
