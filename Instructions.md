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

exapmle
Feature: User Login
Scenario: Successful login with valid credentials Given the user is on the login page When the user enters a valid email and password And clicks the "Login" button Then the user should be redirected to the dashboard And see "Welcome to your Dashboard" message