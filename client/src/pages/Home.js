// src/pages/Home.js
import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import "../css/Home.css";
import OfferSection from "../components/OfferSection";
import Footer from "../components/Footer";
import WaveCards from "../components/WaveCards";
import FeatureCards from "../components/FeatureSection";
import WeatherDetails from "../components/WeatherDetails";

export default function Home() {
  return (
    <div className="home">
      <Navbar />
      <HeroSection />
      <OfferSection/>
      <FeatureCards/>
      <WaveCards/>
      <WeatherDetails/>
      <Footer/>
    </div>
  );
}
