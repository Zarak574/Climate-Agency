import React from 'react';
import '../css/Home.css'; 
import image1 from "../assets/rainy_3.jpg";
import image2 from "../assets/summer_1.jpg";
import image3 from "../assets/rainy_weather.jpeg";
import image4 from "../assets/cold_weather.jpg";
import { FaGlobeAmericas } from 'react-icons/fa'; // 🌍 Icon

const cards = [
  { id: 1, title: 'Africa', image: image1 },
  { id: 2, title: 'Asia', image: image2 },
  { id: 3, title: 'Europe', image: image3 },
  { id: 4, title: 'North America', image: image4 },
];

const WaveCards = () => {
  return (
    <div className='region-section'>
      <div className="region-header">
        <FaGlobeAmericas className="region-icon" />
        <h2 className="region-title">Explore the Regions</h2>
        <p className="region-subtitle">Discover weather patterns across continents</p>
      </div>

      <div className="region-component">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`region ${index % 2 === 0 ? 'up' : 'down'}`}
          >
            <img src={card.image} alt={card.title} className="region-image" />
            <div className="region-text">{card.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WaveCards;
