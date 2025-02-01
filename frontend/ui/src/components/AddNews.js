import React, { useState } from 'react';
import axios from 'axios';

function AddNews() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('/api/news/add', { title, content }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('News submitted for approval');
    } catch (error) {
      console.error('Failed to add news', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Add News</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="mb-2 p-2 border rounded w-full" />
        <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} className="mb-2 p-2 border rounded w-full"></textarea>
        <button type="submit" className="p-2 bg-green-500 text-white rounded">Submit</button>
      </form>
    </div>
  );
}

export default AddNews;
