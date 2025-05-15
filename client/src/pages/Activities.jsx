import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../assets/uni.jpg';
import './Activities.css';
import Header from '../components/Header';



export default function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/activities');
        setActivities(res.data);
      } catch (err) {
        console.error('Failed to fetch activities:', err);
      }
    };

    fetchActivities();
  }, []);

  const handleBook = (activityId) => {
    alert(`Booked activity with ID: ${activityId}`);
    
  };

  return (
    <div className="activities-page">
      <Header />

      <main className="activities-main">
        <h2>Available Activities</h2>
        <div className="activities-list">
          {activities.length === 0 ? (
            <p>No activities available right now.</p>
          ) : (
            activities.map((act) => (
              <div key={act._id} className="activity-card">
                <h3>{act.name}</h3>
                <p><strong>Address:</strong> {act.address}</p>
                <p><strong>Time:</strong> {act.time}</p>
                <p><strong>Max Participants:</strong> {act.quantity}</p>
                <p><strong>Price:</strong> {act.price} SEK</p>
                <button onClick={() => handleBook(act._id)} className="book-button">
                  Book
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
