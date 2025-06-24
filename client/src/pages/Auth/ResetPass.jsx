import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../components/Layout/Layout';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Load email from location state
  useEffect(() => {
    const stateEmail = location.state?.email;
    if (!stateEmail) {
      navigate('/forgot-password'); // Redirect if no email
    } else {
      setEmail(stateEmail);
    }
  }, [location, navigate]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/user/reset-password', {
        email,
        newPassword,
        confirmPassword,
      });
      setMessage(res.data.message);
      navigate('/login', { state: { email } });
    } catch (err) {
      setError(err.response?.data?.message || 'Error resetting password');
    }
  };

  return (

<Layout>

    <form onSubmit={handleResetPassword} className="form-container">
      <h2>Reset Password</h2>
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        required
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        required
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button type="submit">Reset Password</button>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </form>

    </Layout>
  );
};

export default ResetPassword;
