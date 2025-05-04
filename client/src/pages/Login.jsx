import { useState } from 'react'; //By Merjam Farj AL-Beibani
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../assets/uni.jpg';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      setMessage('✅ ' + res.data.message);

      if (response.status === 200) {
        setMessage('Login successful');

      }
    } catch (err) {
      setMessage('❌ ' + (err.response?.data?.message || 'Login failed'));
    }
  };

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

      {/* Main */}
      <main style={{ padding: '90px 20px 20px' }}>
        <h2>Hello User!</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required /><br />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required /><br /><br />
          <button type="submit">Login</button>
        </form>
        <p>{message}</p>
      </main>
    </div>
  );
}
