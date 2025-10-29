import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { password });
      setStatus('Password updated successfully!');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setStatus('Reset failed. Token might be invalid or expired.');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      <p>{status}</p>
    </div>
  );
}

export default ResetPassword;
