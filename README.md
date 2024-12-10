# Mern Authentication

This backend implements a robust authentication system using Node.js, Express, MongoDB, and JSON Web Tokens (JWT). The application supports user registration, login, logout, and token refresh functionality, with token invalidation using a blacklist model.

---

## Table of Contents

- [Features](#features)
- [Endpoints](#endpoints)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)

---

## Features

- **User Registration**: Register new users with email and password.
- **User Login**: Authenticate users and provide JWT tokens.
- **Token-Based Authentication**: Supports access and refresh tokens for session management.
- **Logout**: Clear user tokens and prevent reuse via blacklisting.
- **Secure Token Refresh**: Generate new tokens using valid refresh tokens.

---

## Endpoints

| Endpoint         | Method | Description                                  | Request Body                                                                                                   | Response (Success)                                                                                                           | Response (Failure)                                     |
|-------------------|--------|----------------------------------------------|---------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------|
| `/api/signup`     | POST   | Register a new user                         | `{ "name": "John Doe", "email": "john@example.com", "password": "password123" }`                               | `{ "message": "Signup successful", "success": true, "accessToken": "accessTokenString" }`                                   | `{ "message": "Error message", "success": false }`    |
| `/api/login`      | POST   | Authenticate user and generate tokens       | `{ "email": "john@example.com", "password": "password123" }`                                                  | `{ "message": "Login successful", "success": true, "accessToken": "accessTokenString" }`                                    | `{ "message": "Error message", "success": false }`    |
| `/api/logout`     | POST   | Invalidate refresh token and clear cookies  | `{ "user": { "id": "userId", "refreshToken": "refreshTokenString" } }`                                        | `{ "message": "Logout successful", "success": true }`                                                                        | `{ "message": "Error message", "success": false }`    |
| `/api/refresh`    | POST   | Generate new access and refresh tokens      | Cookies: `refreshToken`                                                                                       | `{ "message": "Token refreshed successfully", "success": true, "accessToken": "newAccessTokenString" }`                     | `{ "message": "Error message", "success": false }`    |

---

## Technologies Used

- **Node.js**: Runtime environment.
- **Express**: Backend framework.
- **MongoDB**: NoSQL database for data storage.
- **JWT**: Token-based authentication.
- **bcrypt.js**: Password hashing.
- **Zod**: Validation library.
- **dotenv**: Environment variable management.

---

## Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/backend-auth-api.git
   cd backend-auth-api
