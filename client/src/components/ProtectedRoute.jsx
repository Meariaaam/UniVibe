// components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) return <Navigate to="/" />;

  try {
    const decoded = jwtDecode(token);

    // Optional: check if token is expired
    const now = Date.now() / 1000; // in seconds
    if (decoded.exp && decoded.exp < now) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return <Navigate to="/" />;
    }

    return children;
  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
