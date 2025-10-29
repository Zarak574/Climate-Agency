import React from "react";
import SatelliteImageryIndexChart from "./graphs/SatelliteImageryIndexChart";
import WeatherStationScoresChart from "./graphs/WeatherStationScoresChart";
import SensorReliabilityChart from "./graphs/SensorReliabilityChart";
import "../css/SatelliteSensor.css"; 
import SatelliteSummaryCards from "./graphs/SatelliteSummaryCards";

const DataQualitySensorHealth = () => {
  return (
    <div className="sat-dashboard-container">
        <h2 className="dashboard-heading">Satellite Trends</h2>
        <div className="sat-chart-wrapper">
          <SensorReliabilityChart />
          <SatelliteSummaryCards/>
          <SatelliteImageryIndexChart />
          <WeatherStationScoresChart />
      </div>
    </div>
  );
};

export default DataQualitySensorHealth;
