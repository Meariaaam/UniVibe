import { Link } from 'react-router-dom';
import logo from '../assets/uni.jpg';
import './Header.css';

export default function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = !!user;
  const isAdmin = user?.email === 'univibe.contactus@gmail.com';

  return (
    <header className="admin-header">
      <div className="admin-logo-box">
        <img src={logo} alt="UniVibe logo" className="admin-logo" />
        <h1 className="admin-title">UniVibe</h1>
      </div>
      <nav>
        <ul className="admin-nav">

          {/* Always visible for everyone */}
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/about">About</Link></li>

          {/* Not signed in */}
          {!isLoggedIn && (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </>
          )}

          {/* Signed in as user */}
          {isLoggedIn && !isAdmin && (
            <>
              <li><Link to="/activities">Activities</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/signout">Sign Out</Link></li>
            </>
          )}

          {/* Signed in as admin */}
          {isLoggedIn && isAdmin && (
            <>
              <li><Link to="/activities">Activities</Link></li>
              <li><Link to="/admin">Admin</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/signout">Sign Out</Link></li>
              <li><Link to="/users">Users</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
