import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../css/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserRole(decoded.role); // assuming your token has `role: "analyst"` or `role: "admin"`
      } catch (err) {
        console.error("Token decoding failed", err);
        localStorage.removeItem("token");
        setUserRole(null);
      }
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDashboardRedirect = () => {
    if (userRole === "admin") {
      navigate("/admin");
    } else if (userRole === "analyst") {
      navigate("/analystdashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-header">
        <button className="navbar-logo" onClick={() => navigate("/home")}>
          EarthScape
        </button>
        <button
          className={`nav-hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>

      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <button className="nav-btn" onClick={() => navigate("/home")}>
          Home
        </button>
        <button className="nav-btn" onClick={() => navigate("/about")}>
          About
        </button>
        <button className="nav-btn" onClick={() => navigate("/contact")}>
          Contact
        </button>
        {userRole ? (
          <button className="nav-btn login-btn" onClick={handleDashboardRedirect}>
            Dashboard
          </button>
        ) : (
          <button className="nav-btn login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
