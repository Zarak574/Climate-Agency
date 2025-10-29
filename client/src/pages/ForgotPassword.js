import React, { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/reset-request', { email });
      setStatus('Reset link sent to your email.');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setStatus(err.response.data.message);
      } else {
        setStatus('Failed to send reset link.');
      }
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      <p>{status}</p>
    </div>
  );
}

export default ForgotPassword;
