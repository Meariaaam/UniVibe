import { useEffect, useState } from 'react';
import axios from 'axios'; 
import './Users.css';
import Header from '../components/Header';
 
export default function Users() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/pending')
      .then(res => setUsers(res.data))
      .catch(err => {
        console.error(err);
        setMessage('❌ Could not load users');
      });
  }, []);

  const toggleVerification = (id, currentStatus) => {
    const newStatus = !currentStatus;

    axios.put(
      `http://localhost:5000/api/admin/verify/${id}`,
      { isVerified: newStatus },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    .then(() => {
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user._id === id ? { ...user, isVerified: newStatus } : user
        )
      );
      setMessage(`✅ User ${newStatus ? 'verified' : 'unverified'} successfully`);
    })
    .catch((error) => {
      console.error('Verification update failed:', error);
      setMessage('❌ Failed to update user verification');
    });
  };


  return (
    <div className="users-container"> 
      <Header />

      <main className="users-main">
        <h2 className="users-heading">User Verification Panel</h2>
        {message && <p className="users-message">{message}</p>}

        {users.length === 0 ? (
          <p className="users-empty">No users found.</p>
        ) : (
          <div className="users-grid">
            {users.map(user => (
              <div key={user._id} className="users-card">
                <p><strong>Name:</strong> {user.name || 'No name'} {user.surname || ''}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Status:</strong> {user.isVerified ? '✅ Verified' : '⏳ Pending'}</p>
                {user.mecenatImage && (
                  <img
                    src={`http://localhost:5000/${user.mecenatImage}`}
                    alt="Mecenat"
                    className="users-image"
                  />
                )}
                <br />
                <button
                  onClick={() => toggleVerification(user._id, user.isVerified)}
                  className={`users-button ${user.isVerified ? 'unverify' : 'verify'}`}
                >
                  {user.isVerified ? 'Unverify' : 'Verify'}
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
