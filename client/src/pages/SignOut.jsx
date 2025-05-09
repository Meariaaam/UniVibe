import React from 'react';
import './SignOut.css';
import { useNavigate } from 'react-router-dom';


const SignOut = () => {
  const navigate = useNavigate();
          navigate('/home'); //redirects to home when sign out


  return (
    <div className="signout-container">
      <div className="signout-box">
        <h1 className="signout-title">Sign out</h1>
        <p className="signout-message">You have signed out successfully</p>

      </div>
    </div>
  );
};

export default SignOut;
