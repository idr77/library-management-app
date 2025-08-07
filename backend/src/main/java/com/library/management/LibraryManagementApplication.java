package com.library.management;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main class of the library management application.
 * 
 * This class is the entry point of the Spring Boot application.
 * It uses the @SpringBootApplication annotation which combines:
 * - @Configuration : Marks the class as a source of bean definitions
 * - @EnableAutoConfiguration : Enables Spring Boot auto-configuration
 * - @ComponentScan : Enables component scanning in the package
 * 
 * The application exposes a REST API for book management
 * and uses an H2 in-memory database by default.
 * 
 * @author Library Management System
 * @version 1.0
 * @since 1.0
 */
@SpringBootApplication
public class LibraryManagementApplication {

    /**
     * Main entry point of the application.
     * 
     * This method starts the Spring Boot application by launching
     * the application context and starting the embedded server.
     * 
     * @param args Command line arguments (optional)
     */
    public static void main(String[] args) {
        SpringApplication.run(LibraryManagementApplication.class, args);
    }
}
