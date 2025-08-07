package com.library.management.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.library.management.model.Book;
import com.library.management.model.BookStatus;
import com.library.management.repository.BookRepository;

/**
 * Data initializer for the library management application.
 * 
 * This class runs at application startup and adds test data
 * if the database is empty. It implements CommandLineRunner
 * to execute automatically after Spring context startup.
 * 
 * Test data includes several classic and technical books
 * with different statuses to demonstrate application features.
 * 
 * @author Library Management System
 * @version 1.0
 * @since 1.0
 */
@Component
public class DataInitializer implements CommandLineRunner {

    /**
     * Repository for accessing book data.
     * Automatically injected by Spring.
     */
    @Autowired
    private BookRepository bookRepository;

    /**
     * Method executed at application startup.
     * 
     * This method checks if the database contains books.
     * If it's empty, it adds test data to allow immediate
     * testing of application features.
     * 
     * @param args Command line arguments (not used)
     * @throws Exception In case of error during initialization
     */
    @Override
    public void run(String... args) throws Exception {
        // Add test books if database is empty
        if (bookRepository.count() == 0) {
            addSampleBooks();
        }
    }

    /**
     * Adds test books to the database.
     * 
     * This method creates several books with varied information
     * to demonstrate different application features:
     * - Classic and technical books
     * - Different statuses (available, borrowed)
     * - Detailed descriptions
     * - Unique ISBNs
     */
    private void addSampleBooks() {
        // Book 1: The Little Prince
        Book book1 = new Book();
        book1.setTitle("The Little Prince");
        book1.setAuthor("Antoine de Saint-Exupéry");
        book1.setDescription("A poetic and philosophical tale under the guise of a children's book.");
        book1.setPublicationYear(1943);
        book1.setIsbn("978-2-07-040850-4");
        book1.setStatus(BookStatus.AVAILABLE);
        bookRepository.save(book1);

        // Book 2: 1984
        Book book2 = new Book();
        book2.setTitle("1984");
        book2.setAuthor("George Orwell");
        book2.setDescription("A dystopian science fiction novel describing a totalitarian society.");
        book2.setPublicationYear(1949);
        book2.setIsbn("978-2-07-036822-8");
        book2.setStatus(BookStatus.AVAILABLE);
        bookRepository.save(book2);

        // Book 3: The Lord of the Rings (borrowed)
        Book book3 = new Book();
        book3.setTitle("The Lord of the Rings");
        book3.setAuthor("J.R.R. Tolkien");
        book3.setDescription("A fantasy epic in three volumes.");
        book3.setPublicationYear(1954);
        book3.setIsbn("978-2-07-061288-7");
        book3.setStatus(BookStatus.BORROWED);
        bookRepository.save(book3);

        // Book 4: Clean Code
        Book book4 = new Book();
        book4.setTitle("Clean Code");
        book4.setAuthor("Robert C. Martin");
        book4.setDescription("A guide for writing clean and maintainable code.");
        book4.setPublicationYear(2008);
        book4.setIsbn("978-0-13-235088-4");
        book4.setStatus(BookStatus.AVAILABLE);
        bookRepository.save(book4);

        // Book 5: Design Patterns
        Book book5 = new Book();
        book5.setTitle("Design Patterns");
        book5.setAuthor("Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides");
        book5.setDescription("The 23 fundamental design patterns.");
        book5.setPublicationYear(1994);
        book5.setIsbn("978-0-201-63361-0");
        book5.setStatus(BookStatus.AVAILABLE);
        bookRepository.save(book5);

        System.out.println("✅ Test data added successfully!");
    }
}
