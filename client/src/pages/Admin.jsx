import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/uni.jpg';
import './Admin.css';

export default function Admin() {
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [activities, setActivities] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    time: '',
    quantity: '',
    price: ''
  });

  // Fetch all activities when component mounts
  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/activities');
      const data = await response.json();
      setActivities(data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  const handleAddClick = () => {
    setShowForm(!showForm);
    setFormData({ name: '', address: '', time: '', quantity: '', price: '' });
    setEditingIndex(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const correctedData = {
      ...formData,
      quantity: parseInt(formData.quantity),
      price: parseFloat(formData.price)
    };
  
    try {
      let response;
      if (editingIndex !== null) {
        // Update existing activity
        const id = activities[editingIndex]._id;
        response = await fetch(`http://localhost:5000/api/activities/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(correctedData)
        });
      } else {
        // Create new activity
        response = await fetch('http://localhost:5000/api/activities', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(correctedData)
        });
      }
  
      if (response.ok) {
        const result = await response.json();
        if (editingIndex !== null) {
          const updated = [...activities];
          updated[editingIndex] = result;
          setActivities(updated);
          alert('Aktiviteten har uppdaterats!');
        } else {
          setActivities([...activities, result]);
          alert('Aktiviteten har sparats!');
        }
  
        setFormData({ name: '', address: '', time: '', quantity: '', price: '' });
        setShowForm(false);
        setEditingIndex(null);
      } else {
        const errorData = await response.json();
        alert('Något gick fel: ' + errorData.message);
      }
    } catch (error) {
      console.error('Nätverksfel:', error);
      alert('Kunde inte spara aktiviteten.');
    }
  };  

  const handleEdit = (index) => {
    setFormData(activities[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleRemove = async (index) => {
    const activityToDelete = activities[index];
    try {
      await fetch(`http://localhost:5000/api/activities/${activityToDelete._id}`, {
        method: 'DELETE',
      });

      const updated = [...activities];
      updated.splice(index, 1);
      setActivities(updated);

      if (editingIndex === index) {
        setShowForm(false);
        setEditingIndex(null);
      }
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
  };

  return (
    <div>
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
              <button type="submit" className="save-button">
                {editingIndex !== null ? 'Update Activity' : 'Save Activity'}
              </button>
            </form>
          )}
        </div>

        <div className="activity-list">
          {activities.map((act, index) => (
            <div key={act._id} className="activity-card">
              <h3>{act.name}</h3>
              <p><strong>Address:</strong> {act.address}</p>
              <p><strong>Time:</strong> {act.time}</p>
              <p><strong>Max Students:</strong> {act.quantity}</p>
              <p><strong>Price:</strong> {act.price} SEK</p>
              <div className="activity-buttons">
                <button className="edit-button" onClick={() => handleEdit(index)}>Edit</button>
                <button className="remove-button" onClick={() => handleRemove(index)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
