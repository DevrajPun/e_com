// src/pages/VerifyOtpPage.jsx

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../components/Layout/Layout';

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const stateEmail = location.state?.email;
    if (!stateEmail) {
      navigate('/forgot-pass');
    } else {
      setEmail(stateEmail);
    }
  }, [location, navigate]);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/user/verifyOtp', { email, otp });
      setMessage(res.data.message);
      navigate('/reset', { state: { email } });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (

    <Layout >
    <div className="form-container">
      <h2>Verify OTP</h2>
      <form onSubmit={handleVerifyOtp}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button type="submit">Verify</button>
      </form>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>

</Layout>

  );
};

export default VerifyOtp;
