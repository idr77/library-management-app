package com.library.management.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.library.management.model.Book;
import com.library.management.model.BookStatus;
import com.library.management.repository.BookRepository;

/**
 * Service for managing books in the library system.
 * 
 * This class contains all the business logic for book management,
 * including CRUD operations, search, borrowing and returning books.
 * It acts as a bridge between controllers and repository, applying
 * business rules and data validation.
 * 
 * The service also manages book state transitions (available ↔ borrowed)
 * and provides statistics on the library state.
 * 
 * @author Library Management System
 * @version 1.0
 * @since 1.0
 */
@Service
public class BookService {
    
    /**
     * Repository for accessing book data.
     * Automatically injected by Spring.
     */
    @Autowired
    private BookRepository bookRepository;
    
    /**
     * Retrieves all books from the library.
     * 
     * @return List of all books
     */
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }
    
    /**
     * Retrieves a book by its identifier.
     * 
     * @param id The book identifier to retrieve
     * @return Optional containing the book if it exists, otherwise Optional.empty()
     */
    public Optional<Book> getBookById(Long id) {
        return bookRepository.findById(id);
    }
    
    /**
     * Creates a new book in the library.
     * Checks that the ISBN doesn't already exist before creation.
     * 
     * @param book The book to create
     * @return The created book with generated identifier
     * @throws RuntimeException if a book with the same ISBN already exists
     */
    public Book createBook(Book book) {
        if (bookRepository.existsByIsbn(book.getIsbn())) {
            throw new RuntimeException("A book with this ISBN already exists");
        }
        return bookRepository.save(book);
    }
    
    /**
     * Updates an existing book.
     * Retrieves the book by its ID and updates all its properties.
     * 
     * @param id The book identifier to modify
     * @param bookDetails The new book data
     * @return The updated book
     * @throws RuntimeException if the book doesn't exist
     */
    public Book updateBook(Long id, Book bookDetails) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found with id: " + id));
        
        // Update all properties
        book.setTitle(bookDetails.getTitle());
        book.setAuthor(bookDetails.getAuthor());
        book.setDescription(bookDetails.getDescription());
        book.setPublicationYear(bookDetails.getPublicationYear());
        book.setIsbn(bookDetails.getIsbn());
        book.setStatus(bookDetails.getStatus());
        
        return bookRepository.save(book);
    }
    
    /**
     * Deletes a book from the library.
     * 
     * @param id The book identifier to delete
     * @throws RuntimeException if the book doesn't exist
     */
    public void deleteBook(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found with id: " + id));
        bookRepository.delete(book);
    }
    
    /**
     * Searches books by keyword.
     * The search is performed in title, author and ISBN.
     * 
     * @param keyword The search keyword
     * @return List of books matching the search criteria
     */
    public List<Book> searchBooks(String keyword) {
        return bookRepository.searchBooks(keyword);
    }
    
    /**
     * Retrieves books with a specific status.
     * 
     * @param status The status of books to retrieve
     * @return List of books with the specified status
     */
    public List<Book> getBooksByStatus(BookStatus status) {
        return bookRepository.findByStatus(status);
    }
    
    /**
     * Borrows a book by changing its status from AVAILABLE to BORROWED.
     * Checks that the book is available before borrowing.
     * 
     * @param id The book identifier to borrow
     * @return The book with updated status
     * @throws RuntimeException if the book is not available or doesn't exist
     */
    public Book borrowBook(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found with id: " + id));
        
        if (book.getStatus() != BookStatus.AVAILABLE) {
            throw new RuntimeException("The book is not available for borrowing");
        }
        
        book.setStatus(BookStatus.BORROWED);
        return bookRepository.save(book);
    }
    
    /**
     * Returns a book by changing its status from BORROWED to AVAILABLE.
     * Checks that the book is borrowed before returning.
     * 
     * @param id The book identifier to return
     * @return The book with updated status
     * @throws RuntimeException if the book is not borrowed or doesn't exist
     */
    public Book returnBook(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found with id: " + id));
        
        if (book.getStatus() != BookStatus.BORROWED) {
            throw new RuntimeException("The book is not borrowed");
        }
        
        book.setStatus(BookStatus.AVAILABLE);
        return bookRepository.save(book);
    }
    
    /**
     * Counts the number of available books in the library.
     * 
     * @return The number of books with AVAILABLE status
     */
    public long getAvailableBooksCount() {
        return bookRepository.countByStatus(BookStatus.AVAILABLE);
    }
    
    /**
     * Counts the number of borrowed books in the library.
     * 
     * @return The number of books with BORROWED status
     */
    public long getBorrowedBooksCount() {
        return bookRepository.countByStatus(BookStatus.BORROWED);
    }
}
