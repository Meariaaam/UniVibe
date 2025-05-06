import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../assets/uni.jpg';
import React from 'react';

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/pending')
      .then(res => setUsers(res.data));
  }, []);

  const verifyUser = (id) => {
    axios.put(`http://localhost:5000/api/admin/verify/${id}`)
      .then(() => setUsers(users.filter(user => user._id !== id)));
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
            <li><Link to="/about">Users</Link></li>
            <li><Link to="/signout">Sign out</Link></li>
          </ul>
        </nav>
      </header>


      <h2>Pending Verifications</h2>
      {users.map(user => (
        <div key={user._id}>
          <p>{user.username} ({user.email})</p>
          <img src={`http://localhost:5000${user.mecenatImage}`} width="100" />
          <button onClick={() => verifyUser(user._id)}>Verify</button>
        </div>
      ))}
    </div>
  );
}
