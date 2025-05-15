import React, { useEffect, useState } from 'react';
import './SignOut.css';
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  useEffect(() => {
    // 1. Clear user from localStorage
    localStorage.removeItem('user');

    // 2. Show message
    setMessage('✅ You have signed out successfully.');

    // 3. Wait 5 seconds and redirect to /home
    const timer = setTimeout(() => {
      navigate('/home');
    }, 2000); // 2 seconds

    // Cleanup timer if component unmounts
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="signout-container">
      <div className="signout-box">
        <h1 className="signout-title">Sign Out</h1>
        <p className="signout-message">{message}</p>
      </div>
    </div>
  );
};

export default SignOut;
