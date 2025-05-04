import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../assets/uni.jpg';

export default function Register() {
  const [form, setForm] = useState({
    fullname: '',
    surname: '',
    email: '',
    phone: '',
    password: '',
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fullname', form.fullname);
    formData.append('surname', form.surname);
    formData.append('email', form.email);
    formData.append('phone', form.phone);
    formData.append('password', form.password);
    if (file) formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      setMessage('✅ Registered! Waiting for verification.');
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMessage('❌ Error: ' + (err.response?.data?.message || err.message));
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
            <li><Link to="/about">About</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>
      </header>

      {/* Form */}
      <main style={{ padding: '90px 20px 20px' }}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input type="text" name="fullname" placeholder="Full Name" onChange={handleChange} required /><br />
          <input type="text" name="surname" placeholder="Surname" onChange={handleChange} required /><br />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required /><br />
          <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} required /><br />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required /><br />
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} required /><br />
          <button type="submit">Register</button>
        </form>
        <p>{message}</p>
      </main>
    </div>
  );
}
