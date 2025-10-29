
import React, { useState } from "react";
import "../css/LoginPage.css";
import loginImage from "../assets/register_2.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

import axios from "axios";
import {
  FaEnvelope,
  FaLock,
  FaFacebook,
  FaGoogle,
  FaApple
} from "react-icons/fa";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "analyst"
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let validationErrors = {};

    if (!form.email) validationErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      validationErrors.email = "Invalid email format.";

    if (!form.password) validationErrors.password = "Password is required.";
    else if (form.password.length < 6)
      validationErrors.password = "Minimum 6 characters required.";

    return validationErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios.post("http://localhost:5000/api/auth/register", form);
        alert("User registered successfully! Please log in.");
        // Optional: Redirect to login
        // window.location.href = "/loginpage";
      } catch (err) {
        console.error(err.response?.data || err.message);
        alert(err.response?.data?.message || "Registration failed");
      }
    }
  };

  return (
       <>
          <Navbar />
    
    <main className="login-page reg">
      <div className="login-card center">
        <div className="login-content">
          <h2>Create Your Account!</h2>
          <p>Setting up your account takes less than a minute.</p>

          <form onSubmit={handleSubmit} className="form-container">
            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
              /><br />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className={errors.password ? "error" : ""}
              /><br />
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>

            <div className="input-group">
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="custom-select"
              >
                <option value="analyst">Analyst</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button type="submit" className="login-button">
              Register
            </button>

            <div className="signup-switch">
  <p>
    Already have an account?
    <Link to="/login">Sign In</Link>
  </p>
</div>

<div className="login-icon-stack">
  <Link to="#" className="login-icon-link" title="Facebook">
    <FaFacebook className="login-icon-item" />
  </Link>
  <Link to="#" className="login-icon-link" title="Google">
    <FaGoogle className="login-icon-item" />
  </Link>
  <Link to="#" className="login-icon-link" title="Apple">
    <FaApple className="login-icon-item" />
  </Link>
</div>

          </form>
        </div>

        <div className="register-image-wrapper">
          <div className="reg-image-background">
            <img
              src={loginImage}
              alt="Register Visual"
              className="reg-main-img-flipped"
            />
          </div>
        </div>
      </div>
    </main>
       <Footer />
    </>
  );
}
