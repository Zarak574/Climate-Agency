// src/components/AboutSection.js
import React from "react";
import { FaCloudSun } from "react-icons/fa";
import "../css/Home.css";

export default function AboutSection() {
  return (
    <section className="about-section">
      <div className="about-left">
        <p>
          EarthScape Climate Agency is dedicated to providing real-time environmental insights.
          We help individuals, communities, and organizations make informed decisions through accurate weather, rainfall, and temperature data visualizations.
        </p>
        <button className="about-btn">Learn More</button>
      </div>

      <div className="oval about-oval-bottom-right about-oval">
        <div className="oval-content">
          <h3 className="oval-heading">We strive to empower climate awareness through intelligent data.</h3>
          <FaCloudSun className="oval-icon" />
        </div>
      </div>
    </section>
  );
}
