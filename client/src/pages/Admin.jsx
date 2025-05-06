import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/uni.jpg';
import './Admin.css';

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
      <header className="admin-header">
        <div className="admin-logo-box">
          <img src={logo} alt="UniVibe logo" className="admin-logo" />
          <h1 className="admin-title">UniVibe</h1>
        </div>
        <nav>
          <ul className="admin-nav">
            <li><Link to="/users">Users</Link></li>
            <li><Link to="/signout">Sign out</Link></li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="admin-main">
        <div className="admin-box">
          <button className="add-button" onClick={handleAddClick}>+</button>

          {showForm && (
            <form className="admin-form" onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Activity name" value={formData.name} onChange={handleChange} required />
              <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
              <input type="text" name="time" placeholder="Time" value={formData.time} onChange={handleChange} required />
              <input type="number" name="quantity" placeholder="Max participants" value={formData.quantity} onChange={handleChange} required />
              <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
              <button type="submit" className="save-button">Save Activity</button>
            </form>
          )}
        </div>

        <div className="activity-list">
          {activities.map((act, index) => (
            <div key={index} className="activity-card">
              <h3>{act.name}</h3>
              <p><strong>Address:</strong> {act.address}</p>
              <p><strong>Time:</strong> {act.time}</p>
              <p><strong>Max Students:</strong> {act.quantity}</p>
              <p><strong>Price:</strong> {act.price} SEK</p>
              <div className="activity-buttons">
                <button className="edit-button">Edit</button>
                <button className="remove-button" onClick={() => handleRemove(index)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
