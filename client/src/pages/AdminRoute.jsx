import { Navigate } from 'react-router-dom';

export default function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.email === 'univibe.contactus@gmail.com';
  return isAdmin ? children : <Navigate to="/login" />;
}
