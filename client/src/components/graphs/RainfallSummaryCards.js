import React, { useEffect, useState } from "react";
import "../../css/RainfallSummaryCards.css"; // make sure to create this CSS file
import SpinnerImg from "../../assets/hot_1.png"; // replace with your spinner image
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudShowersHeavy,
  faTint,
  faWater,
  faChartArea,
//   faPercentage,
  faMapMarkedAlt,
} from "@fortawesome/free-solid-svg-icons";

const RainfallSummaryCards = () => {
  const [summary, setSummary] = useState(null);

  const formatNumber = (num, decimals = 2) => {
    const n = Number(num);
    return isNaN(n) ? "N/A" : n.toFixed(decimals);
  };

  useEffect(() => {
    fetch("http://localhost:8000/rainfall_summary_cards")
      .then((res) => res.json())
      .then((data) => setSummary(data))
      .catch((err) => console.error("Failed to fetch rainfall summary cards:", err));
  }, []);

  if (!summary) {
    return (
      <div className="summary-loading">
        <div className="spinner-with-logo">
          <img src={SpinnerImg} alt="Loading..." className="spinner-logo" />
        </div>
        <p>Loading rainfall summary cards...</p>
      </div>
    );
  }

  return (
    <div className="summary-cards-container">
      <Card
        title="Max Rainfall Recorded"
        value={`${formatNumber(summary.max_rainfall.value)} mm`}
        // subtitle={`Date: ${summary.max_rainfall.date}`}
        color="#0077b6"
        icon={faCloudShowersHeavy}
        iconClass="icon-max"
      />
      <Card
        title="Min Rainfall Recorded"
        value={`${formatNumber(summary.min_rainfall.value)} mm`}
        // subtitle={`Date: ${summary.min_rainfall.date}`}
        color="#00b4d8"
        icon={faTint}
        iconClass="icon-min"
      />
      <Card
        title="Average Rainfall"
        value={`${formatNumber(summary.average_rainfall)} mm`}
        color="#90e0ef"
        icon={faWater}
        iconClass="icon-average"
      />
      <Card
        title="Rainfall Std Dev"
        value={`${formatNumber(summary.rainfall_std_dev)} mm`}
        color="#48cae4"
        icon={faChartArea}
        iconClass="icon-stddev"
      />
      <Card
        title="Total Stations Reporting"
        value={summary.total_stations}
        color="#023e8a"
        icon={faMapMarkedAlt}
        iconClass="icon-stations"
      />
    </div>
  );
};

const Card = ({ title, value, subtitle, color, icon, iconClass }) => (
  <div className="summary-card" style={{ borderTop: `4px solid ${color}` }}>
    <div className="summary-card-icon-wrapper">
      {icon && <FontAwesomeIcon icon={icon} className={`summary-card-icon ${iconClass}`} />}
    </div>
    <div className="summary-card-content">
      <h3 className="summary-card-title">{title}</h3>
      <p className="summary-card-value">{value}</p>
      {subtitle && <p className="summary-card-subtitle">{subtitle}</p>}
    </div>
  </div>
);

export default RainfallSummaryCards;
