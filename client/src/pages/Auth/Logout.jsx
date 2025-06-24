import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear session data (token, user info, etc.)
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // You can also clear cookies or Redux state here if used

    // Redirect to login page
  toast.success("Logged out successfully");
    navigate("/login");
  }, [navigate]);
  return (
    <div className="form-container">
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
