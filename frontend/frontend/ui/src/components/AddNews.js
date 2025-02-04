import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import NavBar from './NavBar';

function AddNews() {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [urlToImage, setUrlToImage] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:9090/news', { author, title, description, url, urlToImage }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate("/")

      alert('News submitted successfully');
    } catch (error) {
      console.error('Failed to add news', error);
    }
  };

  return (
    <>
          <NavBar 
       
      />
    
    <div className="container mt-5">
      <h1 className="mb-4">Add News</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Author</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Enter author name"
            value={author} 
            onChange={(e) => setAuthor(e.target.value)} 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Title</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Enter news title"
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea 
            className="form-control" 
            placeholder="Enter news description"
            rows="3"
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">URL</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Enter article URL"
            value={url} 
            onChange={(e) => setUrl(e.target.value)} 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Enter image URL"
            value={urlToImage} 
            onChange={(e) => setUrlToImage(e.target.value)} 
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-success"
        >
          Submit
        </button>
      </form>
    </div>
    </>
  );
}

export default AddNews;
