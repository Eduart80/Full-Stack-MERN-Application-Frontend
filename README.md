# TaskMaster (Full-Stack MERN Application)

TaskMaster is a full-stack project management application built with the MERN stack (MongoDB, Express, React, Node.js). It allows users to register, log in, create and manage projects, and track tasks within each project. The app features a modern, responsive UI, robust authentication, and secure API endpoints.

## Features

- User registration and login with JWT authentication
- Dashboard displaying all user projects
- Full CRUD for projects and tasks
- Nested tasks under projects
- Authorization: users can only access their own projects and tasks
- Responsive design for desktop and mobile
- Loading and error feedback for all API interactions
- Theming support (light/dark mode)
- Deployed on Render (frontend and backend)

## Technologies Used

- **Frontend:** React, Vite, Bootstrap, React Router, Context API
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT
- **Deployment:** Render, MongoDB Atlas

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB Atlas account

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/taskmaster.git
   cd taskmaster
   ```

2. **Install dependencies:**
   ```sh
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env` in the backend folder and fill in your MongoDB URI and JWT secret.

4. **Run the backend:**
   ```sh
   cd backend
   npm run dev
   ```

5. **Run the frontend:**
   ```sh
   cd ../frontend
   npm run dev
   ```

6. **Access the app:**  
   Open [http://localhost:5173](http://localhost:5173) in your browser.

### Deployment

- The backend is deployed as a Web Service on Render, connected to MongoDB Atlas.
- The frontend is deployed as a Static Site on Render.

### Live Web Project [Link](https://full-stack-mern-application-frontend.onrender.com)

## Documentation

Planning documentation: [Planning](./planning.md).<br>
For detailed API endpoints and usage, see the [API Documentation](./API_Documentation.md)

## Folder Structure

```
/backend      # Express API
/frontend     # React app
```

## Main Pages

- **Login/Register:** User authentication
- **Dashboard:** List of all projects
- **Project Page:** Details and tasks for a single project
- **Completed Tasks:** Overview of finished tasks

## Theming

- Light and dark mode support via CSS variables
