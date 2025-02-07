import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card'; // Import the Card component
import { Row, Col} from 'react-bootstrap'; // Import necessary components
import { Navigate } from 'react-router-dom';
import NavBar from './NavBar';
const API_KEY = "7a707717fcec41bb8cfee6022a1b48cd";
// const url = "https://newsapi.org/v2/everything?q=";

function NewsList() {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState('world'); // Default category is 'world'
  const [searchQuery, setSearchQuery] = useState(''); // To store the search query

  useEffect(() => {
    fetchNews();
  }, [category]);

  //const fetchNews = () => {
  //   axios.get(`https://newsapi.org/v2/everything?q=${category}&apiKey=${API_KEY}`)
  //     .then(response => {
  //       setNews(response.data.articles);
  //     })

  //     .catch(error => {
  //       console.error('Error fetching news:', error);
  //     });

  //     axios.get('http://localhost:9090/news')
  //     .then(response => {
  //       setNews(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching news:', error);
  //     });
  // };
  const fetchNews = () => {
    // Fetch from external NewsAPI
    axios.get(`https://newsapi.org/v2/everything?q=${category}&apiKey=${API_KEY}`)
      .then(response => {
        // Set the initial news from the external API
        setNews(response.data.articles);
        
        // Fetch from local Spring Boot API after external API
        axios.get('http://localhost:9090/news')
          .then(localResponse => {
            // Append local news to existing news
            setNews(prevNews => [...prevNews, ...localResponse.data]);
          })
          .catch(error => {
            console.error('Error fetching local news:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching external news:', error);
      });
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();  // Prevent default form submission
    if (searchQuery) {
      setCategory(searchQuery);  // Set the category to search query
    }
  };

  
  return (
    <div className="p-4">
      {/* Navigation Bar */}
      <NavBar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        handleSearchSubmit={handleSearchSubmit} 
      />

      


    

       <h1 className="text-3xl font-semibold mb-6 text-center" onClick={()=>Navigate("/signup")}>Latest News</h1>
      
      

      <Row>
        {news?.length > 0 ? news?.map(d => (
          <Col className="mb-20 mx-12" xs={12} sm={6} md={4} lg={3} key={d.title}>
            <Card item={d} />
          </Col>
        )) : <h2>No News Found. Try Again!</h2>}
      </Row>
    </div>
  );
}

export default NewsList;
