import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    const user={
      username:username,
      password:password
    }
    e.preventDefault();
    
      axios.post('http://localhost:9090/auth/login',user)
      .then((res)=>{
        navigate("/admin")
        console.log('Token:', res.data.token); 
        localStorage.setItem('token', res.data.token);
      })
      .catch((err)=>{

        console.error('Login failed:', err.response ? err.response.data : err.message);
        setError('Invalid username or password');
      
      })
     
     
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;
