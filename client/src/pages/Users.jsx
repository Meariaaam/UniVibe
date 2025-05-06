import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../assets/uni.jpg';

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
    <div>
      {/* Header */}
      <header>
        <div>
          <img src={logo} alt="UniVibe logo" />
          <h1>UniVibe</h1>
        </div>
        <nav>
          <ul>
            <li><Link to="/admin">Admin Home</Link></li>
            <li><Link to="/signout">Sign out</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <h2>Pending User Verifications</h2>
        {message && <p>{message}</p>}

        {users.length === 0 ? (
          <p>No users pending verification.</p>
        ) : (
          users.map(user => (
            <div key={user._id}>
              <p>{user.name || 'No name'} ({user.email})</p>
              <img src={`http://localhost:5000/${user.mecenatImage}`} width="100" alt="Mecenat" />
              <button onClick={() => verifyUser(user._id)}>Verify</button>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
