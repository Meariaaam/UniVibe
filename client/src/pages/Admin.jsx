import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/uni.jpg';

export default function Admin() {
  const [showForm, setShowForm] = useState(false);
  const [activities, setActivities] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    time: '',
    quantity: '',
    price: ''
  });

  const handleAddClick = () => setShowForm(!showForm);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setActivities([...activities, formData]);
    setFormData({ name: '', address: '', time: '', quantity: '', price: '' });
    setShowForm(false);
  };

  const handleRemove = (index) => {
    const updated = [...activities];
    updated.splice(index, 1);
    setActivities(updated);
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
        top: 0, left: 0, right: 0,
        zIndex: 1000,
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="UniVibe logo" style={{ height: '50px', marginRight: '10px' }} />
          <h1 style={{ margin: 0 }}>UniVibe</h1>
        </div>
        <nav>
          <ul style={{ display: 'flex', gap: '15px', listStyle: 'none', margin: 0 }}>
            <li><Link to="/users">Users</Link></li>
            <li><Link to="/signout">Sign out</Link></li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main style={{
  height: '100vh',
  width: '100vw',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '80px',
  boxSizing: 'border-box',
  backgroundColor: '#ffffff',
  overflowY: 'auto'
}}>
  {/* Box for Add Button and Form */}
  <div style={{
    backgroundColor: '#ffffff',
    padding: '30px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    minWidth: '350px',
    textAlign: 'center',
  }}>
    <button
      onClick={handleAddClick}
      style={{
        fontSize: '24px',
        padding: '5px 15px',
        borderRadius: '50%',
        border: 'none',
        backgroundColor: '#28a745',
        color: '#fff',
        cursor: 'pointer',
        marginBottom: '10px'
      }}
    >+</button>

    {showForm && (
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
        <input type="text" name="name" placeholder="Activity name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <input type="text" name="time" placeholder="Time" value={formData.time} onChange={handleChange} required />
        <input type="number" name="quantity" placeholder="Max participants" value={formData.quantity} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
        <button type="submit" style={{ padding: '8px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}>
          Save Activity
        </button>
      </form>
    )}
  </div>

  {/* Activities List */}
  <div style={{
    marginTop: '30px',
    width: '500px',
    maxHeight: '400px',
    overflowY: 'auto'
  }}>
    {activities.map((act, index) => (
      <div key={index} style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '15px',
        backgroundColor: '#f9f9f9'
      }}>
        <h3>{act.name}</h3>
        <p><strong>Address:</strong> {act.address}</p>
        <p><strong>Time:</strong> {act.time}</p>
        <p><strong>Max Students:</strong> {act.quantity}</p>
        <p><strong>Price:</strong> {act.price} SEK</p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ backgroundColor: '#ffc107', padding: '5px 10px', border: 'none', borderRadius: '5px', color: '#000' }}>Edit</button>
          <button onClick={() => handleRemove(index)} style={{ backgroundColor: '#dc3545', padding: '5px 10px', border: 'none', borderRadius: '5px', color: '#fff' }}>Remove</button>
        </div>
      </div>
    ))}
  </div>
</main>
    </div>
  );
}
