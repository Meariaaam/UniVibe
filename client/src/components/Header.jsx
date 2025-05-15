import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from '../assets/uni.jpg';
import './Header.css';

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    try {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
    } catch {
      setUser(null);
    }
  }, []);

  const isAdmin = user?.email === 'univibe.contactus@gmail.com';
  const isLoggedIn = Boolean(user);

  return (
    <header className="admin-header">
      <div className="admin-logo-box">
        <img src={logo} alt="UniVibe logo" className="admin-logo" />
        <h1 className="admin-title">UniVibe</h1>
      </div>
      <nav>
        <ul className="admin-nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>

          {!isLoggedIn && <><li><Link to="/login">Login</Link></li><li><Link to="/register">Register</Link></li></>}

          {isLoggedIn && (
            <>
              <li><Link to="/activities">Activities</Link></li>
              {isAdmin && <li><Link to="/admin">Admin</Link></li>}
              {isAdmin && <li><Link to="/users">Users</Link></li>}
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/signout">Sign Out</Link></li>
            </>
          )}

          {!isLoggedIn && <li><Link to="/contact">Contact</Link></li>}
        </ul>
      </nav>
    </header>
  );
}
