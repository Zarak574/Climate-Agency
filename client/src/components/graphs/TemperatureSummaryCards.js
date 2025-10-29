import React, { useEffect, useState } from "react";
import "../../css/TemperatureSummaryCards.css";
import SpinnerImg from "../../assets/hot_1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTemperatureHigh, faTemperatureLow, faThermometerHalf, faChartLine, faWind, faTachometerAlt } from "@fortawesome/free-solid-svg-icons";


const TemperatureSummaryCards = () => {
  const [summary, setSummary] = useState(null);
  const formatNumber = (num, decimals = 2) => {
  const n = Number(num);
  return isNaN(n) ? "N/A" : n.toFixed(decimals);
};

  useEffect(() => {
    fetch("http://localhost:8000/summary_cards")
      .then((res) => res.json())
      .then((data) => setSummary(data))
      .catch((err) => console.error("Failed to fetch summary cards:", err));
  }, []);

  if (!summary) {
    return (
      <div className="summary-loading">
        <div className="spinner-with-logo">
          <img src={SpinnerImg} alt="Loading..." className="spinner-logo" />
        </div>
        <p>Loading summary cards...</p>
      </div>
    );
  }

  return (
    <div className="temp-summary-cards-container">
<Card
  title="Max Temperature Recorded"
  value={`${summary.max_temperature.value} °C`}
  color="#db5800"
  icon={faTemperatureHigh}
  iconClass="temp-icon-max"
/>
<Card
  title="Min Temperature Recorded"
  value={`${summary.min_temperature.value} °C`}
  color="#00e9d5"
  icon={faTemperatureLow}
  iconClass="temp-icon-min"
/>
<Card
  title="Average Max Temperature"
  value={`${formatNumber(summary.average_max_temperature)} °C`}
  color="#f19900"
  icon={faTachometerAlt}
  iconClass="temp-icon-avg-max"
/>
<Card
  title="Average Min Temperature"
  value={`${formatNumber(summary.average_min_temperature)} °C`}
  color="#009688"
  icon={faThermometerHalf}
  iconClass="temp-icon-avg-min"
/>
<Card
  title="Overall Average Temperature"
  value={`${formatNumber(summary.average_temperature)} °C`}
  color="#00bba8"
  icon={faChartLine}
  iconClass="temp-icon-overall"
/>
<Card
  title="Temperature Variability (Mean ± SD)"
  value={`${formatNumber(summary.temperature_variability.mean)} ± ${formatNumber(summary.temperature_variability.sd)} °C`}
  color="#ffb433"
  icon={faWind}
  iconClass="temp-icon-variability"
/>

      
    </div>
  );
};

const Card = ({ title, value, subtitle, color, icon, iconClass }) => (
  <div className="temp-summary-card" style={{ borderTop: `4px solid ${color}` }}>
    <div className="temp-summary-card-icon-wrapper">
      {icon && <FontAwesomeIcon icon={icon} className={`summary-card-icon ${iconClass}`} />}
    </div>
    <div className="temp-summary-card-content">
      <h3 className="temp-summary-card-title">{title}</h3>
      <p className="temp-summary-card-value">{value}</p>
      {subtitle && <p className="temp-summary-card-subtitle">{subtitle}</p>}
    </div>
  </div>
);




export default TemperatureSummaryCards;
