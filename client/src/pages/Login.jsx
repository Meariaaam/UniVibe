import { useState } from 'react'; // By Merjam Farj AL-Beibani
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

  return (
    <div>
      {/* Header */}
      <header className="login-header">
        <div className="login-logo-box">
          <img src={logo} alt="UniVibe logo" className="login-logo" />
          <h1 className="login-title">UniVibe</h1>
        </div>
        <nav>
          <ul className="login-nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </nav>
      </header>

      {/* Main */}
      <main className="login-main">
        <h2>Hello User!</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit">Login</button>
        </form>
        <p>{message}</p>
      </main>
    </div>
  );
}
