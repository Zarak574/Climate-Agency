import React, { useEffect, useState } from "react";
import '../css/AlertList.css';

const AlertList = () => {
  const [alerts, setAlerts] = useState([]);

  const fetchAlerts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/alerts");
      console.log("Response status:", res.status);
      const data = await res.json();
      console.log("Data:", data);
      setAlerts(data);
    } catch (error) {
      console.error("Error fetching alerts:", error);
    }
  };

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 30000); // Auto-refresh every 30s
    return () => clearInterval(interval);
  }, []);

  return (
  <div className="alert-container">
    <h2 className="alert-title">🚨 Climate Alerts</h2>

    {alerts.length === 0 ? (
      <p className="alert-empty">No alerts yet.</p>
    ) : (
      <div className="alert-grid">
        {alerts.map((alert, index) => (
          <div className="alert-card" key={index}>
            <h3 className="alert-heading">Anomaly Detected</h3>
            <p><strong>Year:</strong> {alert.year}</p>
            <p><strong>Temperature:</strong> {alert.temperature} °C</p>
            {alert.Date && (
              <p className="alert-date"><strong>Date:</strong> {new Date(alert.Date).toLocaleDateString()}</p>
            )}
            {alert.createdAt && (
              <p className="alert-time"><strong>Recorded:</strong> {new Date(alert.createdAt).toLocaleString()}</p>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
);

};

export default AlertList;
