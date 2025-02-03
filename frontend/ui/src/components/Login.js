import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import Button from '../components/Button';
import Input from '../components/Input';
import Alert from '../components/Alert';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = { username, password };

    try {
      const res = await axios.post('http://localhost:9090/auth/login', user);
      localStorage.setItem('token', res.data.token);
      navigate('/admin');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <Card className="shadow-2xl rounded-3xl p-10 w-full max-w-md bg-white">
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom className="font-bold text-gray-800">
            Welcome Back!
          </Typography>
          <Typography variant="subtitle1" align="center" gutterBottom className="text-gray-500 mb-6">
            Please login to your account
          </Typography>
          <div className="flex flex-col items-center justify-center">
            <form onSubmit={handleLogin} className="space-y-6 w-full max-w-sm">
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 w-full"
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 w-full"
                required
              />
              <Button type="submit" className="w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold shadow-md transition-transform transform hover:scale-105">
                Login
              </Button>
            </form>
          </div>
          {error && <Alert message={error} className="mt-4 text-red-600 text-center" />}
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;