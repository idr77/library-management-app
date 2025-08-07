import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { bookService } from '../services/api';

/**
 * BookForm component - Add/edit book form
 * 
 * This component handles both adding new books and editing existing books.
 * It uses URL parameters to determine the mode (add or edit) and loads
 * book data if necessary.
 * 
 * Features:
 * - Input form with validation
 * - Add and edit modes
 * - Client-side validation with Bootstrap
 * - Validation and API error handling
 * - Automatic navigation after save
 * - Responsive interface with Bootstrap
 * 
 * @returns {JSX.Element} The add/edit book form
 */
const BookForm = () => {
  // Get ID from URL parameters
  const { id } = useParams();
  
  // React Router navigation hook
  const navigate = useNavigate();
  
  // Determines if we're in edit mode (true) or add mode (false)
  const isEditing = !!id;

  // State for form data
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    publicationYear: '',
    isbn: '',
    status: 'AVAILABLE'
  });

  // State to manage loading spinner display
  const [loading, setLoading] = useState(false);
  
  // State to manage error messages
  const [error, setError] = useState(null);
  
  // State to activate Bootstrap validation
  const [validated, setValidated] = useState(false);

  /**
   * Loads book data if in edit mode
   */
  useEffect(() => {
    if (isEditing) {
      fetchBook();
    }
  }, [id]);

  /**
   * Retrieves existing book data to display in the form
   */
  const fetchBook = async () => {
    try {
      setLoading(true);
      const book = await bookService.getBookById(id);
      setFormData({
        title: book.title || '',
        author: book.author || '',
        description: book.description || '',
        publicationYear: book.publicationYear || '',
        isbn: book.isbn || '',
        status: book.status || 'AVAILABLE'
      });
    } catch (err) {
      setError('Error loading book');
      console.error('fetchBook error:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles changes in form fields
   * Updates local state with new values
   * 
   * @param {Event} e - The change event
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Handles form submission
   * Validates data and sends request to API
   * 
   * @param {Event} e - The submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    // Bootstrap validation
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Convert year to number
      const bookData = {
        ...formData,
        publicationYear: parseInt(formData.publicationYear)
      };

      // API call based on mode (add or edit)
      if (isEditing) {
        await bookService.updateBook(id, bookData);
      } else {
        await bookService.createBook(bookData);
      }

      // Navigate to book list after save
      navigate('/books');
    } catch (err) {
      setError(err.response?.data?.error || 'Save error');
      console.error('Submit error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Display loading spinner in edit mode
  if (loading && isEditing) {
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
      <h1 className="mb-4">
        {isEditing ? 'Edit Book' : 'Add New Book'}
      </h1>

      {/* Display error messages */}
      {error && <Alert variant="danger">{error}</Alert>}

      <Card>
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {/* First row: Title and Author */}
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Title *</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter book title"
                  />
                  <Form.Control.Feedback type="invalid">
                    Title is required.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Author *</Form.Label>
                  <Form.Control
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter author name"
                  />
                  <Form.Control.Feedback type="invalid">
                    Author is required.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            {/* Second row: Year and ISBN */}
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Publication Year *</Form.Label>
                  <Form.Control
                    type="number"
                    name="publicationYear"
                    value={formData.publicationYear}
                    onChange={handleInputChange}
                    required
                    min="1000"
                    max={new Date().getFullYear()}
                    placeholder="Ex: 2023"
                  />
                  <Form.Control.Feedback type="invalid">
                    Publication year is required and must be valid.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>ISBN *</Form.Label>
                  <Form.Control
                    type="text"
                    name="isbn"
                    value={formData.isbn}
                    onChange={handleInputChange}
                    required
                    placeholder="Ex: 978-0-7475-3269-9"
                  />
                  <Form.Control.Feedback type="invalid">
                    ISBN is required.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            {/* Description (optional) */}
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter book description (optional)"
              />
            </Form.Group>

            {/* Status (visible only in edit mode) */}
            {isEditing && (
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="AVAILABLE">Available</option>
                  <option value="BORROWED">Borrowed</option>
                  <option value="RESERVED">Reserved</option>
                  <option value="LOST">Lost</option>
                  <option value="DAMAGED">Damaged</option>
                </Form.Select>
              </Form.Group>
            )}

            {/* Action buttons */}
            <div className="d-flex gap-2">
              <Button 
                type="submit" 
                variant="primary" 
                disabled={loading}
              >
                {loading ? 'Saving...' : (isEditing ? 'Update' : 'Add')}
              </Button>
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => navigate('/books')}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BookForm;
