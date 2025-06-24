import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../components/Layout/Layout';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/user/forgot-password', { email });
      setMessage(res.data.message);

      //  Navigate to /verify-otp and pass email in location state
      
      navigate('/verify-otp', { state: { email } });
    } catch (err) {
      setError(err.response?.data?.message || 'Error sending OTP');
    }
  };

  return (

<Layout>

    <form onSubmit={handleSendOtp} className="form-container">
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Send OTP</button>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </form>

</Layout>

  );
};

export default ForgotPassword;
