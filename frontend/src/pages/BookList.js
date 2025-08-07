import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Button, 
  Form, 
  InputGroup, 
  Badge, 
  Alert, 
  Modal,
  ButtonGroup
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { bookService } from '../services/api';

/**
 * BookList component - Book list page
 * 
 * This component displays the complete list of books in the library
 * with search, filtering and book action features. It also allows
 * borrowing/returning books directly from the list.
 * 
 * Features:
 * - Tabular display of all books
 * - Search by title, author or ISBN
 * - Quick actions (view, edit, borrow, return, delete)
 * - Confirmation modal for deletion
 * - Loading and error state management
 * - Responsive interface with Bootstrap
 * 
 * @returns {JSX.Element} The book list page with all features
 */
const BookList = () => {
  // State for book list
  const [books, setBooks] = useState([]);
  
  // State to manage loading spinner display
  const [loading, setLoading] = useState(true);
  
  // State to manage error messages
  const [error, setError] = useState(null);
  
  // State for search term
  const [searchTerm, setSearchTerm] = useState('');
  
  // State to control delete modal display
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  // State to store book to delete
  const [bookToDelete, setBookToDelete] = useState(null);
  
  // React Router navigation hook
  const navigate = useNavigate();

  /**
   * Loads book list when component mounts
   */
  useEffect(() => {
    fetchBooks();
  }, []);

  /**
   * Retrieves all books from the API
   * Updates local state with received data
   */
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await bookService.getAllBooks();
      setBooks(data);
    } catch (err) {
      setError('Error loading books');
      console.error('fetchBooks error:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Performs book search by keyword
   * If search term is empty, reloads all books
   */
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      fetchBooks();
      return;
    }

    try {
      setLoading(true);
      const data = await bookService.searchBooks(searchTerm);
      setBooks(data);
    } catch (err) {
      setError('Search error');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Borrows a book by changing its status from AVAILABLE to BORROWED
   * 
   * @param {number} id - The book identifier to borrow
   */
  const handleBorrow = async (id) => {
    try {
      await bookService.borrowBook(id);
      fetchBooks(); // Reload list to update statuses
    } catch (err) {
      setError('Borrow error');
      console.error('Borrow error:', err);
    }
  };

  /**
   * Returns a book by changing its status from BORROWED to AVAILABLE
   * 
   * @param {number} id - The book identifier to return
   */
  const handleReturn = async (id) => {
    try {
      await bookService.returnBook(id);
      fetchBooks(); // Reload list to update statuses
    } catch (err) {
      setError('Return error');
      console.error('Return error:', err);
    }
  };

  /**
   * Deletes a book after confirmation in modal
   */
  const handleDelete = async () => {
    try {
      await bookService.deleteBook(bookToDelete.id);
      setShowDeleteModal(false);
      setBookToDelete(null);
      fetchBooks(); // Reload list after deletion
    } catch (err) {
      setError('Delete error');
      console.error('Delete error:', err);
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

  return (
    <div>
      {/* Header with title and add button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Book List</h1>
        <Button as={Link} to="/books/new" variant="primary">
          Add Book
        </Button>
      </div>

      {/* Display error messages */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Search bar */}
      <div className="mb-3">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Search by title, author or ISBN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button variant="outline-secondary" onClick={handleSearch}>
            Search
          </Button>
          {searchTerm && (
            <Button variant="outline-secondary" onClick={() => { setSearchTerm(''); fetchBooks(); }}>
              Clear
            </Button>
          )}
        </InputGroup>
      </div>

      {/* Display book list */}
      {books.length === 0 ? (
        <Alert variant="info">
          No books found. {searchTerm && 'Try modifying your search.'}
        </Alert>
      ) : (
        <Table responsive striped hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Year</th>
              <th>ISBN</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                {/* Title with link to details */}
                <td>
                  <Link to={`/books/${book.id}`} className="text-decoration-none">
                    {book.title}
                  </Link>
                </td>
                <td>{book.author}</td>
                <td>{book.publicationYear}</td>
                <td>{book.isbn}</td>
                <td>{getStatusBadge(book.status)}</td>
                <td>
                  <ButtonGroup size="sm">
                    {/* Button to view details */}
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => navigate(`/books/${book.id}`)}
                    >
                      View
                    </Button>
                    
                    {/* Button to edit */}
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => navigate(`/books/${book.id}/edit`)}
                    >
                      Edit
                    </Button>
                    
                    {/* Borrow/return button based on status */}
                    {book.status === 'AVAILABLE' ? (
                      <Button
                        variant="outline-warning"
                        size="sm"
                        onClick={() => handleBorrow(book.id)}
                      >
                        Borrow
                      </Button>
                    ) : book.status === 'BORROWED' ? (
                      <Button
                        variant="outline-success"
                        size="sm"
                        onClick={() => handleReturn(book.id)}
                      >
                        Return
                      </Button>
                    ) : null}
                    
                    {/* Delete button */}
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => {
                        setBookToDelete(book);
                        setShowDeleteModal(true);
                      }}
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Delete confirmation modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the book "{bookToDelete?.title}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BookList;
