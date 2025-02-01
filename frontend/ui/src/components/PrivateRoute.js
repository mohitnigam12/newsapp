import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

function PrivateRoute({ children, roles }) {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;

  try {
    const { role } = jwtDecode(token);
    if (!roles.includes(role)) return <Navigate to="/" />;
  } catch (error) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;