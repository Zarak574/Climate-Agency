
import React, { useEffect, useState } from "react";
import "../../css/kpis.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThermometerHalf, faCloudRain, faWind, faTachometerAlt, faChartLine } from "@fortawesome/free-solid-svg-icons";

const AggregatedKPIs = () => {
  const [kpis, setKpis] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/aggregated_kpis")
      .then((res) => res.json())
      .then((data) => {
        console.log("KPIs:", data);
        setKpis(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const formatNumber = (num) => {
    const n = Number(num);
    return isNaN(n) ? "N/A" : n.toFixed(2);
  };

  if (loading) return <div>Loading KPIs...</div>;
  if (error) return <div>Error loading KPIs: {error}</div>;

  return (
    <div className="kpi-cards">
      <Card
        title="Average Temperature"
        value={`${formatNumber(kpis.avg_temp)} °C`}
        icon={faThermometerHalf}
      />
      <Card
        title="Total Rainfall"
        value={`${formatNumber(kpis.total_rainfall)} mm`}
        icon={faCloudRain}
      />
      <Card
        title="Average CO2 Level"
        value={`${formatNumber(kpis.avg_co2)} ppm`}
        icon={faWind}
      />
      <Card
        title="Number of Weather Stations"
        value={formatNumber(kpis.num_stations)}
        icon={faTachometerAlt}
      />
      <Card
        title="Average Sensor Reliability"
        value={formatNumber(kpis.avg_sensor_reliability)}
        icon={faChartLine}
      />
    </div>
  );
};

const Card = ({ title, value, icon }) => (
  <div className="kpi-card">
    <div className="kpi-card-icon-wrapper">
      {icon && <FontAwesomeIcon icon={icon} className="kpi-card-icon" />}
    </div>
    <div className="kpi-card-content">
      <h3 className="kpi-card-title">{title}</h3>
      <p className="kpi-card-value">{value}</p>
    </div>
  </div>
);

export default AggregatedKPIs;