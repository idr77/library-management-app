package com.library.management.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.library.management.model.Book;
import com.library.management.model.BookStatus;
import com.library.management.repository.BookRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private BookRepository bookRepository;

    @Override
    public void run(String... args) throws Exception {
        // Ajouter des livres de test si la base est vide
        if (bookRepository.count() == 0) {
            addSampleBooks();
        }
    }

    private void addSampleBooks() {
        Book book1 = new Book();
        book1.setTitle("Le Petit Prince");
        book1.setAuthor("Antoine de Saint-Exupéry");
        book1.setDescription("Un conte poétique et philosophique sous l'apparence d'un livre pour enfants.");
        book1.setPublicationYear(1943);
        book1.setIsbn("978-2-07-040850-4");
        book1.setStatus(BookStatus.AVAILABLE);
        bookRepository.save(book1);

        Book book2 = new Book();
        book2.setTitle("1984");
        book2.setAuthor("George Orwell");
        book2.setDescription("Un roman d'anticipation dystopique décrivant une société totalitaire.");
        book2.setPublicationYear(1949);
        book2.setIsbn("978-2-07-036822-8");
        book2.setStatus(BookStatus.AVAILABLE);
        bookRepository.save(book2);

        Book book3 = new Book();
        book3.setTitle("Le Seigneur des Anneaux");
        book3.setAuthor("J.R.R. Tolkien");
        book3.setDescription("Une épopée fantasy en trois volumes.");
        book3.setPublicationYear(1954);
        book3.setIsbn("978-2-07-061288-7");
        book3.setStatus(BookStatus.BORROWED);
        bookRepository.save(book3);

        Book book4 = new Book();
        book4.setTitle("Clean Code");
        book4.setAuthor("Robert C. Martin");
        book4.setDescription("Un guide pour écrire du code propre et maintenable.");
        book4.setPublicationYear(2008);
        book4.setIsbn("978-0-13-235088-4");
        book4.setStatus(BookStatus.AVAILABLE);
        bookRepository.save(book4);

        Book book5 = new Book();
        book5.setTitle("Design Patterns");
        book5.setAuthor("Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides");
        book5.setDescription("Les 23 patterns de conception fondamentaux.");
        book5.setPublicationYear(1994);
        book5.setIsbn("978-0-201-63361-0");
        book5.setStatus(BookStatus.AVAILABLE);
        bookRepository.save(book5);

        System.out.println("✅ Données de test ajoutées avec succès !");
    }
}
