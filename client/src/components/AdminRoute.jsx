// components/AdminRoute.jsx
import { Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) return <Navigate to="/" />;

  try {
    const decoded = jwtDecode(token);
    const isAdmin = decoded?.isAdmin === true;

    return isAdmin ? children : <Navigate to="/" />;
  } catch (err) {
    console.error("Token decode error:", err);
    return <Navigate to="/" />;
  }
};

export default AdminRoute;
