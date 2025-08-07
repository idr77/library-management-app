package com.library.management.model;

/**
 * Enumeration representing the different possible statuses of a book in the library.
 * 
 * This enumeration defines all the states a book can have in the library
 * management system. Each status has a display name in English for the user interface.
 * 
 * @author Library Management System
 * @version 1.0
 * @since 1.0
 */
public enum BookStatus {
    /**
     * The book is available for borrowing.
     * This is the default status for a new book.
     */
    AVAILABLE("Available"),
    
    /**
     * The book is currently borrowed by a user.
     * It cannot be borrowed again until it is returned.
     */
    BORROWED("Borrowed"),
    
    /**
     * The book is reserved for a specific user.
     * It will be available for this user on a given date.
     */
    RESERVED("Reserved"),
    
    /**
     * The book has been lost and is no longer in the library.
     * It can no longer be borrowed.
     */
    LOST("Lost"),
    
    /**
     * The book is damaged and can no longer be borrowed.
     * It may require repair or replacement.
     */
    DAMAGED("Damaged");
    
    /**
     * The display name in English for this status.
     * Used in the user interface.
     */
    private final String displayName;
    
    /**
     * Private constructor for the enumeration.
     * 
     * @param displayName The display name in English for this status
     */
    BookStatus(String displayName) {
        this.displayName = displayName;
    }
    
    /**
     * Gets the display name in English for this status.
     * 
     * @return The display name in English
     */
    public String getDisplayName() {
        return displayName;
    }
}
