import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Badge, Alert } from 'react-bootstrap';
import { bookService } from '../services/api';

/**
 * Dashboard component - Application home page
 * 
 * This component displays a dashboard with library statistics
 * and a list of the most recent books. It loads data when the component
 * mounts and handles loading and error states.
 * 
 * Features:
 * - Display of statistics (available/borrowed books)
 * - List of 5 most recent books
 * - Loading and error state management
 * - Responsive interface with Bootstrap
 * 
 * @returns {JSX.Element} The dashboard with statistics and book list
 */
const Dashboard = () => {
  // State for library statistics
  const [stats, setStats] = useState({ available: 0, borrowed: 0 });
  
  // State for recent books list
  const [recentBooks, setRecentBooks] = useState([]);
  
  // State to manage loading spinner display
  const [loading, setLoading] = useState(true);
  
  // State to manage error messages
  const [error, setError] = useState(null);

  /**
   * Loads dashboard data
   * Retrieves statistics and book list in parallel
   */
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Parallel loading of statistics and book list
        const [statsData, booksData] = await Promise.all([
          bookService.getStats(),
          bookService.getAllBooks()
        ]);
        
        setStats(statsData);
        // Limit to 5 most recent books
        setRecentBooks(booksData.slice(0, 5));
      } catch (err) {
        setError('Error loading data');
        console.error('Dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Display loading spinner
  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Display error message
  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div>
      <h1 className="mb-4">Dashboard</h1>
      
      {/* Statistics section */}
      <Row className="mb-4">
        {/* Available books card */}
        <Col md={6}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Available Books</Card.Title>
              <h2 className="text-success">{stats.available}</h2>
            </Card.Body>
          </Card>
        </Col>
        
        {/* Borrowed books card */}
        <Col md={6}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Borrowed Books</Card.Title>
              <h2 className="text-warning">{stats.borrowed}</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent books section */}
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5>Recent Books</h5>
            </Card.Header>
            <Card.Body>
              {recentBooks.length === 0 ? (
                <p className="text-muted">No books in the library</p>
              ) : (
                <div className="list-group list-group-flush">
                  {recentBooks.map((book) => (
                    <div key={book.id} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">{book.title}</h6>
                        <small className="text-muted">by {book.author}</small>
                      </div>
                      {/* Status badge with conditional color */}
                      <Badge bg={book.status === 'AVAILABLE' ? 'success' : 'warning'}>
                        {book.status === 'AVAILABLE' ? 'Available' : 'Borrowed'}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
