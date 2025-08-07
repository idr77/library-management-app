import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Button, 
  Badge, 
  Alert, 
  Row, 
  Col,
  ButtonGroup
} from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { bookService } from '../services/api';

/**
 * BookDetails component - Book details page
 * 
 * This component displays the complete details of a specific book
 * with all its information and possible actions (borrow, return, edit, delete).
 * It automatically loads book data when the component mounts.
 * 
 * Features:
 * - Detailed display of book information
 * - Quick actions (borrow, return, edit, delete)
 * - Management of different statuses with colored badges
 * - Deletion confirmation with confirm()
 * - Loading and error state management
 * - Responsive interface with Bootstrap
 * 
 * @returns {JSX.Element} The book details page with all information and actions
 */
const BookDetails = () => {
  // Get ID from URL parameters
  const { id } = useParams();
  
  // React Router navigation hook
  const navigate = useNavigate();
  
  // State for book data
  const [book, setBook] = useState(null);
  
  // State to manage loading spinner display
  const [loading, setLoading] = useState(true);
  
  // State to manage error messages
  const [error, setError] = useState(null);

  /**
   * Loads book data when component mounts
   */
  useEffect(() => {
    fetchBook();
  }, [id]);

  /**
   * Retrieves book details from the API
   * Updates local state with received data
   */
  const fetchBook = async () => {
    try {
      setLoading(true);
      const data = await bookService.getBookById(id);
      setBook(data);
    } catch (err) {
      setError('Error loading book');
      console.error('fetchBook error:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Borrows a book by changing its status from AVAILABLE to BORROWED
   * Reloads data after action to update display
   */
  const handleBorrow = async () => {
    try {
      await bookService.borrowBook(id);
      fetchBook(); // Reload details to update status
    } catch (err) {
      setError('Borrow error');
      console.error('Borrow error:', err);
    }
  };

  /**
   * Returns a book by changing its status from BORROWED to AVAILABLE
   * Reloads data after action to update display
   */
  const handleReturn = async () => {
    try {
      await bookService.returnBook(id);
      fetchBook(); // Reload details to update status
    } catch (err) {
      setError('Return error');
      console.error('Return error:', err);
    }
  };

  /**
   * Deletes a book after user confirmation
   * Navigates to book list after deletion
   */
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await bookService.deleteBook(id);
        navigate('/books');
      } catch (err) {
        setError('Delete error');
        console.error('Delete error:', err);
      }
    }
  };

  /**
   * Generates a colored badge to display book status
   * 
   * @param {string} status - The book status
   * @returns {JSX.Element} The badge with appropriate color and text
   */
  const getStatusBadge = (status) => {
    const statusMap = {
      'AVAILABLE': { bg: 'success', text: 'Available' },
      'BORROWED': { bg: 'warning', text: 'Borrowed' },
      'RESERVED': { bg: 'info', text: 'Reserved' },
      'LOST': { bg: 'danger', text: 'Lost' },
      'DAMAGED': { bg: 'secondary', text: 'Damaged' }
    };
    
    const statusInfo = statusMap[status] || { bg: 'secondary', text: status };
    return <Badge bg={statusInfo.bg}>{statusInfo.text}</Badge>;
  };

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

  // Display if book doesn't exist
  if (!book) {
    return <Alert variant="warning">Book not found</Alert>;
  }

  return (
    <div>
      {/* Header with title and action buttons */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Book Details</h1>
        <ButtonGroup>
          <Button 
            variant="outline-secondary" 
            onClick={() => navigate(`/books/${id}/edit`)}
          >
            Edit
          </Button>
          <Button 
            variant="outline-danger" 
            onClick={handleDelete}
          >
            Delete
          </Button>
        </ButtonGroup>
      </div>

      <Card>
        <Card.Body>
          <Row>
            {/* Main column with book information */}
            <Col md={8}>
              <h2>{book.title}</h2>
              <p className="text-muted mb-3">by {book.author}</p>
              
              {/* Book description (if available) */}
              {book.description && (
                <div className="mb-4">
                  <h5>Description</h5>
                  <p>{book.description}</p>
                </div>
              )}

              {/* Detailed book information */}
              <Row className="mb-4">
                <Col md={6}>
                  <h5>Information</h5>
                  <ul className="list-unstyled">
                    <li><strong>Publication Year:</strong> {book.publicationYear}</li>
                    <li><strong>ISBN:</strong> {book.isbn}</li>
                    <li><strong>Status:</strong> {getStatusBadge(book.status)}</li>
                    <li><strong>Added on:</strong> {new Date(book.createdAt).toLocaleDateString('en-US')}</li>
                    {book.updatedAt && (
                      <li><strong>Modified on:</strong> {new Date(book.updatedAt).toLocaleDateString('en-US')}</li>
                    )}
                  </ul>
                </Col>
              </Row>

              {/* Main action buttons */}
              <div className="d-flex gap-2">
                {/* Borrow/return button based on status */}
                {book.status === 'AVAILABLE' ? (
                  <Button 
                    variant="warning" 
                    onClick={handleBorrow}
                  >
                    Borrow this book
                  </Button>
                ) : book.status === 'BORROWED' ? (
                  <Button 
                    variant="success" 
                    onClick={handleReturn}
                  >
                    Return this book
                  </Button>
                ) : null}
                
                {/* Back to list button */}
                <Button 
                  variant="outline-secondary" 
                  onClick={() => navigate('/books')}
                >
                  Back to list
                </Button>
              </div>
            </Col>
            
            {/* Side column with quick actions */}
            <Col md={4}>
              <Card className="bg-light">
                <Card.Body>
                  <h5>Quick Actions</h5>
                  <div className="d-grid gap-2">
                    {/* Edit button */}
                    <Button 
                      variant="outline-primary" 
                      onClick={() => navigate(`/books/${id}/edit`)}
                    >
                      Edit
                    </Button>
                    
                    {/* Borrow button (if available) */}
                    {book.status === 'AVAILABLE' && (
                      <Button 
                        variant="outline-warning" 
                        onClick={handleBorrow}
                      >
                        Borrow
                      </Button>
                    )}
                    
                    {/* Return button (if borrowed) */}
                    {book.status === 'BORROWED' && (
                      <Button 
                        variant="outline-success" 
                        onClick={handleReturn}
                      >
                        Return
                      </Button>
                    )}
                    
                    {/* Delete button */}
                    <Button 
                      variant="outline-danger" 
                      onClick={handleDelete}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BookDetails;
