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

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      setLoading(true);
      const data = await bookService.getBookById(id);
      setBook(data);
    } catch (err) {
      setError('Erreur lors du chargement du livre');
      console.error('Erreur fetchBook:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBorrow = async () => {
    try {
      await bookService.borrowBook(id);
      fetchBook(); // Recharger les détails
    } catch (err) {
      setError('Erreur lors de l\'emprunt');
      console.error('Erreur borrow:', err);
    }
  };

  const handleReturn = async () => {
    try {
      await bookService.returnBook(id);
      fetchBook(); // Recharger les détails
    } catch (err) {
      setError('Erreur lors du retour');
      console.error('Erreur return:', err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce livre ?')) {
      try {
        await bookService.deleteBook(id);
        navigate('/books');
      } catch (err) {
        setError('Erreur lors de la suppression');
        console.error('Erreur delete:', err);
      }
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'AVAILABLE': { bg: 'success', text: 'Disponible' },
      'BORROWED': { bg: 'warning', text: 'Emprunté' },
      'RESERVED': { bg: 'info', text: 'Réservé' },
      'LOST': { bg: 'danger', text: 'Perdu' },
      'DAMAGED': { bg: 'secondary', text: 'Endommagé' }
    };
    
    const statusInfo = statusMap[status] || { bg: 'secondary', text: status };
    return <Badge bg={statusInfo.bg}>{statusInfo.text}</Badge>;
  };

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!book) {
    return <Alert variant="warning">Livre non trouvé</Alert>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Détails du livre</h1>
        <ButtonGroup>
          <Button 
            variant="outline-secondary" 
            onClick={() => navigate(`/books/${id}/edit`)}
          >
            Modifier
          </Button>
          <Button 
            variant="outline-danger" 
            onClick={handleDelete}
          >
            Supprimer
          </Button>
        </ButtonGroup>
      </div>

      <Card>
        <Card.Body>
          <Row>
            <Col md={8}>
              <h2>{book.title}</h2>
              <p className="text-muted mb-3">par {book.author}</p>
              
              {book.description && (
                <div className="mb-4">
                  <h5>Description</h5>
                  <p>{book.description}</p>
                </div>
              )}

              <Row className="mb-4">
                <Col md={6}>
                  <h5>Informations</h5>
                  <ul className="list-unstyled">
                    <li><strong>Année de publication:</strong> {book.publicationYear}</li>
                    <li><strong>ISBN:</strong> {book.isbn}</li>
                    <li><strong>Statut:</strong> {getStatusBadge(book.status)}</li>
                    <li><strong>Ajouté le:</strong> {new Date(book.createdAt).toLocaleDateString('fr-FR')}</li>
                    {book.updatedAt && (
                      <li><strong>Modifié le:</strong> {new Date(book.updatedAt).toLocaleDateString('fr-FR')}</li>
                    )}
                  </ul>
                </Col>
              </Row>

              <div className="d-flex gap-2">
                {book.status === 'AVAILABLE' ? (
                  <Button 
                    variant="warning" 
                    onClick={handleBorrow}
                  >
                    Emprunter ce livre
                  </Button>
                ) : book.status === 'BORROWED' ? (
                  <Button 
                    variant="success" 
                    onClick={handleReturn}
                  >
                    Retourner ce livre
                  </Button>
                ) : null}
                
                <Button 
                  variant="outline-secondary" 
                  onClick={() => navigate('/books')}
                >
                  Retour à la liste
                </Button>
              </div>
            </Col>
            
            <Col md={4}>
              <Card className="bg-light">
                <Card.Body>
                  <h5>Actions rapides</h5>
                  <div className="d-grid gap-2">
                    <Button 
                      variant="outline-primary" 
                      onClick={() => navigate(`/books/${id}/edit`)}
                    >
                      Modifier
                    </Button>
                    {book.status === 'AVAILABLE' && (
                      <Button 
                        variant="outline-warning" 
                        onClick={handleBorrow}
                      >
                        Emprunter
                      </Button>
                    )}
                    {book.status === 'BORROWED' && (
                      <Button 
                        variant="outline-success" 
                        onClick={handleReturn}
                      >
                        Retourner
                      </Button>
                    )}
                    <Button 
                      variant="outline-danger" 
                      onClick={handleDelete}
                    >
                      Supprimer
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
