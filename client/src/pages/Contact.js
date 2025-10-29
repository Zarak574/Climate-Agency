// src/pages/Home.js
import React from "react";
import Navbar from "../components/Navbar";
import "../css/Home.css";
import Footer from "../components/Footer";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="home">
      <Navbar />
        <header className="home-header">
        <div className="overlay"></div>
        <div className="header-content">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you — get in touch with our team today.</p>
        </div>
      </header>
       <div className="contact-container">
      <div className="contact-left">
        <h2>GET IN TOUCH</h2>
        <div className="contact-detail">
          <FaPhoneAlt className="icon" />
          <span>+1 (123) 456-7890</span>
        </div>
        <div className="contact-detail">
          <FaEnvelope className="icon" />
          <span>support@example.com</span>
        </div>
        <div className="contact-detail">
          <FaMapMarkerAlt className="icon" />
          <span>123 Main St, Springfield</span>
        </div>
      </div>

      <div className="contact-right">
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
      <Footer/>
    </div>
  );
}
