import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Admin() {
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
