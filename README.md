# 📚 Application de Gestion de Bibliothèque

Une application complète de gestion de bibliothèque construite avec Spring Boot, React et Docker.

## 🚀 Technologies utilisées

### Backend
- **Spring Boot 3.2.0** - Framework Java
- **Spring Data JPA** - Persistance des données
- **H2 Database** - Base de données en mémoire
- **Maven** - Gestion des dépendances

### Frontend
- **React 18** - Framework JavaScript
- **React Router** - Navigation
- **React Bootstrap** - Interface utilisateur
- **Axios** - Client HTTP
- **Bootstrap 5** - Framework CSS

### DevOps
- **Docker** - Conteneurisation
- **Docker Compose** - Orchestration

## 📋 Fonctionnalités

- ✅ Gestion complète des livres (CRUD)
- ✅ Recherche de livres par titre, auteur ou ISBN
- ✅ Gestion des statuts (disponible, emprunté, réservé, etc.)
- ✅ Emprunt et retour de livres
- ✅ Interface utilisateur moderne et responsive
- ✅ API REST complète
- ✅ Conteneurisation avec Docker

## 🛠️ Installation et démarrage

### Prérequis
- Java 17 ou supérieur
- Node.js 18 ou supérieur
- Docker et Docker Compose (optionnel)

### Option 1: Démarrage local

#### Backend
```bash
cd backend
mvn spring-boot:run
```

#### Frontend
```bash
cd frontend
npm install
npm start
```

### Option 2: Démarrage avec Docker

```bash
# Construire et démarrer tous les services
docker-compose up --build

# Ou en arrière-plan
docker-compose up -d --build
```

## 🌐 Accès à l'application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api
- **Console H2**: http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:mem:testdb`
  - Username: `sa`
  - Password: `password`

## 📚 API Endpoints

### Livres
- `GET /api/books` - Récupérer tous les livres
- `GET /api/books/{id}` - Récupérer un livre par ID
- `POST /api/books` - Créer un nouveau livre
- `PUT /api/books/{id}` - Mettre à jour un livre
- `DELETE /api/books/{id}` - Supprimer un livre
- `GET /api/books/search?keyword={keyword}` - Rechercher des livres
- `GET /api/books/status/{status}` - Récupérer les livres par statut
- `POST /api/books/{id}/borrow` - Emprunter un livre
- `POST /api/books/{id}/return` - Retourner un livre
- `GET /api/books/stats` - Récupérer les statistiques

## 🏗️ Structure du projet

```
library-management-app/
├── backend/
│   ├── src/main/java/com/library/management/
│   │   ├── controller/
│   │   ├── model/
│   │   ├── repository/
│   │   └── service/
│   ├── src/main/resources/
│   ├── pom.xml
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## 🧪 Tests

### Backend
```bash
cd backend
mvn test
```

### Frontend
```bash
cd frontend
npm test
```

## 🐳 Commandes Docker utiles

```bash
# Construire les images
docker-compose build

# Démarrer les services
docker-compose up

# Arrêter les services
docker-compose down

# Voir les logs
docker-compose logs -f

# Reconstruire et redémarrer
docker-compose up --build
```

## 📝 Modèle de données

### Livre (Book)
- `id` - Identifiant unique
- `title` - Titre du livre
- `author` - Auteur
- `description` - Description (optionnel)
- `publicationYear` - Année de publication
- `isbn` - Numéro ISBN
- `status` - Statut (AVAILABLE, BORROWED, RESERVED, LOST, DAMAGED)
- `createdAt` - Date de création
- `updatedAt` - Date de modification

## 🎯 Fonctionnalités à venir

- [ ] Gestion des utilisateurs et authentification
- [ ] Gestion des emprunts avec dates
- [ ] Notifications et rappels
- [ ] Génération de rapports
- [ ] Import/export de données
- [ ] Interface d'administration

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👨‍💻 Auteur

**Eric Diallo** - Développeur Java passionné

---

*Ce projet a été créé pour s'entraîner sur Spring Boot, React et Docker afin de valoriser le profil de développeur Java.*
