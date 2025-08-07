#!/bin/bash

echo "========================================"
echo "  Application de Gestion de Bibliothèque"
echo "========================================"
echo

echo "Démarrage du backend Spring Boot..."
cd backend
gnome-terminal --title="Backend" -- bash -c "mvn spring-boot:run; exec bash" &
cd ..

echo
echo "Attente de 10 secondes pour le démarrage du backend..."
sleep 10

echo
echo "Démarrage du frontend React..."
cd frontend
gnome-terminal --title="Frontend" -- bash -c "npm install && npm start; exec bash" &
cd ..

echo
echo "========================================"
echo "  Application en cours de démarrage..."
echo "========================================"
echo
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:8080"
echo "H2 Console: http://localhost:8080/h2-console"
echo
echo "Appuyez sur Entrée pour fermer cette fenêtre..."
read
