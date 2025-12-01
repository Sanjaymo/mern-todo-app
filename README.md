<div align="center">

# 📝 MERN Todo App  
### Organize your day with ease  

<img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
<img src="https://img.shields.io/badge/Node.js-18.0.0-339933?style=for-the-badge&logo=node.js&logoColor=white" />
<img src="https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white" />
<img src="https://img.shields.io/badge/MongoDB-6.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
<img src="https://img.shields.io/badge/JWT-Secure-000000?style=for-the-badge&logo=jsonwebtokens" />
<img src="https://img.shields.io/badge/Google%20OAuth-Login-4285F4?style=for-the-badge&logo=google&logoColor=white" />

</div>

---

## 🌐 Live Demo

🚀 **Frontend:** _coming soon_  
🖥 **Backend API:** _coming soon_

Stay tuned…

---

# MERN Todo Application

A clean and scalable full-stack task management application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The system supports secure authentication, user-specific todo lists, and Google OAuth login.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Deployment Guide](#deployment-guide)
- [Screenshots](#screenshots)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

## Overview

This project is designed as a production-ready MERN application with:
- Email/Password Authentication
- Google OAuth Sign-In
- JWT-based secure authorization
- User-specific task management
- Fully responsive user interface
- Clean card-based layout
- Mobile and desktop compatibility

The goal is to provide a simple yet professional task-tracking application suitable for real-world usage and academic/professional evaluation.

## Features

### Authentication
- Register new users
- Email + password login
- Google OAuth 2.0 login
- Secure password hashing using bcrypt
- JSON Web Token (JWT) authentication
- Session persistence using localStorage

### Todo Management
- Add new tasks
- Delete tasks
- Each user sees only their own todos
- Real-time UI updates

### Frontend
- React.js with functional components
- Clean white theme
- Card-based Material-style UI
- Responsive layout for mobile/laptop/tablet

### Backend
- Node.js + Express.js
- MongoDB database (Atlas or local)
- Google OAuth token verification
- REST API architecture

## Project Structure

```
mernapp/
│
├── backend/
│   ├── index.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── .env
│
└── README.md
```

## Installation

### Prerequisites

Ensure the following are installed:
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB Atlas account or local MongoDB
- Git
- Google Cloud Console OAuth Client ID

### Clone the Repository

```bash
git clone https://github.com/Sanjaymo/mern-todo-app.git
cd mernapp
```

## Backend Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Create a `.env` File

Create a `.env` file in the `backend` directory with the following variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_CLIENT_ID=your_google_oauth_client_id
PORT=5000
```

### 3. Start Backend Server

```bash
npm start
```

Backend runs at: `http://localhost:5000`

## Frontend Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Create a `.env` File

Create a `.env` file in the `frontend` directory with the following variables:

```env
REACT_APP_API_BASE=http://localhost:5000
REACT_APP_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

### 3. Start Frontend Server

```bash
npm start
```

Frontend runs at: `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login with email and password
- `POST /api/auth/google` - Login with Google OAuth

### Todos
- `GET /api/todos` - Get all todos for authenticated user
- `POST /api/todos` - Create a new todo
- `DELETE /api/todos/:id` - Delete a specific todo

## Deployment Guide

### Backend Deployment (Render / Railway / Heroku)

1. Upload backend folder to your chosen platform
2. Add all required environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `GOOGLE_CLIENT_ID`
   - `PORT` (optional, platform usually sets this)
3. Set start command: `node index.js`
4. Deploy and note the backend URL

### Frontend Deployment (Vercel / Netlify)

1. Upload frontend folder to your chosen platform
2. Add environment variables:
   - `REACT_APP_API_BASE` (your deployed backend URL)
   - `REACT_APP_GOOGLE_CLIENT_ID`
3. Build command: `npm run build`
4. Set output directory to: `build`
5. Deploy

### Important: Update CORS Settings

After deployment, update the backend CORS configuration to allow requests from your deployed frontend URL.

## Screenshots

> Add your screenshots here after deployment

### Home Page
![Home Page](./screenshots/home.png)

### Authentication Page
![Authentication](./screenshots/auth.png)

### Todo Dashboard
![Todo Dashboard](./screenshots/dashboard.png)

## Technologies Used

### Frontend
- React.js
- React Hooks
- Axios
- Google OAuth Library
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcrypt
- Google OAuth verification

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License

This project is licensed under the Apache-2.0 License. You may use, modify, and distribute the software with proper attribution.

See [LICENSE](LICENSE) file for details.

## Author

**Sanjay Choudhari**  
MERN Stack Developer  
GitHub: [https://github.com/Sanjaymo](https://github.com/Sanjaymo)

---

⭐ Star this repository if you find it helpful!

For issues or questions, please open an issue on GitHub.
