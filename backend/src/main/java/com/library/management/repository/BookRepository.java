package com.library.management.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.library.management.model.Book;
import com.library.management.model.BookStatus;

/**
 * Repository interface for managing books in the database.
 * 
 * This interface extends JpaRepository to provide basic CRUD operations
 * and defines custom search methods for books. It uses Spring Data JPA
 * to automatically generate implementations of query methods.
 * 
 * Search methods support searching by title, author, status, ISBN,
 * and general text search.
 * 
 * @author Library Management System
 * @version 1.0
 * @since 1.0
 */
@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    
    /**
     * Searches books by title (case-insensitive search).
     * 
     * @param title The title or part of the title to search for
     * @return List of books whose title contains the searched string
     */
    List<Book> findByTitleContainingIgnoreCase(String title);
    
    /**
     * Searches books by author (case-insensitive search).
     * 
     * @param author The author name or part of the name to search for
     * @return List of books whose author contains the searched string
     */
    List<Book> findByAuthorContainingIgnoreCase(String author);
    
    /**
     * Searches books by status.
     * 
     * @param status The status of books to search for
     * @return List of books with the specified status
     */
    List<Book> findByStatus(BookStatus status);
    
    /**
     * Searches a book by its ISBN number.
     * 
     * @param isbn The ISBN number of the book to search for
     * @return Optional containing the book if it exists, otherwise Optional.empty()
     */
    Optional<Book> findByIsbn(String isbn);
    
    /**
     * Searches books by keyword in title, author or ISBN.
     * The search is case-insensitive and uses the LIKE operator.
     * 
     * @param keyword The keyword to search for
     * @return List of books matching the search criteria
     */
    @Query("SELECT b FROM Book b WHERE " +
           "LOWER(b.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(b.author) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(b.isbn) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Book> searchBooks(@Param("keyword") String keyword);
    
    /**
     * Checks if a book exists with the specified ISBN.
     * 
     * @param isbn The ISBN number to check
     * @return true if a book with this ISBN exists, false otherwise
     */
    boolean existsByIsbn(String isbn);
    
    /**
     * Counts the number of books with a specific status.
     * 
     * @param status The status of books to count
     * @return The number of books with the specified status
     */
    @Query("SELECT COUNT(b) FROM Book b WHERE b.status = :status")
    long countByStatus(@Param("status") BookStatus status);
}
