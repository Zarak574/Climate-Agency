import React from 'react';
import '../css/Home.css';
import detailImage from '../assets/weather.jpg'; // Replace with your image
import {  FaArrowRight } from "react-icons/fa"; 

const weatherItems = [
  'UV Index',
  'Wind Speed',
  'Sunrise & Set',
  'Humidity',
  'Visibility',
  'Air Speed',
];

const WeatherDetails = () => {
  return (
    <div className="weather-details-container">
      {/* Left Image Card */}
      <div className="weather-image-card">
        <img src={detailImage} alt="Weather Detail" className="image" />
      </div>

      {/* Right Text Content */}
      <div className="info-card">
        <h2 className="info-heading">Weather Metrics</h2>
        <ul className="info-list">
          {weatherItems.map((item, index) => (
            <li key={index} className="info-item">{item}</li>
          ))}
        </ul>
         <button className="cta-btn">
                  <span className="cta-text">Track The Climate</span>
                  <span className="cta-icon"><FaArrowRight /></span>
                </button>
      </div>
    </div>
  );
};

export default WeatherDetails;
