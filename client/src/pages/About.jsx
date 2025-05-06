import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/uni.jpg';
import './About.css';

export default function About() {
  return (
    <div>
      {/* Header */}
      <header className="about-header">
        <div className="about-logo-box">
          <img src={logo} alt="UniVibe logo" className="about-logo" />
          <h1 className="about-title">About UniVibe</h1>
        </div>
        <nav>
          <ul className="about-nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="about-main">
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
