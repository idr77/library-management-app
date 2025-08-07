import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Badge, Alert } from 'react-bootstrap';
import { bookService } from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({ available: 0, borrowed: 0 });
  const [recentBooks, setRecentBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsData, booksData] = await Promise.all([
          bookService.getStats(),
          bookService.getAllBooks()
        ]);
        
        setStats(statsData);
        setRecentBooks(booksData.slice(0, 5)); // 5 derniers livres
      } catch (err) {
        setError('Erreur lors du chargement des données');
        console.error('Erreur dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

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

  return (
    <div>
      <h1 className="mb-4">Tableau de bord</h1>
      
      <Row className="mb-4">
        <Col md={6}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Livres disponibles</Card.Title>
              <h2 className="text-success">{stats.available}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Livres empruntés</Card.Title>
              <h2 className="text-warning">{stats.borrowed}</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5>Livres récents</h5>
            </Card.Header>
            <Card.Body>
              {recentBooks.length === 0 ? (
                <p className="text-muted">Aucun livre dans la bibliothèque</p>
              ) : (
                <div className="list-group list-group-flush">
                  {recentBooks.map((book) => (
                    <div key={book.id} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">{book.title}</h6>
                        <small className="text-muted">par {book.author}</small>
                      </div>
                      <Badge bg={book.status === 'AVAILABLE' ? 'success' : 'warning'}>
                        {book.status === 'AVAILABLE' ? 'Disponible' : 'Emprunté'}
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
