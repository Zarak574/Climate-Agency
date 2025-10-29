// src/pages/Home.js
import React from "react";
import Navbar from "../components/Navbar";
import "../css/Home.css";
import OfferSection from "../components/OfferSection";
import Footer from "../components/Footer";
import WaveCards from "../components/WaveCards";
import FeatureCards from "../components/FeatureSection";
import WeatherDetails from "../components/WeatherDetails";

export default function About() {
  return (
    <div className="home">
      <Navbar />
      <header className="home-header">
        <div className="overlay"></div>
        <div className="header-content">
          <h1>About Us</h1>
          <p>Your reliable source for weather updates and forecasts</p>
        </div>
      </header>
      <OfferSection/>
      <FeatureCards/>
      <WaveCards/>
      <WeatherDetails/>
      <Footer/>
    </div>
  );
}
