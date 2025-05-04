import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/uni.jpg';

export default function Home() {
  return (
    <div>
      {/* Header */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 20px',
        backgroundColor: '#f2f2f2',
        position: 'fixed',   
        top: 0,             
        left: 0,            
        right: 0,            
        zIndex: 1000,    
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="UniVibe logo" style={{ height: '50px', marginRight: '10px' }} />
          <h1 style={{ margin: 0 }}>UniVibe</h1>
        </div>
        <nav>
          <ul style={{ display: 'flex', gap: '15px', listStyle: 'none', margin: 0 }}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main style={{ padding: '70px 20px 20px' }}> {/* Add padding-top to offset the fixed header */}
        <h2>Welcome to UniVibe 🎉</h2>
        <p>Find and join exciting student activities. Register and get verified with your Mecenat card.</p>
        <p><Link to="/register">Click here to register</Link> or explore more about UniVibe!</p>
      </main>
    </div>
  );
}
