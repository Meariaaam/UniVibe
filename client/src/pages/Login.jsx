// By Merjam Farj AL-Beibani
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/uni.jpg';
import './Login.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      setMessage('✅ ' + res.data.message);

      if (res.status === 200) {
        navigate('/activities');
      }
    } catch (err) {
      setMessage('❌ ' + (err.response?.data?.message || 'Login failed'));
    }
  };


  // By Sara Shmerti
  return (
    <div className="login-page">
    <><header className="navbar">
      <div className="logo-container">
        <img src={logo} alt="UniVibe logo" />
        <h1>UniVibe</h1>
      </div>
      <nav className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/register">Register</Link>
      </nav>
    </header>
    
    <main className="login-main">
        <div className="login-card">
          <h2>Welcome Back</h2>
          <p className="login-subtext">Log in to connect with your campus community.</p>
          <form onSubmit={handleSubmit} className="login-form">
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Login</button>
            <p className="login-message">{message}</p>
          </form>
          <p className="login-note">Don't have an account? <Link to="/register">Register here</Link>.</p>
        </div>
      </main>
    </>
    </div>
  );
}