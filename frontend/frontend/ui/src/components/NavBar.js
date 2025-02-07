// NavbarComponent.js
import React from 'react';
import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = ({ searchQuery, setSearchQuery, handleSearchSubmit }) => {
  const userRole = localStorage.getItem('role');
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.reload();
  }
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">NewsApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/add">Add News</Nav.Link>
            <Nav.Link as={Link} to="/local">Local News</Nav.Link>
            <Nav.Link
              as={Link}
              to={userRole === "ADMIN" ? "/admin" : "#"}
              onClick={(e) => {
                if (userRole !== "ADMIN") {
                  e.preventDefault(); // Prevent navigation
                  alert("You are not an Admin. You don't have access!");
                }
              }}
            >
              Admin Panel
            </Nav.Link>

            <Nav.Link href="#about">About</Nav.Link>
            {
              localStorage.getItem('token') ? (<Button onClick={handleLogout}>Logout</Button>) : null
            }

          </Nav>

          {/* Search Form */}
          <Form inline onSubmit={handleSearchSubmit} className="d-flex ml-auto">
            <Form.Control
              type="text"
              placeholder="Search by category"
              className="mr-sm-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" variant="outline-light">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
