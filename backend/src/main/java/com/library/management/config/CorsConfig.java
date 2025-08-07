package com.library.management.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * CORS (Cross-Origin Resource Sharing) configuration for the library API.
 * 
 * This class configures CORS parameters to allow the React frontend
 * to access the backend API from a different domain. It defines the
 * allowed origins, HTTP methods and accepted headers.
 * 
 * The configuration specifically allows access from localhost:3000
 * (React frontend) to the backend API.
 * 
 * @author Library Management System
 * @version 1.0
 * @since 1.0
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    /**
     * Configures CORS mappings for API endpoints.
     * 
     * This method defines CORS rules for all endpoints
     * starting with /api/. It allows requests from localhost:3000
     * and permits all common HTTP methods.
     * 
     * @param registry The CORS registry to configure mappings
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }

    /**
     * Creates a CORS configuration source for security.
     * 
     * This method provides an alternative CORS configuration
     * that can be used by Spring Security if needed.
     * It defines more permissive rules for development.
     * 
     * @return CorsConfigurationSource configured for the API
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // Allow all origins for development
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        // Allow common HTTP methods
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        // Allow all headers
        configuration.setAllowedHeaders(Arrays.asList("*"));
        // Allow sending cookies and authentication information
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration);
        return source;
    }
}
