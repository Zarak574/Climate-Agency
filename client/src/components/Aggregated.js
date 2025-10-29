import React from "react";
import AggregatedKPIs from "./graphs/AggregatedKPIs";
import RainfallSummaryCards from "./graphs/RainfallSummaryCards";
import SatelliteSummaryCards from "./graphs/SatelliteSummaryCards";
import TemperatureSummaryCards from "./graphs/TemperatureSummaryCards";
import '../css/Aggregated.css';

const Aggregated = () => {
  return (
    <div className="aggregated-container">
      <AggregatedKPIs />
      <SatelliteSummaryCards/>
      <TemperatureSummaryCards/>
      <RainfallSummaryCards/>
    </div>
  );
};

export default Aggregated;