import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../css/LoginPage.css";
import loginImage from "../assets/login.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaEnvelope, FaLock, FaFacebook, FaGoogle, FaApple } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    const validationErrors = {};
    if (!email) validationErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) validationErrors.email = "Invalid email format.";

    if (!password) validationErrors.password = "Password is required.";
    else if (password.length < 6) validationErrors.password = "Minimum 6 characters required.";

    return validationErrors;
  };

  // Helper to decode JWT token payload
  function parseJwt(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setServerError("");

    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
        const token = res.data.token;
        localStorage.setItem("token", token);

        const payload = parseJwt(token);
        if (!payload || !payload.role) {
          setServerError("Invalid token received");
          return;
        }

        if (payload.role === "admin") {
          navigate("/admin");
        } else if (payload.role === "analyst") {
          navigate("/analystdashboard");
        } else {
          setServerError("Unauthorized role");
        }
      } catch (err) {
        setServerError("Invalid credentials");
      }
    }
  };

  return (
    <>
      <Navbar />

      <main className="login-page">
        <div className="login-card center">
          <div className="login-content">
            <h2>Welcome Back!</h2>
            <p>Log in to continue monitoring the climate.</p>

            <form onSubmit={handleSubmit} className="form-container">
              <div className="input-group">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email ? "error" : ""}
                /><br />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="input-group">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className={errors.password ? "error" : ""}
                /><br />
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>
              <br />
              {serverError && <p style={{ color: "red", marginTop: "-5px" }}>{serverError}</p>}

              <div className="forgot-password">
                <Link to="/forgot-password">Forgot password?</Link>
              </div>

              <button type="submit" className="login-button">Login</button>

              <div className="signup-switch">
                <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
              </div>

              <div className="login-icon-stack">
                <button type="button" className="login-icon-link" title="Facebook">
                  <FaFacebook className="login-icon-item" />
                </button>
                <button type="button" className="login-icon-link" title="Google">
                  <FaGoogle className="login-icon-item" />
                </button>
                <button type="button" className="login-icon-link" title="Apple">
                  <FaApple className="login-icon-item" />
                </button>
              </div>
            </form>
          </div>

          <div className="login-image-wrapper">
            <div className="image-background">
              <img src={loginImage} alt="Climate Visualization" className="main-img-flipped" />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
