import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

/**
 * Main navigation bar component
 * 
 * This component displays the navigation bar with the application logo
 * and links to different pages. It uses React Router for navigation
 * and Bootstrap for styling.
 * 
 * Features:
 * - Clickable logo that redirects to home page
 * - Responsive navigation with hamburger menu on mobile
 * - Visual indication of active page
 * - Links to Dashboard, Book List and Add Book
 * 
 * @returns {JSX.Element} The navigation bar with navigation links
 */
const NavigationBar = () => {
  // Hook to get current URL and determine active page
  const location = useLocation();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        {/* Logo and application name */}
        <Navbar.Brand as={Link} to="/">
          📚 Library Management
        </Navbar.Brand>
        
        {/* Hamburger button for mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        {/* Navigation menu */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* Link to dashboard */}
            <Nav.Link 
              as={Link} 
              to="/" 
              active={location.pathname === '/'}
            >
              Dashboard
            </Nav.Link>
            
            {/* Link to book list */}
            <Nav.Link 
              as={Link} 
              to="/books" 
              active={location.pathname === '/books'}
            >
              Books
            </Nav.Link>
            
            {/* Link to add book */}
            <Nav.Link 
              as={Link} 
              to="/books/new" 
              active={location.pathname === '/books/new'}
            >
              Add Book
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
