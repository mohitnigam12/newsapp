import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import NavBar from './NavBar';

function AdminPanel() {
  const [pendingNews, setPendingNews] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:9090/news/pending', { headers: { Authorization: `Bearer ${token}` } })
      .then(response => setPendingNews(response.data))
      .catch(error => console.error('Error fetching pending news:', error));
  }, [token]);

  const approveNews = async (id) => {
    try {
      await axios.put(`http://localhost:9090/news/approve/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
      setPendingNews(pendingNews.filter(news => news.id !== id));
    } catch (error) {
      console.error('Failed to approve news:', error);
    }
  };

  const deleteNews = async (id) => {
    try {
      await axios.delete(`http://localhost:9090/news/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setPendingNews(pendingNews.filter(news => news.id !== id));
    } catch (error) {
      console.error('Failed to delete news:', error);
    }
  };

  return (
    <div className="container mt-4">
      <NavBar />
      <h1 className="mb-4">Admin Panel</h1>
      {pendingNews.length === 0 ? (
        <p className="text-muted">No pending news at the moment.</p>
      ) : (
        pendingNews.map(news => (
          <div key={news.id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{news.title}</h5>
              <p className="card-text">{news.content}</p>
              <button 
                onClick={() => approveNews(news.id)} 
                className="btn btn-success me-2"
              >
                Approve
              </button>
              <button 
                onClick={() => deleteNews(news.id)} 
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminPanel;
