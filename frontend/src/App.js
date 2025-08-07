import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar';
import BookList from './pages/BookList';
import BookForm from './pages/BookForm';
import BookDetails from './pages/BookDetails';
import Dashboard from './pages/Dashboard';

/**
 * Main component of the library management application
 * 
 * This component configures the application routing and defines the general
 * structure with the navigation bar and main container.
 * 
 * Available routes:
 * - / : Home page (Dashboard)
 * - /books : Book list
 * - /books/new : Add book form
 * - /books/:id : Book details
 * - /books/:id/edit : Edit book form
 * 
 * @returns {JSX.Element} The App component with configured routing
 */
function App() {
  return (
    <Router>
      <div className="App">
        {/* Main navigation bar */}
        <Navbar />
        
        {/* Main container with margins */}
        <Container className="mt-4">
          <Routes>
            {/* Route to dashboard (home page) */}
            <Route path="/" element={<Dashboard />} />
            
            {/* Route to book list */}
            <Route path="/books" element={<BookList />} />
            
            {/* Route to add book form */}
            <Route path="/books/new" element={<BookForm />} />
            
            {/* Route to specific book details */}
            <Route path="/books/:id" element={<BookDetails />} />
            
            {/* Route to edit book form */}
            <Route path="/books/:id/edit" element={<BookForm />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
