Full-Stack MERN Application
Scenario: Pro-Tasker
You are a full-stack developer hired by a growing startup to lead the development of their new flagship product, “Pro-Tasker”. The vision is to create a modern, collaborative project management tool that is intuitive for single users but powerful enough for small teams. The application must be built from the ground up using the MERN stack, showcasing a secure, robust, and feature-rich backend API, a dynamic and responsive React frontend, and a seamless deployment pipeline.

This capstone project is the culmination of your journey through the MERN stack curriculum. It is designed to challenge you to integrate everything you have learned — from backend architecture and database design to frontend state management and deployment — into a single, polished, and real-world application. You are expected to reuse and expand upon the patterns and code you developed in previous modules, particularly the “TaskMaster” API and the deployment labs.

Core Features & User Stories
“User Stories” are a way to capture the requirements of the project from the perspective of the user.

Here are the user stories for this project:

User Management:
As a new user, I can create an account and log in.
As a logged-in user, my session is managed securely, and I can log out.
Project Management:
As a logged-in user, I can create new projects, giving them a name and description.
I can view a dashboard of all the projects I have created.
I can view the details of a single project.
I can update or delete only the projects that I own.
Task Management:
Within a project I own, I can create new tasks with a title, description, and status (e.g., ‘To Do’, ‘In Progress’, ‘Done’).
I can view all tasks belonging to a specific project.
I can update the details or status of any task within a project I own.
I can delete tasks from a project I own.
Collaboration (Stretch Goal):
As a project owner, I can invite other registered users to collaborate on my project.
As a collaborator, I can view and update tasks within a project I’ve been invited to.
Technical Requirements
Backend (Node.js, Express, MongoDB)
Modular API: Structure your API with a clear separation of concerns (e.g., models, routes, controllers, middleware).
RESTful Endpoints: Design and implement a full suite of RESTful API endpoints for Users, Projects, and Tasks.
Database Schemas: Create robust Mongoose schemas for User, Project, and Task models, establishing clear relationships using ref.
Authentication: Implement secure user registration and login using JWTs. All sensitive routes must be protected.
Authorization: Implement strict, ownership-based authorization. A user must only be able to view or modify data they own. This is the most critical security requirement.
Password Security: Hash all user passwords using bcrypt before storing them in the database, preferably using a pre-save hook in your User model.
Frontend (React)
Component-Based Architecture: Build the UI using small, reusable functional components.
State Management: Use useState for local component state and the Context API for managing global state (like user authentication).
Client-Side Routing: Use a library like react-router-dom to create a single-page application (SPA) experience with distinct pages/views for login, registration, a project dashboard, and individual project details.
API Integration: Fetch data from your backend API to dynamically render content. All authenticated requests must include the user’s JWT.
User Experience: The application should provide clear feedback for loading and error states.
Responsive Design: The UI must be fully responsive and usable on desktop, tablet, and mobile screen sizes.
Getting Creative
Have a worthwhile project idea that you’d like to build?

As long as it is a full-stack application that uses the MERN stack, highlights everything you have learned so far, and is something you’d be proud to show off, then we’re open to it!

A different project must be gradeable via the rubric below, which means it must have all of the same features and requirements as the project described above. This is intended to give you creative freedom while adhering to the course requirements and providing an equitable grading experience for your peers.

In order to be eligible, you must submit a project proposal to the instructor for approval. This can take time to review, so please submit your proposal as soon as possible. Your instructor has the right to reject a project proposal for any reason or none at all.

Your project proposal should include:

A description of the project.
A list of the features you plan to include.
A list of the technologies you plan to use.
A timeline for the project (make sure it is reasonable in scope for the time remaining).
Instructions & Phased Approach
Phase 1: Planning & Backend Foundation
Reuse & Plan: Start with your code from the the backend development project (“TaskMaster”). Plan the additional features and API endpoints you will need for this capstone. Document your API design in your README.md.
Setup & Structure: Ensure your backend has a clean, modular structure and that all secrets are managed via a .env file (which must be in .gitignore).
Authentication: Implement robust user registration and login. Create reusable authentication middleware to protect your API routes.
Phase 2: Core Backend API
Project API: Build the full CRUD API for projects (/api/projects). Every endpoint must verify that the logged-in user is the owner of the resource being requested.
Task API: Build the full CRUD API for tasks. These routes should be nested under projects (e.g., POST /api/projects/:projectId/tasks) and must include authorization checks to ensure the user owns the parent project.
Phase 3: Frontend Development
Project Setup: Create a new React application using a tool like Vite.
Routing & Pages: Set up client-side routing and create page components for all the main views (Dashboard, Project Page, Login, etc.).
Authentication Flow: Implement the full login/registration flow. Use the Context API to provide authentication status and user data throughout the application. Store the JWT securely in the browser.
Build UI Components: Develop a library of reusable components for displaying projects, tasks, forms, buttons, etc.
Connect to API: Integrate your components with your live backend API to perform all CRUD operations. Implement loading and error states for a smooth user experience.
Phase 4: Deployment & Presentation
Deployment: Following the process from the deployment lab, deploy your application.
Deploy the backend Express app as a Web Service on Render, connecting it to your MongoDB Atlas database.
Deploy the frontend React app as a Static Site on Render.
Ensure your live frontend is correctly configured to communicate with your live backend.
Presentation Prep: Prepare a short presentation (5-10 minutes) to demonstrate your live application. You should walk through the main features, explain your technical decisions, and discuss any challenges you faced.
Submission Requirements
GitHub Repository: A link to your public GitHub repository containing all frontend and backend code.
Live URLs:
The URL for your deployed backend web service on Render.
The URL for your deployed frontend static site on Render.
Documentation: Your repository must include a README.md file that contains:
A description of the project.
Instructions for setting it up and running it locally.
A list and description of your API endpoints.
Presentation: Be prepared to present and demonstrate your project.