````markdown
# Blog API

A simple, modular REST API for a blog system built with **NestJS**, featuring:

- User registration and login with **JWT authentication**
- CRUD operations for blog posts
- Adding and retrieving comments on posts
- Fetching posts along with their comments
- Integration with **PostgreSQL** database via **TypeORM**
- Implementation of **CQRS** and **Repository** patterns for clean architecture
- Input validation and robust error handling
- API documentation powered by **Swagger**
- Unit tests for core services
- Containerized with **Docker** and orchestrated via **docker-compose**

---

## Table of Contents

- [Installation](#installation)  
- [Configuration](#configuration)  
- [Running the Application](#running-the-application)  
- [API Documentation](#api-documentation)  
- [Testing](#testing)  
- [Docker](#docker)  
- [Project Structure](#project-structure)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Ermi1223/blog-api.git
   cd blog-api
````

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory with the following environment variables:

   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=your_db_user
   DB_PASSWORD=your_db_password
   DB_DATABASE=blog_db
   JWT_SECRET=your_jwt_secret
   ```

---

## Configuration

This project uses [TypeORM](https://typeorm.io/) for database interaction. Modify the `.env` file to match your PostgreSQL setup.

The `JWT_SECRET` is used to sign and verify authentication tokens — keep it secure.

---

## Running the Application

### Development mode

Start the application with hot-reloading:

```bash
npm run start:dev
```

Access the API at: `http://localhost:3000`

### Production mode

Build and run the compiled app:

```bash
npm run build
npm run start
```

---

## API Documentation

Interactive API docs are available via Swagger UI:

```
http://localhost:3000/api
```

Use this interface to explore endpoints, view request/response schemas, and test API calls.

---

## Testing

Run unit tests with Jest:

```bash
npm run test
```

Run tests in watch mode for development:

```bash
npm run test:watch
```

---

## Docker

### Build and run with Docker Compose

```bash
docker-compose up --build
```

This command builds the Docker images and starts both the application and PostgreSQL containers.

### Docker configuration files

* `Dockerfile` — Builds the NestJS application container
* `docker-compose.yml` — Defines and orchestrates app and database services

---

## Project Structure

```
src/
├── modules/
│   ├── auth/           # Authentication module (JWT, user management)
│   ├── posts/          # Posts module with entities, CQRS commands & queries
│   ├── comments/       # Comments module with entities, CQRS commands & queries
├── common/             # Shared DTOs, utilities, constants
├── shared/             # Guards, strategies, interceptors used across modules
└── main.ts             # Application entry point and bootstrap
```

---

## Contributing

Contributions are welcome! Please open issues or submit pull requests.

Ensure code is clean, follows existing style, and includes relevant tests.

---

## License

This project is licensed under the MIT License.

---

```
