import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home.jsx'; //case sensitive here
import Register from './pages/register.jsx'; //case sensitive it should be capital but tried this
import About from './pages/About.jsx';
import Login from './pages/Login.jsx';
import Admin from './pages/Admin.jsx';
import Users from './pages/Users.jsx';
import SignOut from './pages/SignOut.jsx';
import Activities from './pages/Activities.jsx';
import ContactUs from './pages/contactUs.jsx';
import PrivateRoute from './pages/PrivateRoute.jsx';
import AdminRoute from './pages/AdminRoute.jsx';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
        <Route path="/users" element={<AdminRoute><Users /></AdminRoute>} />
        <Route path="/activities" element={<PrivateRoute><Activities /></PrivateRoute>} />
        <Route path="/signout" element={<SignOut />} />

        {/* Protected Route: only logged-in users can access */}
        <Route
          path="/activities"
          element={
            <PrivateRoute>
              <Activities />
            </PrivateRoute>
          }
        />

        {/* Admin-Only Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
        <Route
          path="/users"
          element={
            <AdminRoute>
              <Users />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}
