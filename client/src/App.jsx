import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Register from './pages/Register.jsx';
import About from './pages/About.jsx';
import Login from './pages/Login.jsx';
import Admin from './pages/Admin.jsx';
import Users from './pages/Users.jsx';
import SignOut from './pages/SignOut.jsx';



export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/users" element={<Users />} />
        <Route path="/signout" element={<SignOut />} />
      </Routes>
    </Router>
  );
}
