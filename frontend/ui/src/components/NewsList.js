// NewsList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card'; // Import the Card component
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
const API_KEY = "7a707717fcec41bb8cfee6022a1b48cd";
const url = "https://newsapi.org/v2/everything?q=";

function NewsList() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Debugging: Check if token exists
    console.log('Token:', token);

    axios.get('https://newsapi.org/v2/everything?q=world&apiKey=7a707717fcec41bb8cfee6022a1b48cd')
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
      <h1 className="text-3xl font-semibold mb-6 text-center">Latest News</h1>

      <Row >
        {news.length > 0 ? news.map(d => (
          <Col className="mb-20 mx-12" xs={12} sm={6} md={4} lg={3}>

            <Card item={d} />

          </Col>
        )) : <h2>No News Found Try Again!!!!!!!!</h2>}
      </Row>
    </div>
  );
}

export default NewsList;
