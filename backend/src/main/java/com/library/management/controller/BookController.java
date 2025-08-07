package com.library.management.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.library.management.model.Book;
import com.library.management.model.BookStatus;
import com.library.management.service.BookService;

import jakarta.validation.Valid;

/**
 * REST controller for managing books in the library API.
 * 
 * This controller exposes REST endpoints for all book-related operations:
 * CRUD, search, borrow, return and statistics. It handles HTTP requests
 * and returns appropriate responses with corresponding HTTP status codes.
 * 
 * The controller includes error handling and validation of input data
 * with error messages in English.
 * 
 * @author Library Management System
 * @version 1.0
 * @since 1.0
 */
@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {
    
    /**
     * Service for managing books.
     * Automatically injected by Spring.
     */
    @Autowired
    private BookService bookService;
    
    /**
     * Retrieves all books from the library.
     * 
     * @return ResponseEntity containing the list of all books
     */
    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> books = bookService.getAllBooks();
        return ResponseEntity.ok(books);
    }
    
    /**
     * Retrieves a book by its identifier.
     * 
     * @param id The book identifier to retrieve
     * @return ResponseEntity containing the book if it exists, otherwise 404 Not Found
     */
    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        return bookService.getBookById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * Creates a new book in the library.
     * 
     * @param book The book to create (automatically validated)
     * @return ResponseEntity with the created book and 201 Created status
     * @throws RuntimeException if a book with the same ISBN already exists
     */
    @PostMapping
    public ResponseEntity<?> createBook(@Valid @RequestBody Book book) {
        try {
            Book createdBook = bookService.createBook(book);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdBook);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    /**
     * Updates an existing book.
     * 
     * @param id The book identifier to modify
     * @param bookDetails The new book data (automatically validated)
     * @return ResponseEntity with the updated book
     * @throws RuntimeException if the book doesn't exist
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateBook(@PathVariable Long id, @Valid @RequestBody Book bookDetails) {
        try {
            Book updatedBook = bookService.updateBook(id, bookDetails);
            return ResponseEntity.ok(updatedBook);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    /**
     * Deletes a book from the library.
     * 
     * @param id The book identifier to delete
     * @return ResponseEntity with 200 OK status if deletion succeeds
     * @throws RuntimeException if the book doesn't exist
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable Long id) {
        try {
            bookService.deleteBook(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    /**
     * Searches books by keyword.
     * The search is performed in title, author and ISBN.
     * 
     * @param keyword The search keyword
     * @return ResponseEntity containing the list of matching books
     */
    @GetMapping("/search")
    public ResponseEntity<List<Book>> searchBooks(@RequestParam String keyword) {
        List<Book> books = bookService.searchBooks(keyword);
        return ResponseEntity.ok(books);
    }
    
    /**
     * Retrieves books with a specific status.
     * 
     * @param status The status of books to retrieve
     * @return ResponseEntity containing the list of books with the specified status
     */
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Book>> getBooksByStatus(@PathVariable BookStatus status) {
        List<Book> books = bookService.getBooksByStatus(status);
        return ResponseEntity.ok(books);
    }
    
    /**
     * Borrows a book by changing its status from AVAILABLE to BORROWED.
     * 
     * @param id The book identifier to borrow
     * @return ResponseEntity with the updated book
     * @throws RuntimeException if the book is not available or doesn't exist
     */
    @PostMapping("/{id}/borrow")
    public ResponseEntity<?> borrowBook(@PathVariable Long id) {
        try {
            Book borrowedBook = bookService.borrowBook(id);
            return ResponseEntity.ok(borrowedBook);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    /**
     * Returns a book by changing its status from BORROWED to AVAILABLE.
     * 
     * @param id The book identifier to return
     * @return ResponseEntity with the updated book
     * @throws RuntimeException if the book is not borrowed or doesn't exist
     */
    @PostMapping("/{id}/return")
    public ResponseEntity<?> returnBook(@PathVariable Long id) {
        try {
            Book returnedBook = bookService.returnBook(id);
            return ResponseEntity.ok(returnedBook);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    /**
     * Retrieves library statistics.
     * Returns the number of available and borrowed books.
     * 
     * @return ResponseEntity containing the statistics in JSON format
     */
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Long>> getBookStats() {
        long availableCount = bookService.getAvailableBooksCount();
        long borrowedCount = bookService.getBorrowedBooksCount();
        
        Map<String, Long> stats = Map.of(
            "available", availableCount,
            "borrowed", borrowedCount
        );
        
        return ResponseEntity.ok(stats);
    }
}
