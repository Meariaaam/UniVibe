// By Merjam Farj Al-Beibani
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/uni.jpg';
import './Home.css'; // Import the CSS file

export default function Home() {
  const activities = [
    '📚 Study group at the library',
    '🎉 Uni party this Friday!',
    '🎨 Art exhibition next week',
    '🏀 Basketball tournament today',
    '🎤 Open mic night coming soon'
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % activities.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentDate = new Date().toLocaleDateString('en-EN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });


  // By Sara Shmerti

  return (
    <>
      <header className="navbar">
        <div className="container navbar-inner">
          <div className="logo-container">
            <img src={logo} alt="UniVibe logo" />
            <h1>UniVibe</h1>
          </div>
          <div className="nav-links">
            <Link to="/home">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </div>
      </header>

      <div className="page-wrapper">
        <main className="container">
          <section className="intro">
            <h2>Connecting Campus Life</h2>
            <p>Where students meet and grow - together.</p>

            <section className="rotating-activity">
              <div className="activity-date">
                {currentDate.charAt(0).toUpperCase() + currentDate.slice(1)}
              </div>
              <strong>Upcoming: </strong>{activities[index]}
            </section>
          </section>

          <section className="how-it-works">
            <h3>How it works</h3>
            <div className="cards">
              <div className="card blue">
                <span role="img" aria-label="Register">📝</span>
                <h4><Link to="/register">Register</Link></h4>
                <p>Use your Mecenat card to join</p>
              </div>
              <div className="card green">
                <span role="img" aria-label="Verify">📧</span>
                <h4>Get Verified</h4>
                <p>We'll notify you via email.</p>
              </div>
              <div className="card red">
                <span role="img" aria-label="Event">🎉</span>
                <h4>Join Events</h4>
                <p>Start participating or hosting!</p>
              </div>
            </div>
          </section>

          <section className="help">
            <h4>Need Help?</h4>
            <p>
              Reach out via our <Link to="/contact">contact page</Link> and we'll get back to you quickly.
            </p>
          </section>
        </main>
      </div>
    </>
  );
}