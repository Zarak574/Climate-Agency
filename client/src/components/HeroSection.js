// src/components/HeroSection.js
import React from "react";
import TopLeft from "../assets/rainy_3.jpg";
import BottomLeft from "../assets/satellite.png";
import TopRight from "../assets/map_1.jpg";
import BottomRight from "../assets/cold_weather.jpg";
import { FaCloudSun, FaThermometerHalf, FaGlobe, FaBolt, FaArrowRight } from "react-icons/fa";
import "../css/Home.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAsia } from '@fortawesome/free-solid-svg-icons';

export default function HeroSection() {
  return (
    <main className="hero-section">
      <div className="hero-left">
        <h1 className="hero-heading">
          {/* <FaGlobe className="hero-icon" /> */}
          <FontAwesomeIcon icon={faEarthAsia} className="hero-icon" />
          Real-Time Climate Intelligence
        </h1>
        <p className="hero-subtext">
          Empowering communities with data to navigate a changing climate.
        </p>
        <h2 className="hero-subheading">Monitoring Earth’s Pulse</h2>
        <p className="hero-description">
          Track local weather, rainfall, and temperature in real-time. Simple insights for smarter environmental decisions.
        </p>
        <button className="cta-btn">
          <span className="cta-text">Track The Climate</span>
          <span className="cta-icon"><FaArrowRight /></span>
        </button>
      </div>

      <div className="hero-right">
        <div className="hero-background-decor"></div>
        
        <div className="image-grid">
          <div className="image-card"><img src={TopLeft} alt="Weather" /></div>
          <div className="image-card"><img src={BottomLeft} alt="Map" /></div>
          <div className="image-card"><img src={TopRight} alt="Weather 2" /></div>
          <div className="image-card"><img src={BottomRight} alt="Map 2" /></div>
        </div>
        
        <div className="icon-stack">
          <FaCloudSun className="icon-item" />
          <FaThermometerHalf className="icon-item" />
          <FaGlobe className="icon-item" />
          <FaBolt className="icon-item" />
        </div>

        
      </div>
    </main>
  );
}
