# 🗂️ To-Do App Backend API

![Node.js](https://img.shields.io/badge/Node.js-23.11.0-green?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-Backend-blue?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen?logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-Auth-orange?logo=jsonwebtokens)
![License](https://img.shields.io/badge/ISC-License-lightgrey)
![Deploy-Vercel](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel)

A RESTful backend API for a to-do application, built with **Node.js**, **Express**, and **MongoDB**. The API handles user authentication, authorization, and CRUD operations on tasks. Authentication is handled securely via **JWT**.

---

## 📄 License

> Copyright (c) 2025 Hoang Phuc Huynh  
> This project is licensed under the ISC License.

---

## 🚀 Overview

This backend provides the core API for a to-do application. It exposes API endpoints for:

- ✅ User registration and login
- 📋 Creating, reading, updating, and deleting tasks
- 🔐 Protecting user routes with JWT authentication

---

## 🔗 Project Links

- 🖥️ Frontend Repository: [To-Do Frontend (Next.js)](https://github.com/Harry-Huynh/To-Do-Frontend)
- 🌐 Live Website: [Visit the App](https://to-do-app-frontend-tawny-delta.vercel.app/)

---

## 📦 Dependencies

| Package        | Purpose                                |
| -------------- | -------------------------------------- |
| `express`      | Web framework for building the API     |
| `mongoose`     | MongoDB object modeling and connection |
| `bcryptjs`     | Hashing user passwords securely        |
| `jsonwebtoken` | Creating and verifying JWTs            |
| `passport`     | Middleware for handling authentication |
| `passport-jwt` | JWT strategy for Passport              |
| `dotenv`       | Managing environment variables         |
| `cors`         | Enabling cross-origin requests         |

---

## 🌐 API Endpoints

### 👤 User Endpoints

| Method | Endpoint             | Description             |
| ------ | -------------------- | ----------------------- |
| POST   | `/api/user/register` | Register a new user     |
| POST   | `/api/user/login`    | Login and receive token |

### ✅ Task Endpoints (Protected)

All task endpoints require a valid JWT in the `Authorization` header:

| Method | Endpoint              | Description                |
| ------ | --------------------- | -------------------------- |
| GET    | `/api/user/tasks`     | Get all tasks for the user |
| POST   | `/api/user/tasks`     | Add a new task             |
| PUT    | `/api/user/tasks/:id` | Update a specific task     |
| DELETE | `/api/user/tasks/:id` | Delete a specific task     |

---

## 🔐 Authentication

- Authentication is managed via **JWT (JSON Web Tokens)**.
- After login, the server returns a signed JWT.
- The client must include this token in the `Authorization` header for protected requests:

```http
Authorization: JWT <your_token>
```
