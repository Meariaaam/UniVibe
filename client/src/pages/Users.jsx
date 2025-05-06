import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../assets/uni.jpg';
import './Users.css';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/pending')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  const verifyUser = (id) => {
    axios.put(`http://localhost:5000/api/admin/verify/${id}`)
      .then(() => {
        setUsers(users.filter(user => user._id !== id));
        setMessage('✅ User verified successfully');
      })
      .catch(() => setMessage('❌ Failed to verify user'));
  };

  return (
    <div className="users-container">
      {/* Header */}
      <header className="users-header">
        <div className="users-logo-box">
          <img src={logo} alt="UniVibe logo" className="users-logo" />
          <h1 className="users-title">UniVibe</h1>
        </div>
        <nav>
          <ul className="users-nav">
            <li><Link to="/admin">Admin Home</Link></li>
            <li><Link to="/signout">Sign out</Link></li>
          </ul>
        </nav>
      </header>

      <main className="users-main">
        <h2 className="users-heading">Pending User Verifications</h2>
        {message && <p className="users-message">{message}</p>}

        {users.length === 0 ? (
          <p className="users-empty">No users pending verification.</p>
        ) : (
          users.map(user => (
            <div key={user._id} className="users-card">
              <p>{user.name || 'No name'} ({user.email})</p>
              <img
                src={`http://localhost:5000/${user.mecenatImage}`}
                width="100"
                alt="Mecenat"
                className="users-image"
              />
              <button
                onClick={() => verifyUser(user._id)}
                className="users-button"
              >
                Verify
              </button>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
