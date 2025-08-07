package com.library.management.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.library.management.model.Book;
import com.library.management.model.BookStatus;
import com.library.management.repository.BookRepository;

@Service
public class BookService {
    
    @Autowired
    private BookRepository bookRepository;
    
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }
    
    public Optional<Book> getBookById(Long id) {
        return bookRepository.findById(id);
    }
    
    public Book createBook(Book book) {
        if (bookRepository.existsByIsbn(book.getIsbn())) {
            throw new RuntimeException("Un livre avec cet ISBN existe déjà");
        }
        return bookRepository.save(book);
    }
    
    public Book updateBook(Long id, Book bookDetails) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Livre non trouvé avec l'id: " + id));
        
        book.setTitle(bookDetails.getTitle());
        book.setAuthor(bookDetails.getAuthor());
        book.setDescription(bookDetails.getDescription());
        book.setPublicationYear(bookDetails.getPublicationYear());
        book.setIsbn(bookDetails.getIsbn());
        book.setStatus(bookDetails.getStatus());
        
        return bookRepository.save(book);
    }
    
    public void deleteBook(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Livre non trouvé avec l'id: " + id));
        bookRepository.delete(book);
    }
    
    public List<Book> searchBooks(String keyword) {
        return bookRepository.searchBooks(keyword);
    }
    
    public List<Book> getBooksByStatus(BookStatus status) {
        return bookRepository.findByStatus(status);
    }
    
    public Book borrowBook(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Livre non trouvé avec l'id: " + id));
        
        if (book.getStatus() != BookStatus.AVAILABLE) {
            throw new RuntimeException("Le livre n'est pas disponible pour l'emprunt");
        }
        
        book.setStatus(BookStatus.BORROWED);
        return bookRepository.save(book);
    }
    
    public Book returnBook(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Livre non trouvé avec l'id: " + id));
        
        if (book.getStatus() != BookStatus.BORROWED) {
            throw new RuntimeException("Le livre n'est pas emprunté");
        }
        
        book.setStatus(BookStatus.AVAILABLE);
        return bookRepository.save(book);
    }
    
    public long getAvailableBooksCount() {
        return bookRepository.countByStatus(BookStatus.AVAILABLE);
    }
    
    public long getBorrowedBooksCount() {
        return bookRepository.countByStatus(BookStatus.BORROWED);
    }
}
