import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import aboutIllustration from '../assets/UniVibeAbout.png';
import './About.css';


export default function About() {
  return (
    <div className="about-page">
      <Header />

      <main className="about-container">
        <section className="about-split">
          <div className="about-text">
            <h2>About UniVibe</h2>
            <p>
              UniVibe is a student-driven platform designed to enhance campus life by making it easy for students
              to discover, join, and host university activities. Our mission is to build stronger student communities.
            </p>
            <p>
              With a dual-role system, UniVibe gives admins the tools to verify student identities through Mecenat,
              manage events, and maintain a safe and fun environment.
            </p>
          </div>

          <div className="about-image">
            <img src={aboutIllustration} alt="Campus Life" onError={(e) => e.target.style.display = 'none'} />
          </div>
        </section>

        <section className="about-features">
  <div className="feature one">
    <h4>🎓 Verified Students</h4>
    <p>Only verified users can access events — using the Mecenat system.</p>
  </div>
  <div className="feature two">
    <h4>🛠️ Admin Managed</h4>
    <p>Admins approve activities, verify students, and keep the community clean.</p>
  </div>
  <div className="feature three">
    <h4>📅 Campus Engagement</h4>
    <p>Make friends, collaborate, and participate in what matters to you.</p>
    </div>
    </section>
    </main>
    </div>
  );
}
