import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const getRoleFromToken = (token) => {
  if (!token) return null;

  try {
    const decoded = jwtDecode(token); // Use jwtDecode here
    let role = decoded.role || null;

    if (role && role.startsWith("ROLE_")) {
      role = role.replace("ROLE_", ""); // Convert "ROLE_ADMIN" → "ADMIN"
    }
    console.log(role);
    localStorage.setItem('role',role)
    return role;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};

const PrivateRoute = ({ children, roles }) => {
  const token = localStorage.getItem("token");
  const userRole = getRoleFromToken(token);

  if (!token || !userRole) {
    return <Navigate to="/login" replace />; // Redirect if not logged in
  }

  if (roles && !roles.includes(userRole)) {
    return <Navigate to="/" replace />; // Redirect if unauthorized
  }

  return children;
};

export default PrivateRoute;
