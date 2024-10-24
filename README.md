# Node-CRUD-API

A simple Node.js CRUD API for managing user contacts with authentication and authorization using JWT.

## Features

- **CRUD Operations**: Create, read, update, and delete user contacts.
- **User Authentication**: Register and login using JSON Web Tokens (JWT).
- **Authorization**: Protect routes using JWT and user validation.
- **Error Handling**: Centralized error handling with detailed response messages.
- **MongoDB Integration**: Store and manage user data using MongoDB.

## Requirements

- Node.js (v18 or higher)
- MongoDB
- Environment variables:
  - `MONGO_DB_CONNECTION`: MongoDB connection string.
  - `ACCESS_TOKEN`: JWT secret key.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/Node-CRUD-API.git
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up environment variables in a `.env` file:
    ```bash
    MONGO_DB_CONNECTION=your-mongo-connection-string
    ACCESS_TOKEN=your-secret-key
    ```
4. Start the server:
    ```bash
    npm start
    ```

## API Endpoints

### User Authentication

- **Register User**: `POST /api/users/register`
- **Login User**: `POST /api/users/login`
- **Current User**: `GET /api/users/current`

### Contacts

- **Get All Contacts**: `GET /api/contacts`
- **Create Contact**: `POST /api/contacts`
- **Get Contact by ID**: `GET /api/contacts/:id`
- **Update Contact by ID**: `PUT /api/contacts/:id`
- **Delete Contact by ID**: `DELETE /api/contacts/:id`

## Error Handling

- Custom error handling with appropriate HTTP status codes and descriptive error messages for validation, authorization, and server issues.

## License

This project is licensed under the MIT License.
