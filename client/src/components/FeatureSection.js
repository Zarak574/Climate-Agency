import React from 'react';
import '../css/Home.css';
import { FaThermometerHalf, FaCloud, FaBroadcastTower, FaCheckCircle } from 'react-icons/fa';
import bigCardImage from '../assets/rainy_weather_2.jpeg'; 
import image1 from '../assets/summer.jpg';
import image2 from '../assets/global_2.jpg';
import image3 from '../assets/global.jpg';
import image4 from '../assets/satellite.png';

const features = [
  {
    icon: <FaThermometerHalf />,
    title: '32.30 °C',
    subtitle: 'Average Temperature',
    borderColor: '#ffb433',
    image: image1,
  },
  {
    icon: <FaCloud />,
    title: '397.92 ppm',
    subtitle: 'Average CO₂ Level',
    borderColor: '#b4ebe6',
    image: image2,
  },
  {
    icon: <FaBroadcastTower />,
    title: '4.00',
    subtitle: 'Weather Stations',
    borderColor: '#004574',
    image: image3,
  },
  {
    icon: <FaCheckCircle />,
    title: '0.85',
    subtitle: 'Sensor Reliability',
    borderColor: '#80CBC4',
    image: image4,
  },
];

const FeatureCards = () => {
  return (
    <div className="feature-section">
      <div className="left-cards">
        {features.map((feature, index) => (
          <div
            key={index}
            className="feature-card"
            style={{
              borderTop: `5px solid ${feature.borderColor}`,
              backgroundImage: `url(${feature.image})`,
            }}
          >
            <div className="feature-overlay">
              <div className="feature-icon">{feature.icon}</div>
              <h4 className="feature-title">{feature.title}</h4>
              <p className="feature-subtitle">{feature.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="big-card">
        <img src={bigCardImage} alt="Weather Highlight" className="big-card-image" />
        <div className="big-card-overlay">
          <h3 className="big-card-title">125360.81 mm</h3>
          <p className="big-card-subtitle">Weather Highlight: Total Rainfall</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCards;
