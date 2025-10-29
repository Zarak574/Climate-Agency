import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function AdminRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token) return <Navigate to="/" />;

  try {
    const decoded = jwtDecode(token);
    return decoded.role === 'admin' ? children : <Navigate to="/admindashboard" />;
  } catch {
    return <Navigate to="/" />;
  }
}
