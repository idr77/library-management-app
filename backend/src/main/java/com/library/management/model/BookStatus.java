package com.library.management.model;

public enum BookStatus {
    AVAILABLE("Disponible"),
    BORROWED("Emprunté"),
    RESERVED("Réservé"),
    LOST("Perdu"),
    DAMAGED("Endommagé");
    
    private final String displayName;
    
    BookStatus(String displayName) {
        this.displayName = displayName;
    }
    
    public String getDisplayName() {
        return displayName;
    }
}
