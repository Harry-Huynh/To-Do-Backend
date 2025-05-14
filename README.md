# License

> Copyright (c) 2025 Hoang Phuc Huynh  
> This project is licensed under the ISC License.

# Overview

This is a backend API for a to-do app, built using Node.js, Express, and MongoDB. The API provides endpoints for user registration, login, and task management.

# Dependencies

`bcryptjs` : for password hashing  
`cors`: for cross-origin resource sharing  
`dotenv`: for environment variable management  
`express`: for building the API  
`mongoose`: for MongoDB interaction      
`jsonwebtoken`: for JSON Web Token authentication  
`passport`: for authentication middleware  
`passport-jwt`: for JWT strategy

# API Endpoints

### User Endpoints

`POST /api/user/register`: Register a new user  
`POST /api/user/login`: Login an existing user

### Task Endpoints

`GET /api/user/tasks`: Get all tasks for a logged-in user  
`POST /api/user/tasks`: Add a new task for a logged-in user  
`PUT /api/user/tasks/:id`: Update a task for a logged-in user  
`DELETE /api/user/tasks/:id`: Delete a task for a logged-in user

# Authentication

The API uses `JSON Web Token (JWT) authentication`. When a user logs in, a JWT token is generated and returned in the response. This token must be included in the Authorization header for all subsequent requests.

# Environment Variables

The API uses the following environment variables:

`MONGO_URL`: the MongoDB connection string  
`JWT_SECRET`: the secret key for JWT signing  
`PORT`: the port number for the API server

# Setup

Clone the repository: `git clone https://github.com/Harry-Huynh/To-Do-Backend.git`  
Install dependencies: `npm install`  
Create a `.env` file with the required environment variables  
Start the API server: `node server.js`
