# FirstReactApp (MERN Stack Mini Project)

This is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) mini-project demonstrating a CRUD API service. The frontend is built with React.js, and the backend is a Node.js/Express.js server connected to MongoDB Atlas. The project is deployed on AWS EC2.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Testing the APIs](#testing-the-apis)
- [Common Errors and Solutions](#common-errors-and-solutions)
- [Tech Stack](#tech-stack)

---

## Project Overview

- **CRUD Operations:** Users can Create, Read, Update, and Delete data.
- **RESTful API:** Backend provides endpoints for managing user data.
- **Frontend Integration:** React.js app interacts with backend APIs.
- **Deployment:** Hosted on AWS EC2 and accessible publicly.
- **Database:** MongoDB Atlas for cloud-based data storage.

---

## Frontend Setup

1. Navigate to the frontend directory:

    ```
    cd FirstReactApp_Frontend
    ```

2. Install dependencies:

    ```
    npm install
    ```

3. Run the development server:

    ```
    npm start
    ```

4. Access in browser:

    - Local: [http://localhost:3000](http://localhost:3000)
    - Network (AWS or LAN): `http://<EC2_PUBLIC_IP>:3000`

5. Build for production (optional):

    ```
    npm run build
    ```

---

## Backend Setup

1. Navigate to the backend directory:

    ```
    cd FirstReactApp_Backend
    ```

2. Install dependencies:

    ```
    npm install
    ```

3. Create a `.env` file in the backend folder with the following variables:

    ```
    PORT=3001
    HOST=0.0.0.0
    MONGO_URI=your_mongodb_connection_string
    ```

4. Run backend locally:

    ```
    node server.js
    ```

5. Run backend using PM2 for production:

    ```
    pm2 start server.js --name backend -f --update-env
    ```

6. Verify PM2 processes and logs:

    ```
    pm2 list            # To verify server is running
    pm2 logs backend    # To view logs
    ```

---

## Environment Variables

| Variable  | Description                               |
| --------- | --------------------------------------- |
| `PORT`    | Port number for the backend server (default: 3001) |
| `HOST`    | Server host (use `0.0.0.0` for external access)    |
| `MONGO_URI` | MongoDB Atlas connection URI             |

---

## Running the Project

1. Start backend first:

    ```
    cd FirstReactApp_Backend
    pm2 start server.js --name backend -f --update-env
    ```

2. Start frontend:

    ```
    cd FirstReactApp_Frontend
    npm start
    ```

3. Visit frontend in browser:

    ```
    http://<EC2_PUBLIC_IP>:3000
    ```

4. **Important:** Make sure ports `3000` (frontend) and `3001` (backend) are allowed in EC2 Security Groups firewall rules.

---

## Testing the APIs

Use Postman or cURL to test backend REST API:

| Method | Endpoint                          | Description              |
| ------ | -------------------------------- | ------------------------ |
| GET    | `http://<EC2_PUBLIC_IP>:3001/api/users`         | Get all users            |
| POST   | `http://<EC2_PUBLIC_IP>:3001/api/users`         | Create a new user        |
| PUT    | `http://<EC2_PUBLIC_IP>:3001/api/users/:id`     | Update user by ID        |
| DELETE | `http://<EC2_PUBLIC_IP>:3001/api/users/:id`     | Delete user by ID        |

---

## Common Errors and Solutions

| Error                 | Cause                                   | Solution                                         |
| --------------------- | ------------------------------------- | ------------------------------------------------|
| `ECONNREFUSED`        | Backend bound to localhost (127.0.0.1) | Ensure `HOST=0.0.0.0` in `server.js` and `.env`  |
| MongoDB connection error | Wrong URI or network issues            | Check `MONGO_URI` and internet access            |
| Frontend can't reach backend | Backend port blocked in AWS Security Group | Open port `3001` in EC2 Security Group             |
| PM2 not found          | PM2 not installed globally              | Run `npm install pm2 -g`                          |
| Port already in use    | Another process using the port          | Kill process (`sudo kill <pid>`) then restart PM2 |

---

## Tech Stack

- **Frontend:** React.js, Axios, Bootstrap/CSS 
- **Backend:** Node.js, Express.js, CORS, Mongoose
- **Database:** MongoDB Atlas
- **Deployment:** AWS EC2, PM2

---



