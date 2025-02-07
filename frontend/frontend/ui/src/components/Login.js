// import React, { useReducer, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Card, CardContent, Typography } from '@mui/material';
// import Button from '../components/Button';
// import Input from '../components/Input';
// import Alert from '../components/Alert';
// import { jwtDecode } from "jwt-decode"; // Corrected import
// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const getRoleFromToken = (token) => {
//   if (!token) return null;

//   try {
//     const decoded = jwtDecode(token); // Use jwtDecode here
//     let role = decoded.role || null;

//     if (role && role.startsWith("ROLE_")) {
//       role = role.replace("ROLE_", ""); // Convert "ROLE_ADMIN" → "ADMIN"
//     }
//     console.log(role);
//     localStorage.setItem('role',role)
//     return role;
//   } catch (error) {
//     console.error("Invalid token", error);
//     return null;
//   }
// };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const user = { username, password };

//     try {
//       const res = await axios.post('http://localhost:9090/auth/login', user);
//       localStorage.setItem('token', res.data.token);
//       localStorage.setItem("username",username)
//       localStorage.setItem('role',getRoleFromToken(localStorage.getItem('token')));
//       navigate('/');
//     } catch (err) {
//       setError('Invalid username or password');
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
//       <Card className="shadow-2xl rounded-3xl p-10 w-full max-w-md bg-white">
//         <CardContent>
//           <Typography variant="h4" align="center" gutterBottom className="font-bold text-gray-800">
//             Welcome Back!
//           </Typography>
//           <Typography variant="subtitle1" align="center" gutterBottom className="text-gray-500 mb-6">
//             Please login to your account
//           </Typography>
//           <div className="flex flex-col items-center justify-center">
//             <form onSubmit={handleLogin} className="space-y-6 w-full max-w-sm">
//               <Input
//                 type="text"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 w-full"
//                 required
//               />
//               <Input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 w-full"
//                 required
//               />
//               <Button type="submit" className="w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold shadow-md transition-transform transform hover:scale-105">
//                 Login
//               </Button>
//             </form>
//           </div>
//           {error && <Alert message={error} className="mt-4 text-red-600 text-center" />}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Correct import
import "bootstrap/dist/css/bootstrap.min.css";
import bg from "./bg.jpg"

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getRoleFromToken = (token) => {
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      let role = decoded.role || null;
      if (role && role.startsWith("ROLE_")) {
        role = role.replace("ROLE_", ""); // Convert "ROLE_ADMIN" → "ADMIN"
      }
      localStorage.setItem("role", role);
      return role;
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    const user = { username, password };

    try {
      const res = await axios.post("http://localhost:9090/auth/login", user);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", username);
      localStorage.setItem("role", getRoleFromToken(res.data.token));
      navigate("/");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light"   style={{
      backgroundImage: `url(${bg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      <div className="card shadow-lg p-4 rounded" style={{ width: "350px" }}>
        <div className="text-center">
          <h2 className="fw-bold text-primary">Welcome Back!</h2>
          <p className="text-muted">Please login to your account</p>
        </div>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold">
            Login
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="text-muted">
            Don't have an account? <a href="/signup" className="text-primary">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
