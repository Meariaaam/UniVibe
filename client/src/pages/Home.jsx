import React, { useEffect, useState } from 'react'; //By Merjam Farj Al-Beibani
import { Link } from 'react-router-dom';
import logo from '../assets/uni.jpg';

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
    }, 6000); //change activity every 6 seconds
    return () => clearInterval(interval); // cleanup
  }, []);

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
          <h1 style={{ margin: 0 }}>UniVibe Activities</h1>
        </div>
        <nav>
          <ul style={{ display: 'flex', gap: '15px', listStyle: 'none', margin: 0 }}>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main style={{ padding: '100px 20px 20px' }}>
        <h2>Welcome to UniVibe 🎉</h2>
        <p>Find and join exciting student activities. Register and get verified with your Mecenat card.</p>
        <p><Link to="/register">Click here to register</Link> or explore more about UniVibe!</p>

        {/* Rotating Activity */}
        <div style={{
          marginTop: '30px',
          padding: '15px',
          background: '#e6e6e6',
          borderRadius: '10px',
          textAlign: 'center',
          fontSize: '1.2rem',
          transition: 'opacity 0.5s ease-in-out',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <strong>Upcoming: </strong>{activities[index]}
        </div>
      </main>
    </div>
  );
}
