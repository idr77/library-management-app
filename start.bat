@echo off
echo ========================================
echo   Application de Gestion de Bibliothèque
echo ========================================
echo.

echo Démarrage du backend Spring Boot...
cd backend
start "Backend" cmd /k "mvn spring-boot:run"
cd ..

echo.
echo Attente de 10 secondes pour le démarrage du backend...
timeout /t 10 /nobreak > nul

echo.
echo Démarrage du frontend React...
cd frontend
start "Frontend" cmd /k "npm install && npm start"
cd ..

echo.
echo ========================================
echo   Application en cours de démarrage...
echo ========================================
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:8080
echo H2 Console: http://localhost:8080/h2-console
echo.
echo Appuyez sur une touche pour fermer cette fenêtre...
pause > nul
