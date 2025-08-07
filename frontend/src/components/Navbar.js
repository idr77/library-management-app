import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const NavigationBar = () => {
  const location = useLocation();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          📚 Gestion de Bibliothèque
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              active={location.pathname === '/'}
            >
              Tableau de bord
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/books" 
              active={location.pathname === '/books'}
            >
              Livres
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/books/new" 
              active={location.pathname === '/books/new'}
            >
              Ajouter un livre
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
