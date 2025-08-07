import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { bookService } from '../services/api';

const BookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    publicationYear: '',
    isbn: '',
    status: 'AVAILABLE'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (isEditing) {
      fetchBook();
    }
  }, [id]);

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
      setError('Erreur lors du chargement du livre');
      console.error('Erreur fetchBook:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const bookData = {
        ...formData,
        publicationYear: parseInt(formData.publicationYear)
      };

      if (isEditing) {
        await bookService.updateBook(id, bookData);
      } else {
        await bookService.createBook(bookData);
      }

      navigate('/books');
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors de la sauvegarde');
      console.error('Erreur submit:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-4">
        {isEditing ? 'Modifier le livre' : 'Ajouter un nouveau livre'}
      </h1>

      {error && <Alert variant="danger">{error}</Alert>}

      <Card>
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Titre *</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Entrez le titre du livre"
                  />
                  <Form.Control.Feedback type="invalid">
                    Le titre est obligatoire.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Auteur *</Form.Label>
                  <Form.Control
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    required
                    placeholder="Entrez le nom de l'auteur"
                  />
                  <Form.Control.Feedback type="invalid">
                    L'auteur est obligatoire.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Année de publication *</Form.Label>
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
                    L'année de publication est obligatoire et doit être valide.
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
                    L'ISBN est obligatoire.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Entrez une description du livre (optionnel)"
              />
            </Form.Group>

            {isEditing && (
              <Form.Group className="mb-3">
                <Form.Label>Statut</Form.Label>
                <Form.Select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="AVAILABLE">Disponible</option>
                  <option value="BORROWED">Emprunté</option>
                  <option value="RESERVED">Réservé</option>
                  <option value="LOST">Perdu</option>
                  <option value="DAMAGED">Endommagé</option>
                </Form.Select>
              </Form.Group>
            )}

            <div className="d-flex gap-2">
              <Button 
                type="submit" 
                variant="primary" 
                disabled={loading}
              >
                {loading ? 'Sauvegarde...' : (isEditing ? 'Mettre à jour' : 'Ajouter')}
              </Button>
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => navigate('/books')}
              >
                Annuler
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BookForm;
