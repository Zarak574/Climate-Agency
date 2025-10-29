import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import '../css/Profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
    } catch (err) {
      localStorage.removeItem('token');
      navigate('/');
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="profile-card">
      <div className="profile-picture">
        <FontAwesomeIcon icon={faUser} className="profile-icon" />
      </div>
      <div className="profile-info">
        <div className="profile-field">
          <span className="profile-label">User ID:</span>
          <span className="profile-value">{user.id}</span>
        </div>
        <div className="profile-field">
          <span className="profile-label">Email:</span>
          <span className="profile-value">{user.email}</span>
        </div>
        <div className="profile-field">
          <span className="profile-label">Role:</span>
          <span className="profile-value">{user.role}</span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
