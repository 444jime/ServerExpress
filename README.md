# Academic Management System API 🎓

RESTful API developed for managing students, subjects, and enrollments. This project demonstrates a solid backend foundation using **Node.js** and **Express**, focusing on clean code, validation, and containerized deployment.

## ✨ Key Features

* **Complete CRUD Operations**: Full management of Students, Subjects, and Enrollments.
* **Security & Authentication**: Implementation of secure access layers for user data.
* **Request Validation**: Robust data validation schemas to ensure API integrity.
* **Dockerized Environment**: Ready-to-deploy configuration using Docker and Docker Compose.
* **Error Handling**: Centralized middleware for consistent and professional API responses.

## 🏗️ Architecture

The server follows a modular structure for high maintainability:
* **Controllers**: Handle the request-response cycle.
* **Services**: Contain the core business logic and database interactions.
* **Routers**: Define clean and semantic API endpoints.
* **Middlewares**: Manage security, validation, and error handling.

## 🛠️ Tech Stack

* **Runtime**: Node.js
* **Framework**: Express.js
* **Database**: MySQL
* **DevOps**: Docker & Docker Compose
* **Validation**: Schema-based validation handlers

## 🚀 Installation & Setup

1.  **Clone the repository**:
    ```bash
    git clone [https://github.com/444jime/ServerExpress.git](https://github.com/444jime/ServerExpress.git)
    cd serverexpress
    ```

2.  **Environment Setup**:
    Create a `.env` file based on the provided `.env.example`:
    ```env
    PORT=3000
    DB_HOST=localhost
    DB_USER=your_user
    DB_PASSWORD=your_password
    DB_DATABASE=dbtpintegrador2025
    DB_PORT = 3306
    JWT_SECRET=your_password
    ```

3.  **Run with Docker (Recommended)**:
    ```bash
    docker-compose up --build
    ```

4.  **Manual Installation**:
    ```bash
    npm install
    npm run dev
    ```

---
*Developed by Tania as part of her Associate Degree in Systems Analysis.*
