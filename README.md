# User and Document Management API

This API allows create, read, update and delete users and documents linked. It simulates CRUD operations in memory, without real persistent in a database. It's built using Node.js and Express, and includes authentication via JWT and password hashing via Bcrypt.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Running the Project](#run-project-locally)
- [API Endpoints](#api-endpoints)
  - [Create User](#create-user)
  - [Get Users](#get-users)
  - [Get Specific User](#get-specific-user)
  - [Update User](#update-user)
  - [Delete User](#delete-user)

## Prerequisites

- Node
- Express
- Bcryptjs
- Jsonwebtoken

Install dependences

```bash
npm install
```

## Authentication

Some requests to protected endpoints must include a valid JWT in the `Authorization` header. The token can be obtained by logging in with a valid username and password.

- **Login Endpoint (example)**:
  - **Method:** `POST`
  - **URL:** `/login`
  - **Request:**

```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

- **Response:**

```json
{
  "token": "your_jwt_token"
}
```

Use token in the `Authorization` header for protected endpoints:

```bash
Authorization: Bearer your_jwt_token
```

## Data Persistence

This API stores data in memory only. Once the server is stopped or restarted, all data (users and documents) will be lost.

## Run project locally

```bash
node server.js
```

## API Users Endpoints

### Create User

- **Method:** `POST`
- **URL:** `/users`
- **Description:** Create a new user.

### Request Example

```bash
POST /users
Content-Type: application/json
Authorization: Bearer <<token>>

{
    "name": "Created User1",
    "email": "createdUser1@gmail.com",
    "password": "0000",
    "documents": []
}
```

### Response Example

```json
{
  "id": 1,
  "name": "Created User1",
  "email": "createdUser1@gmail.com",
  "password": "hashed password",
  "documents": []
}
```

- **Status:** 201 Created
- **Password Hashing:** The password is hashed before being stored for security reasons.
- **Error Handling:**
  - **401 Unauthorized:** If token is invalid or missing.

### Get Users

- **Method:** `GET`,
- **URL:** `/users`,
- **Description:** Returns all users.

### Request Example

```bash
GET /users
Accept: application/json
```

### Response Example

```json
{
    "id": 1,
    "name": "User 1",
    "email": "user1@gmail.com",
    "password": "hashed password",
    "documents": []
},
{
    "id": 2,
    "name": "User 2",
    "email": "user2@gmail.com",
    "password": "hashed password",
    "documents": []
},
```

- **Status:** 200 Ok

### Get specific User

- **Method:** `GET`,
- **URL:** `/users/:id`,
- **Description:** Returns a specific user.

### Request Example

```bash
GET /users/1
Accept: application/json
```

### Response Example

```json
{
  "id": 1,
  "name": "User 1",
  "email": "user1@gmail.com",
  "password": "hashed password",
  "documents": []
}
```

- **Status:** 200 Ok
- **Error Handling:**
  - **404 Not Found:** User with given ID doesn't exist

### Update User

- **Method:** `PUT`,
- **URL:** `/users/:id`,
- **Description:** Update a specific user.

### Request Example

```bash
PUT /users/1
Content-Type: application/json
Authorization: Bearer <<token>>

{
    "name": "Updated User",
    "email": "updatedUser@gmail.com",
    "password": "0000",
    "documents": []
}
```

### Response Example

```json
{
  "id": 1,
  "name": "Updated User",
  "email": "updatedUser@gmail.com",
  "password": "hashed password",
  "documents": []
}
```

- **Status:** 200 Ok
- **Password Hashing:** The password is hashed before being stored for security reasons.
- **Error Handling:**
  - **401 Unauthorized:** If token is invalid or missing.
  - **404 Not Found:** User with given ID doesn't exist

### Delete User

- **Method:** `DELETE`
- **URL:** `/users/:id`
- **Description:** Delete a specific user

### Request Example

```bash
DELETE /users/1
Authorization: Bearer <<token>>
```

### Response Example

No content

- **Status:** 204 No Content
  - The user was successfully deleted. No content is returned in the response.
- **Error Handling:**
  - **401 Unauthorized:** If token is invalid or missing.
  - **404 Not Found:** User with given ID doesn't exist

### Document Management

- Each usar can have multilple documents associated with them.
- The documents can be managed via the following endpoints

### Create Document

- **Method:** `POST`
- **URL:** `/documents`
- **Description:** Create a new document.

### Request Example

```bash
POST /documents
Content-Type: application/json
Authorization: Bearer <<token>>

{
    "name": "Created Document",
    "status": "created".
    "userId": 1
}
```

### Response Example

```json
{
  "id": 1,
  "name": "Created Document",
  "status": "pending",
  "userId": 1
}
```

- **Status:** 201 Created
- **Error Handling:**
  - **401 Unauthorized:** If token is invalid or missing.

### Get Documents

- **Method:** `GET`,
- **URL:** `/documents`,
- **Description:** Returns all documents.

### Request Example

```bash
GET /documents
Accept: application/json
```

### Response Example

```json
{
    "id": 1,
    "name": "Document 1",
    "status": "pending",
    "userId": 1
},
    {
    "id": 2,
    "name": "Document 2",
    "status": "created",
    "userId": 1
},
```

- **Status:** 200 Ok

### Get specific document

- **Method:** `GET`,
- **URL:** `/documents/:id`,
- **Description:** Returns a specific document.

### Request Example

```bash
GET /documents/1
Accept: application/json
```

### Response Example

```json
{
    "id": 1,
    "name": "Document 1",
    "status": "pending",
    "userId": 1
},
```

- **Status:** 200 Ok
- **Error Handling:**
  - **404 Not Found:** Document with given ID doesn't exist

### Update Document

- **Method:** `PUT`,
- **URL:** `/documents/:id`,
- **Description:** Update a specific document.

### Request Example

```bash
PUT /documents/1
Content-Type: application/json
Authorization: Bearer <<token>>

{
    "name": "Document 1 updated",
    "status": "updated",
    "userId": 1
}
```

### Response Example

```json
{
  "id": 1,
  "name": "Document 1 updated",
  "status": "updated",
  "userId": 1
}
```

- **Status:** 200 Ok
- **Error Handling:**
  - **401 Unauthorized:** If token is invalid or missing.
  - **404 Not Found:** Document with given ID doesn't exist

### Delete Document

- **Method:** `DELETE`
- **URL:** `/documents/:id`
- **Description:** Delete a specific document.

### Request Example

```bash
DELETE /documents/1
Authorization: Bearer <<token>>
```

### Response Example

No content

- **Status:** 204 No Content
  - The document was successfully deleted. No content is returned in the response.
- **Error Handling:**
  - **401 Unauthorized:** If token is invalid or missing.
  - **404 Not Found:** Document with given ID doesn't exist

## General Errors Section

### Unauthorized Error (401)

```json
{
  "error": "Unauthorized",
  "message": "Token is invalid or missing."
}
```

### Not Found Error (404)

```json
{
  "error": "Not Found",
  "message": "User not found."
}
```

```json
{
  "error": "Not Found",
  "message": "Document not found."
}
```
