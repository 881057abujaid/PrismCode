![Node.js](https://img.shields.io/badge/Node.js-24.x-green)

![License](https://img.shields.io/badge/License-MIT-blue)

# PrismCode 🚀
>Write better code. Learn from AI. Build with confidence.
> AI-powered code review platform built with the MERN Stack.

PrismCode is an AI-powered platform that helps developers review their source code using Large Language Models (LLMs). It analyzes code, identifies potential issues, suggests improvements, and provides structured feedback following clean code and software engineering best practices.

---

## ✨ Features

### 🔐 Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes

### 📁 Project Management

- Create Project
- Update Project
- Get All Projects
- Get Project By ID
- Soft Delete Projects
- Ownership Verification

### 🤖 AI Code Review

- AI-powered code analysis
- Structured review generation
- Review caching
- Markdown formatted output
- Clean engineering suggestions

### 🏗 Architecture

- MVC Architecture
- Service Layer Pattern
- Centralized Error Handling
- Shared Constants
- Shared Prompt Management
- Modular ES Modules

---

# 🛠 Tech Stack

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

## Authentication

- JWT
- bcryptjs

## AI

- Groq API
- Llama Model

## Validation

- Zod

---

# 📂 Project Structure

backend/

├── src/

│ ├── config/

│ ├── modules/

│ ├── middleware/

│ ├── shared/

│ ├── routes/

│ └── server.js

│

├── package.json

└── README.md

---

# ⚙ Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGODB_URI=

JWT_SECRET=

JWT_EXPIRES_IN=7d

GROQ_API_KEY=
```

---

# 🚀 Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Navigate

```bash
cd PrismCode/backend
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | /api/v1/auth/register |
| POST | /api/v1/auth/login |

---

## Projects

| Method | Endpoint |
|---------|----------|
| POST | /api/v1/projects |
| GET | /api/v1/projects |
| GET | /api/v1/projects/:projectId |
| PUT | /api/v1/projects/:projectId |
| DELETE | /api/v1/projects/:projectId |

---

## AI Review

| Method | Endpoint |
|---------|----------|
| POST | /api/v1/projects/:projectId/review |

---

# 🔒 Security Features

- JWT Authentication
- Password Hashing
- Request Validation
- Ownership Authorization
- Soft Delete
- Centralized Error Handling

---

# 💡 Engineering Decisions

- ES Modules over CommonJS
- MVC + Service Layer Architecture
- AI Review Caching
- Soft Delete Strategy
- Shared Prompt System
- Shared Constants
- Modular Folder Structure

---

# 🗺 Roadmap

## Backend

- [x] Authentication
- [x] Project CRUD
- [x] AI Review
- [x] Soft Delete
- [x] Shared Architecture
- [ ] Trash Module
- [ ] Restore Project

## Frontend

- [ ] React Dashboard
- [ ] Monaco Editor
- [ ] AI Review Panel
- [ ] Authentication UI
- [ ] Trash Management

---

# 🤝 Contributing

Contributions, ideas, and suggestions are welcome.

Please open an issue before creating a pull request.

---

# 📄 License

MIT License

---

## 📚 Documentation

- [Architecture Decisions](docs/DECISIONLOG.md)
- [Project Changelog](docs/CHANGELOG.md)

Built with ❤️ using Node.js, Express.js, MongoDB and Groq AI.