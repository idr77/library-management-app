import axios from 'axios';

/**
 * Backend API base URL
 * Entry point for all requests to the Spring Boot server
 */
const API_BASE_URL = 'http://localhost:8080/api';

/**
 * Axios instance configured with base parameters
 * Used for all HTTP requests to the API
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Service for managing all book-related operations
 * 
 * This service encapsulates all API calls to the backend
 * and provides a unified interface for book management.
 * 
 * @namespace bookService
 */
export const bookService = {
  /**
   * Retrieves all books from the library
   * 
   * @async
   * @function getAllBooks
   * @returns {Promise<Array>} List of all books
   * @throws {Error} In case of communication error with the API
   */
  getAllBooks: async () => {
    const response = await api.get('/books');
    return response.data;
  },

  /**
   * Retrieves a specific book by its ID
   * 
   * @async
   * @function getBookById
   * @param {number|string} id - The unique identifier of the book
   * @returns {Promise<Object>} The book details
   * @throws {Error} If the book doesn't exist or communication error
   */
  getBookById: async (id) => {
    const response = await api.get(`/books/${id}`);
    return response.data;
  },

  /**
   * Creates a new book in the library
   * 
   * @async
   * @function createBook
   * @param {Object} bookData - The book data to create
   * @param {string} bookData.title - The book title
   * @param {string} bookData.author - The book author
   * @param {string} [bookData.description] - The book description
   * @param {number} bookData.publicationYear - The publication year
   * @param {string} bookData.isbn - The book ISBN
   * @param {string} [bookData.status] - The book status (default: AVAILABLE)
   * @returns {Promise<Object>} The created book with generated ID
   * @throws {Error} If ISBN already exists or invalid data
   */
  createBook: async (bookData) => {
    const response = await api.post('/books', bookData);
    return response.data;
  },

  /**
   * Updates an existing book
   * 
   * @async
   * @function updateBook
   * @param {number|string} id - The book identifier to modify
   * @param {Object} bookData - The new book data
   * @returns {Promise<Object>} The updated book
   * @throws {Error} If the book doesn't exist or invalid data
   */
  updateBook: async (id, bookData) => {
    const response = await api.put(`/books/${id}`, bookData);
    return response.data;
  },

  /**
   * Deletes a book from the library
   * 
   * @async
   * @function deleteBook
   * @param {number|string} id - The book identifier to delete
   * @returns {Promise<Object>} Deletion confirmation
   * @throws {Error} If the book doesn't exist
   */
  deleteBook: async (id) => {
    const response = await api.delete(`/books/${id}`);
    return response.data;
  },

  /**
   * Searches books by keyword
   * 
   * The search is performed in title, author and ISBN
   * 
   * @async
   * @function searchBooks
   * @param {string} keyword - The search keyword
   * @returns {Promise<Array>} List of matching books
   * @throws {Error} In case of communication error
   */
  searchBooks: async (keyword) => {
    const response = await api.get(`/books/search?keyword=${encodeURIComponent(keyword)}`);
    return response.data;
  },

  /**
   * Retrieves books by status
   * 
   * @async
   * @function getBooksByStatus
   * @param {string} status - The status of books to retrieve
   * @returns {Promise<Array>} List of books with the specified status
   * @throws {Error} In case of communication error
   */
  getBooksByStatus: async (status) => {
    const response = await api.get(`/books/status/${status}`);
    return response.data;
  },

  /**
   * Borrows a book (changes status from AVAILABLE to BORROWED)
   * 
   * @async
   * @function borrowBook
   * @param {number|string} id - The book identifier to borrow
   * @returns {Promise<Object>} The book with updated status
   * @throws {Error} If the book is not available or doesn't exist
   */
  borrowBook: async (id) => {
    const response = await api.post(`/books/${id}/borrow`);
    return response.data;
  },

  /**
   * Returns a book (changes status from BORROWED to AVAILABLE)
   * 
   * @async
   * @function returnBook
   * @param {number|string} id - The book identifier to return
   * @returns {Promise<Object>} The book with updated status
   * @throws {Error} If the book is not borrowed or doesn't exist
   */
  returnBook: async (id) => {
    const response = await api.post(`/books/${id}/return`);
    return response.data;
  },

  /**
   * Retrieves library statistics
   * 
   * @async
   * @function getStats
   * @returns {Promise<Object>} Statistics with number of available and borrowed books
   * @returns {Object} stats - The statistics
   * @returns {number} stats.available - Number of available books
   * @returns {number} stats.borrowed - Number of borrowed books
   * @throws {Error} In case of communication error
   */
  getStats: async () => {
    const response = await api.get('/books/stats');
    return response.data;
  },
};

export default api;
