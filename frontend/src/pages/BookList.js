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

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await bookService.getAllBooks();
      setBooks(data);
    } catch (err) {
      setError('Erreur lors du chargement des livres');
      console.error('Erreur fetchBooks:', err);
    } finally {
      setLoading(false);
    }
  };

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
      setError('Erreur lors de la recherche');
      console.error('Erreur search:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBorrow = async (id) => {
    try {
      await bookService.borrowBook(id);
      fetchBooks(); // Recharger la liste
    } catch (err) {
      setError('Erreur lors de l\'emprunt');
      console.error('Erreur borrow:', err);
    }
  };

  const handleReturn = async (id) => {
    try {
      await bookService.returnBook(id);
      fetchBooks(); // Recharger la liste
    } catch (err) {
      setError('Erreur lors du retour');
      console.error('Erreur return:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await bookService.deleteBook(bookToDelete.id);
      setShowDeleteModal(false);
      setBookToDelete(null);
      fetchBooks(); // Recharger la liste
    } catch (err) {
      setError('Erreur lors de la suppression');
      console.error('Erreur delete:', err);
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

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Liste des livres</h1>
        <Button as={Link} to="/books/new" variant="primary">
          Ajouter un livre
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="mb-3">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Rechercher par titre, auteur ou ISBN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button variant="outline-secondary" onClick={handleSearch}>
            Rechercher
          </Button>
          {searchTerm && (
            <Button variant="outline-secondary" onClick={() => { setSearchTerm(''); fetchBooks(); }}>
              Effacer
            </Button>
          )}
        </InputGroup>
      </div>

      {books.length === 0 ? (
        <Alert variant="info">
          Aucun livre trouvé. {searchTerm && 'Essayez de modifier votre recherche.'}
        </Alert>
      ) : (
        <Table responsive striped hover>
          <thead>
            <tr>
              <th>Titre</th>
              <th>Auteur</th>
              <th>Année</th>
              <th>ISBN</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
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
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => navigate(`/books/${book.id}`)}
                    >
                      Voir
                    </Button>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => navigate(`/books/${book.id}/edit`)}
                    >
                      Modifier
                    </Button>
                    {book.status === 'AVAILABLE' ? (
                      <Button
                        variant="outline-warning"
                        size="sm"
                        onClick={() => handleBorrow(book.id)}
                      >
                        Emprunter
                      </Button>
                    ) : book.status === 'BORROWED' ? (
                      <Button
                        variant="outline-success"
                        size="sm"
                        onClick={() => handleReturn(book.id)}
                      >
                        Retourner
                      </Button>
                    ) : null}
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => {
                        setBookToDelete(book);
                        setShowDeleteModal(true);
                      }}
                    >
                      Supprimer
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmer la suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr de vouloir supprimer le livre "{bookToDelete?.title}" ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Annuler
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BookList;
