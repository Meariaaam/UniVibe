import React, { useState } from 'react';

import Header from '../components/Header';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('message', formData.message);
    if (file) data.append('attachment', file);

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('✅ Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
        setFile(null);
      } else {
        setStatus(`❌ Error: ${result.error}`);
      }
    } catch (error) {
      console.error(error);
      setStatus('❌ Failed to send message.');
    }
  };

  return (
    <>
      <Header />

      <div className="contact-container">
        <h2>Contact Us</h2>
        <form className="contact-form" onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            name="attachment"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.txt"
          />
          <button type="submit">Send Message</button>
        </form>
        {status && <p className="status-message">{status}</p>}
      </div>
    </>
  );
};

export default ContactUs;
