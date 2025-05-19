import { useState } from 'react'; 
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../assets/uni.jpg';
import './Register.css';
import Header from '../components/Header';


export default function Register() {
  const [form, setForm] = useState({
    name: '',
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
    formData.append('name', form.name); 
    formData.append('surname', form.surname);
    formData.append('email', form.email);
    formData.append('phone', form.phone);
    formData.append('password', form.password);
    if (file) formData.append('file', file);

    try {
      const res = await axios.post('https://univibe-05vi.onrender.com/api/auth/register', formData);
      setMessage('✅ Registered! Waiting for verification.');
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMessage('❌ Error: ' + (err.response?.data?.message || err.message));
    }
  };


  return (
    <div>
      {/* Header */}
      <Header />

      {/* Register Form */}

      <main className="register-main">
        <div className="register-card">
          <h2>Create Account</h2>
          <p className="register-subtext">Join the UniVibe campus community.</p>

          <form onSubmit={handleSubmit} encType="multipart/form-data" className="register-form">
            <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
            <input type="text" name="surname" placeholder="Surname" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} required />
            <button type="submit">Register</button>
            <p className="register-subtext">Already have an account? <Link to="/login">Login here.</Link></p>
          </form>
 
          <p className="register-message">{message}</p>
        </div>
      </main>
      </div>
  );
}

