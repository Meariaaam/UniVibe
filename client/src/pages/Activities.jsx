import { useEffect, useState } from 'react';
import axios from 'axios';

import './Activities.css';
import Header from '../components/Header';



export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await axios.get('https://univibe-05vi.onrender.com/api/activities');
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

  const handleFilter = (category) => {
    setSelectedCategory(category);
  };

  const filteredActivities =
    selectedCategory === 'All'
      ? activities
      : activities.filter((act) =>
          act.category?.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="activities-page">
      <Header />
      <main className="activities-main">
        <h2>Available Activities</h2>
        <div className="activities-layout">
          {/* Sidebar */}
          <aside className="sidebar">
            <h4>Filter by Category</h4>
            {['All', 'Sports', 'Social', 'Academic', 'Tech'].map((cat) => (
              <button
                key={cat}
                className={`filter-button ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => handleFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </aside>

          {/* Activities Grid */}
          <div className="activities-list">
            {filteredActivities.length === 0 ? (
              <p>No activities available right now.</p>
            ) : (
              filteredActivities.map((act) => (
                <div key={act._id} className="activity-card">
                  <h3>{act.name}</h3>
                  <p><strong>Address:</strong> {act.address}</p>
                  <p><strong>Time:</strong> {act.time}</p>
                  <p><strong>Max Participants:</strong> {act.quantity}</p>
                  <p><strong>Price:</strong> {act.price} SEK</p>
                  <button
                    onClick={() => handleBook(act._id)}
                    className="book-button"
                  >
                    Book
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
