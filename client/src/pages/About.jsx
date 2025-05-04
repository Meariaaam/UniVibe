import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/uni.jpg';

export default function About() {
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
          <h1 style={{ margin: 0 }}>About UniVibe</h1>
        </div>
        <nav>
          <ul style={{ display: 'flex', gap: '15px', listStyle: 'none', margin: 0 }}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main style={{ padding: '80px 20px 20px' }}>
        <h2>Our Mission</h2>
        <p>
          UniVibe is a student-driven platform built to bring university students together through events,
          activities, and collaborations. Whether you're looking to make friends, join a study group,
          or attend fun social events, UniVibe is your go-to space!
        </p>

        <h3>How it works</h3>
        <ul>
          <li>📝 Register using your Mecenat card</li>
          <li>📧 Get verified and notified by email</li>
          <li>🎉 Start joining and hosting activities</li>
        </ul>

        <p>Have more questions? Contact us anytime!</p>
      </main>
    </div>
  );
}
