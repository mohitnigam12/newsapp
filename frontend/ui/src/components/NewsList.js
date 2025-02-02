import React, { useEffect, useState } from 'react';
import axios from 'axios';
const API_KEY = "7a707717fcec41bb8cfee6022a1b48cd";
const url = "https://newsapi.org/v2/everything?q=";

function NewsList() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Debugging: Check if token exists
    console.log('Token:', token);

    axios.get('https://newsapi.org/v2/everything?q=world&apiKey=7a707717fcec41bb8cfee6022a1b48cd', {
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
    })
    .then(response => {
      console.log('Response:', response);  // Debugging: Check the response
      setNews(response.data.articles);
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
