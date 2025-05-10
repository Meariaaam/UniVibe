import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Register from './pages/Register.jsx';
import About from './pages/About.jsx';
import Login from './pages/Login.jsx';
import Admin from './pages/Admin.jsx';
import Users from './pages/Users.jsx';
import SignOut from './pages/SignOut.jsx';
import Activities from './pages/Activities.jsx';
import './App.css'


export default function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Redirect root path to /home */}
        <Route path="/" element={<Navigate to="/home" />} />

        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/users" element={<Users />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="/activities" element={<Activities />} />  
      </Routes>
    </Router>
  );
}
