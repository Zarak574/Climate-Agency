import React from "react";
import { FaCloudRain, FaTemperatureHigh, FaMapMarkedAlt } from "react-icons/fa";
import "../css/Home.css";

export default function OfferSection() {
  return (
    <section className="offer-section">
      <div className="offer-left">
        <h2 className="offer-title">What We Offer</h2>
        <p className="offer-description">
          Comprehensive climate insights for individuals, communities, and organizations.
        </p>
      </div>

      <div className="offer-right">
        <div className="offer-card">
          <FaCloudRain className="offer-icon" />
          <h3 className="card-title">Real-Time Weather</h3>
          <p className="card-text">
            Stay updated with accurate forecasts and alerts, tailored for your region.
          </p>
        </div>

        <div className="offer-card">
          <FaTemperatureHigh className="offer-icon" />
          <h3 className="card-title">Temperature Monitoring</h3>
          <p className="card-text">
            Track temperature trends to understand climate shifts and plan accordingly.
          </p>
        </div>

        <div className="offer-card">
          <FaMapMarkedAlt className="offer-icon" />
          <h3 className="card-title">Interactive Maps</h3>
          <p className="card-text">
            Visualize climate data with our intuitive, location-based map tools.
          </p>
        </div>
      </div>
    </section>
  );
}
