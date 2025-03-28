# Project Documentation

## Overview
This project consists of two separate components:
- **Backend** (stored in the `backend` folder)
- **Frontend (Ionic App)** (stored in the `frontend` folder)

Both projects are housed within the same root directory but are **not connected**. They were developed separately to meet the assignment requirements.

---

## Backend

### **Project Description**
The backend was developed using **Node.js and Express.js** with **MongoDB** for data storage. It implements **JWT authentication** for securing API endpoints and **Role-Based Access Control (RBAC)** to manage user permissions.

### **Setup Instructions**
1. Navigate to the `backend` folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables in a `.env` file:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```sh
   node server.js
   ```
5. Use Postman to Test the api routes

## API Routes

- Public Routes (No Authentication Required)

- POST /register – Registers a new user.

- POST /login – Authenticates a user and returns a JWT token.

- Protected Routes (Authentication Required with JWT)

- GET /protected – Accessible to authenticated users; returns protected data.

- Role-Based Routes (Require Specific Roles)

- GET /user – Accessible only to users with the user role.

- GET /admin – Accessible only to users with the admin role.

- GET /editor – Accessible only to users with the editor rol

### **Features**
- JWT-based authentication for various roles
- Role-Based Access Control (RBAC)
- CORS configuration
- API rate limiting

---

## Frontend (Ionic App)

### **Project Description**
The frontend was built using **Ionic with React** and **Firebase Authentication** for user authentication. It includes authentication features and a **home page** that displays a welcome message and a short essay on API security best practices.

### **Setup Instructions**
1. Navigate to the `frontend` folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Fill in the firebase api details in the 
    ```sh
    src\firebaseConfig.ts
    ```

4. Start the Ionic development server:
   ```sh
   ionic start
   ```

### **Features**
- User authentication using Firebase Authentication
- Role management using Context API
- Secure routing
- Home page with API security best practices

---

## API Security Best Practices

API security is essential for protecting data and ensuring secure communication between systems. A well-secured API helps prevent unauthorized access, data leaks, and cyber threats.

One of the key security measures is **authentication and authorization**. Using standards like **JWT or OAuth 2.0** ensures that only authorized users can access resources. Additionally, encrypting data with **SSL/TLS** prevents attackers from intercepting sensitive information.

APIs should also implement **rate limiting** to prevent abuse and **input validation** to block SQL injection and cross-site scripting (XSS) attacks. Logging and monitoring API requests help detect suspicious activity early, improving security response.

By following these best practices, APIs can remain secure, reliable, and efficient, protecting both users and organizations from potential threats.

---

## Notes
- The **backend and frontend are not connected** but were developed separately to fulfill the assignment requirements.
- Future improvements could include integrating the backend with the frontend for a full-stack application.

### **Author**
Benjamin Haruna Bala  
Date: 27-03-2025

