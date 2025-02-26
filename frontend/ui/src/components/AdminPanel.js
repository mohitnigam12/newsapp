import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminPanel() {
  const [pendingNews, setPendingNews] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('/api/news/pending', { headers: { Authorization: `Bearer ${token}` } })
      .then(response => setPendingNews(response.data));
  }, []);

  const approveNews = async (id) => {
    try {
      await axios.post(`/api/news/approve/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
      setPendingNews(pendingNews.filter(news => news.id !== id));
    } catch (error) {
      console.error('Failed to approve news', error);
    }
  };

  const deleteNews = async (id) => {
    try {
      await axios.delete(`/api/news/delete/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setPendingNews(pendingNews.filter(news => news.id !== id));
    } catch (error) {
      console.error('Failed to delete news', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Admin Panel</h1>
      {pendingNews.map(news => (
        <div key={news.id} className="mb-4 p-4 border rounded">
          <h2 className="text-xl font-bold">{news.title}</h2>
          <p>{news.content}</p>
          <button onClick={() => approveNews(news.id)} className="mr-2 p-2 bg-blue-500 text-white rounded">Approve</button>
          <button onClick={() => deleteNews(news.id)} className="p-2 bg-red-500 text-white rounded">Delete</button>
        </div>
      ))}
    </div>
  );
}

export default AdminPanel;