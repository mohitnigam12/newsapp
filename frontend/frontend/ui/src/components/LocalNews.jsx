import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import { Button, Row, Col, Modal, Form, Spinner, Toast } from 'react-bootstrap';
import NavBar from './NavBar';

function LocalNews() {
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [showEditModal, setShowEditModal] = useState(false);
  const userRole = localStorage.getItem('role');
  const [currentNews, setCurrentNews] = useState({
    id: '',
    author: '',
    title: '',
    description: '',
    url: '',
    urlToImage: ''
  });

  // State for Toast Notifications
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // State for deleting confirmation
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = () => {
    setLoading(true);
    axios.get('http://localhost:9090/news')
      .then(localResponse => {
        setNews(localResponse.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching local news:', error);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    // Ask for confirmation before deleting
    setDeleteConfirm(id);
  };

  const confirmDelete = () => {
    axios.delete(`http://localhost:9090/news/${deleteConfirm}`)
      .then(() => {
        setNews(prevNews => prevNews.filter(item => item.id !== deleteConfirm));
        setShowToast(true);
        setToastMessage('News deleted successfully');
        setDeleteConfirm(null); // Close confirmation
      })
      .catch(error => {
        console.error('Error deleting news:', error);
        setShowToast(true);
        setToastMessage('Failed to delete news');
        setDeleteConfirm(null); // Close confirmation
      });
  };

  const cancelDelete = () => {
    setDeleteConfirm(null); // Close confirmation
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
        setShowToast(true);
        setToastMessage('News updated successfully');
      })
      .catch(error => {
        console.error('Error updating news:', error);
        setShowToast(true);
        setToastMessage('Failed to update news');
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

      {/* Toast Notification */}
      <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Row>
          {filteredNews.length > 0 ? filteredNews.map((d, index) => (
            <Col className="mb-4" xs={12} sm={6} md={4} lg={3} key={index}>
              <Card item={d} />
              {d.id && (
                <>
                  <Button
                    variant="primary"
                    className="mt-2 w-100"
                    onClick={() => {
                      if (userRole !== "ADMIN" && userRole !== "EDITOR") {
                        alert("You are not an Admin or Editor. You don't have access!");
                        return;
                      }
                      handleEditClick(d);
                    }}
                    disabled={userRole !== "ADMIN" && userRole !== "EDITOR"}
                  >
                    <i className="fas fa-edit"></i> Edit
                  </Button>

                  <Button
                    variant="danger"
                    className="mt-2 w-100"
                    onClick={() => {
                      if (userRole !== "ADMIN") {
                        alert("Only Admins can delete news!");
                        return;
                      }
                      handleDelete(d.id);
                    }}
                    disabled={userRole !== "ADMIN"}
                  >
                    <i className="fas fa-trash-alt"></i> Delete
                  </Button>

                </>
              )}
            </Col>
          )) : <h2>No News Found. Try Again!</h2>}
        </Row>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={deleteConfirm !== null} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this news item?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

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
