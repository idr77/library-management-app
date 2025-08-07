import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const bookService = {
  // Récupérer tous les livres
  getAllBooks: async () => {
    const response = await api.get('/books');
    return response.data;
  },

  // Récupérer un livre par ID
  getBookById: async (id) => {
    const response = await api.get(`/books/${id}`);
    return response.data;
  },

  // Créer un nouveau livre
  createBook: async (bookData) => {
    const response = await api.post('/books', bookData);
    return response.data;
  },

  // Mettre à jour un livre
  updateBook: async (id, bookData) => {
    const response = await api.put(`/books/${id}`, bookData);
    return response.data;
  },

  // Supprimer un livre
  deleteBook: async (id) => {
    const response = await api.delete(`/books/${id}`);
    return response.data;
  },

  // Rechercher des livres
  searchBooks: async (keyword) => {
    const response = await api.get(`/books/search?keyword=${encodeURIComponent(keyword)}`);
    return response.data;
  },

  // Récupérer les livres par statut
  getBooksByStatus: async (status) => {
    const response = await api.get(`/books/status/${status}`);
    return response.data;
  },

  // Emprunter un livre
  borrowBook: async (id) => {
    const response = await api.post(`/books/${id}/borrow`);
    return response.data;
  },

  // Retourner un livre
  returnBook: async (id) => {
    const response = await api.post(`/books/${id}/return`);
    return response.data;
  },

  // Récupérer les statistiques
  getStats: async () => {
    const response = await api.get('/books/stats');
    return response.data;
  },
};

export default api;
