import React, { useEffect, useState } from 'react';
import axios from 'axios';

function NewsList() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Debugging: Check if token exists
    console.log('Token:', token);

    axios.get('http://localhost:8080/api/news', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('Response:', response);  // Debugging: Check the response
      setNews(response.data);
    })
    .catch(error => {
      console.error('Error fetching news:', error);  // Debugging: Check for errors
    });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Latest News</h1>
      {news.length > 0 ? (
        news.map(item => (
          <div key={item.id} className="mb-4 p-4 border rounded">
            <h2 className="text-xl font-bold">{item.title}</h2>
            <p>{item.content}</p>
          </div>
        ))
      ) : (
        <p>No news available.</p>
      )}
    </div>
  );
}

export default NewsList;
