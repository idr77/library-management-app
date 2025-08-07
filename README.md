# 📚 Library Management Application

A complete library management application built with Spring Boot, React, and Docker.

## 🚀 Technologies Used

### Backend
- **Spring Boot 3.2.0** - Java Framework
- **Spring Data JPA** - Data Persistence
- **H2 Database** - In-memory Database
- **Maven** - Dependency Management

### Frontend
- **React 18** - JavaScript Framework
- **React Router** - Navigation
- **React Bootstrap** - User Interface
- **Axios** - HTTP Client
- **Bootstrap 5** - CSS Framework

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Orchestration

## 📋 Features

- ✅ Complete book management (CRUD)
- ✅ Book search by title, author, or ISBN
- ✅ Status management (available, borrowed, reserved, etc.)
- ✅ Book borrowing and returning
- ✅ Modern and responsive user interface
- ✅ Complete REST API
- ✅ Docker containerization

## 🛠️ Installation and Setup

### Prerequisites
- Java 17 or higher
- Node.js 18 or higher
- Docker and Docker Compose (optional)

### Option 1: Local Setup

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

### Option 2: Docker Setup

```bash
# Build and start all services
docker-compose up --build

# Or in background
docker-compose up -d --build
```

## 🌐 Application Access

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api
- **H2 Console**: http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:mem:testdb`
  - Username: `sa`
  - Password: `password`

## 📚 API Endpoints

### Books
- `GET /api/books` - Get all books
- `GET /api/books/{id}` - Get a book by ID
- `POST /api/books` - Create a new book
- `PUT /api/books/{id}` - Update a book
- `DELETE /api/books/{id}` - Delete a book
- `GET /api/books/search?keyword={keyword}` - Search books
- `GET /api/books/status/{status}` - Get books by status
- `POST /api/books/{id}/borrow` - Borrow a book
- `POST /api/books/{id}/return` - Return a book
- `GET /api/books/stats` - Get statistics

## 🏗️ Project Structure

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

## 🧪 Testing

(To be done)

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

## 🐳 Useful Docker Commands

```bash
# Build images
docker-compose build

# Start services
docker-compose up

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild and restart
docker-compose up --build
```

## 📝 Data Model

### Book
- `id` - Unique identifier
- `title` - Book title
- `author` - Author
- `description` - Description (optional)
- `publicationYear` - Publication year
- `isbn` - ISBN number
- `status` - Status (AVAILABLE, BORROWED, RESERVED, LOST, DAMAGED)
- `createdAt` - Creation date
- `updatedAt` - Last modification date

## 🎯 Upcoming Features

- [ ] User management and authentication
- [ ] Loan management with dates
- [ ] Notifications and reminders
- [ ] Report generation
- [ ] Data import/export
- [ ] Administration interface

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## 👨‍💻 Author

**Eric Diallo**

---
