import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import { Button, Row, Col, Modal, Form } from 'react-bootstrap';
import NavBar from './NavBar';

function LocalNews() {
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for editing
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentNews, setCurrentNews] = useState({
    id: '',
    author: '',
    title: '',
    description: '',
    url: '',
    urlToImage: ''
  });

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = () => {
    axios.get('http://localhost:9090/news')
      .then(localResponse => {
        setNews(localResponse.data);
      })
      .catch(error => {
        console.error('Error fetching local news:', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:9090/news/${id}`)
      .then(() => {
        setNews(prevNews => prevNews.filter(item => item.id !== id));
        alert('News deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting news:', error);
        alert('Failed to delete news');
      });
  };

  const handleEditClick = (newsItem) => {
    setCurrentNews(newsItem);
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentNews(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:9090/news/${currentNews.id}`, currentNews)
      .then(response => {
        setNews(prevNews => prevNews.map(item => item.id === currentNews.id ? response.data : item));
        setShowEditModal(false);
        alert('News updated successfully');
      })
      .catch(error => {
        console.error('Error updating news:', error);
        alert('Failed to update news');
      });
  };

  // Filter news based on search query (search in current state)
  const filteredNews = news.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4">
      {/* Navigation Bar */}
      <NavBar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        handleSearchSubmit={(e) => e.preventDefault()} // Prevent default form behavior
      />

      <h1 className="text-3xl font-semibold mb-6 text-center">Latest News</h1>

      <Row>
        {filteredNews.length > 0 ? filteredNews.map((d, index) => (
          <Col className="mb-4" xs={12} sm={6} md={4} lg={3} key={index}>
            <Card item={d} />
            {d.id && (
              <>
                <Button
                  variant="primary"
                  className="mt-2 w-100"
                  onClick={() => handleEditClick(d)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  className="mt-2 w-100"
                  onClick={() => handleDelete(d.id)}
                >
                  Delete
                </Button>
              </>
            )}
          </Col>
        )) : <h2>No News Found. Try Again!</h2>}
      </Row>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit News</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                name="author"
                value={currentNews.author}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={currentNews.title}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={currentNews.description}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>URL</Form.Label>
              <Form.Control
                type="text"
                name="url"
                value={currentNews.url}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="urlToImage"
                value={currentNews.urlToImage}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Button variant="success" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default LocalNews;
