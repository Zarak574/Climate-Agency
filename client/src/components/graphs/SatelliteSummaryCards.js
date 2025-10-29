import React, { useEffect, useState } from "react";
import "../../css/SatelliteSummaryCards.css"; // Create this CSS file
import SpinnerImg from "../../assets/hot_1.png"; // Your spinner image
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSatelliteDish,
  faSignal,
  faChartLine,
  // faGlobe,
  faDatabase,
} from "@fortawesome/free-solid-svg-icons";

const SatelliteSummaryCards = () => {
  const [summary, setSummary] = useState(null);

  const formatNumber = (num, decimals = 2) => {
    const n = Number(num);
    return isNaN(n) ? "N/A" : n.toFixed(decimals);
  };

  useEffect(() => {
    fetch("http://localhost:8000/satellite_summary_cards")
      .then((res) => res.json())
      .then((data) => setSummary(data))
      .catch((err) =>
        console.error("Failed to fetch satellite summary cards:", err)
      );
  }, []);

  if (!summary) {
    return (
      <div className="summary-loading">
        <div className="spinner-with-logo">
          <img src={SpinnerImg} alt="Loading..." className="spinner-logo" />
        </div>
        <p>Loading satellite summary cards...</p>
      </div>
    );
  }

  return (
    <div className="sat-summary-cards-container">
      <Card
        title="Max Satellite Imagery Index"
        value={formatNumber(summary.max_satellite_index.value)}
        // subtitle={`Date: ${summary.max_satellite_index.date}`}
        color="#1d3557"
        icon={faSatelliteDish}
        iconClass="sat-icon-max"
      />
      <Card
        title="Min Satellite Imagery Index"
        value={formatNumber(summary.min_satellite_index.value)}
        // subtitle={`Date: ${summary.min_satellite_index.date}`}
        color="#457b9d"
        icon={faSignal}
        iconClass="sat-icon-min"
      />
      <Card
        title="Average Satellite Index"
        value={formatNumber(summary.average_satellite_index)}
        color="#a8dadc"
        icon={faChartLine}
        iconClass="sat-icon-average"
      />
      <Card
        title="Satellite Index Std Dev"
        value={formatNumber(summary.satellite_index_stddev)}
        color="#457b9d"
        icon={faDatabase}
        iconClass="sat-icon-stddev"
      />
      {/* <Card
        title="Total Reporting Stations"
        value={summary.total_stations}
        color="#1d3557"
        icon={faGlobe}
        iconClass="sat-icon-stations"
      /> */}
    </div>
  );
};

const Card = ({ title, value, subtitle, color, icon, iconClass }) => (
  <div className="sat-summary-card" style={{ borderTop: `4px solid ${color}` }}>
    <div className="sat-summary-card-icon-wrapper">
      {icon && (
        <FontAwesomeIcon icon={icon} className={`sat-summary-card-icon ${iconClass}`} />
      )}
    </div>
    <div className="sat-summary-card-content">
      <h3 className="sat-summary-card-title">{title}</h3>
      <p className="sat-summary-card-value">{value}</p>
      {subtitle && <p className="sat-summary-card-subtitle">{subtitle}</p>}
    </div>
  </div>
);

export default SatelliteSummaryCards;
