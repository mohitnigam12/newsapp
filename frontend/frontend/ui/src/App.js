import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
        <Route path="/" element={<NewsList />} />
        <Route path="/local" element={<LocalNews />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path='/add' element={<AddNews/>}/>
        <Route path="/add-news" element={<PrivateRoute roles={['EDITOR', 'ADMIN']}><AddNews /></PrivateRoute>} />
        {/* <Route path="/admin" element={<PrivateRoute roles={['ADMIN']}><AdminPanel /></PrivateRoute>} /> */}
      </Routes>
    </Router>
  );
}

export default App;