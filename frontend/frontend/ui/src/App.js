import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import NewsList from './components/NewsList';
import AddNews from './components/AddNews';
import AdminPanel from './components/AdminPanel';
import PrivateRoute from './components/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import LocalNews from './components/LocalNews';
function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<NewsList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Private Routes */}
        <Route path="/local" element={<PrivateRoute><LocalNews /></PrivateRoute>} />
        
        <Route path="/admin" element={<PrivateRoute roles={['ADMIN']}><AdminPanel /></PrivateRoute>} />
        <Route path="/add" element={<PrivateRoute roles={['USER','EDITOR', 'ADMIN']}><AddNews /></PrivateRoute>} />
      </Routes>

    </Router>
  );
}

export default App;