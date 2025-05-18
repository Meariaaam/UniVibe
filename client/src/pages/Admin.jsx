import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/uni.jpg';
import './Admin.css';
import Header from '../components/Header';
 


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

  const [selectedBookings, setSelectedBookings] = useState([]);
  const [showBookingsIndex, setShowBookingsIndex] = useState(null);

  const handleShowBookings = async (index) => {
  const activity = activities[index];
  try {
    const res = await fetch(`http://localhost:5000/api/activities/${activity._id}/bookings`);
    const data = await res.json();
    setSelectedBookings(data);
    setShowBookingsIndex(index);
  } catch (err) {
    console.error('Error fetching bookings:', err);
  }
};


  const fetchActivities = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/activities');
      const data = await response.json();
      setActivities(data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  const adminBoxRef = useRef(null);

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

  // Validate date format using regex
  const timeRegex = /^\d{2}-\d{2}-\d{4} \d{2}:\d{2}$/;
  if (!timeRegex.test(formData.time)) {
    alert('❌ Invalid format. Use DD-MM-YYYY HH:MM');
    return;
  }

  // Parse date parts
  const [datePart, timePart] = formData.time.split(' ');
  const [day, month, year] = datePart.split('-').map(Number);
  const [hours, minutes] = timePart.split(':').map(Number);

  // Create a Date object
  const dateObj = new Date(year, month - 1, day, hours, minutes);

  // Check if the date is valid
  if (isNaN(dateObj.getTime()) || dateObj.getDate() !== day || dateObj.getMonth() !== month - 1 || dateObj.getFullYear() !== year) {
    alert('❌ Invalid date or time');
    return;
  }

  // Check if the date is in the future
  if (dateObj <= new Date()) {
    alert('❌ The time must be in the future');
    return;
  }

  // Continue to submit if all checks pass
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

    // Scroll to the form
    setTimeout(() => {
      adminBoxRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
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

  /*Sara Shmerti*/

  return (
    <div>
      <Header />

      <main className="admin-main">
  <div className="admin-dashboard">
    {/* Admin box for form */}
    <div className="admin-box" ref={adminBoxRef}>
      <h2>Welcome to the Admin Dashboard</h2>
      <p>Manage activities by adding, editing, or removing events.</p>

      <button className="add-button" onClick={handleAddClick}>+</button>

      {showForm && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Activity name" value={formData.name} onChange={handleChange} required />
          <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
          <input
            type="text"
            name="time"
            placeholder="DD-MM-YYYY HH:MM"
            value={formData.time}
            onChange={handleChange}
            required
            pattern="\d{2}-\d{2}-\d{4} \d{2}:\d{2}"
            title="Format: DD-MM-YYYY HH:MM"
          />
          <input type="number" name="quantity" placeholder="Max participants" value={formData.quantity} onChange={handleChange} required />
          <input type="number" name="price" placeholder="Price SEK" value={formData.price} onChange={handleChange} required />
          <button type="submit" className="save-button">
            {editingIndex !== null ? 'Update Activity' : 'Save Activity'}
          </button>
        </form>
      )}
    </div>

    {/* Activities grid */}
    <div className="activity-list">
      {activities.map((act, index) => (
        <div key={act._id} className="activity-card">
          <h3>{act.name}</h3>
          <p><strong>Address:</strong> {act.address}</p>
          <p><strong>Time:</strong> {act.time}</p>
          <p><strong>Max Students:</strong> {act.quantity}</p>
          <p><strong>Price:</strong> {act.price} SEK</p>
          <p>
            <strong>Booked:</strong>{' '}
            <span
              className="booked-link"
              style={{ color: 'blue', cursor: 'pointer' }}
              onClick={() => handleShowBookings(index)}
            >
              {act.bookedUsers?.length || 0}/{act.quantity}
            </span>
          </p>

          {showBookingsIndex === index && selectedBookings.length > 0 && (
            <div className="booking-list">
              <h4>Booked Users:</h4>
              <ul>
                {selectedBookings.map((user, idx) => (
                  <li key={idx}>{user.firstName} {user.lastName}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="activity-buttons">
            <button className="edit-button" onClick={() => handleEdit(index)}>Edit</button>
            <button className="remove-button" onClick={() => handleRemove(index)}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  </div>
</main>
</div>
  );
} 