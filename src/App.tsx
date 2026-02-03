import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import HomePage from "./Page/HomePage/HomePage";
import Project from "./Page/ProjectPage/ProjectPage";
import TasksView from "./Page/TasksPage/TasksPage";
import NotFound from "./Page/NotFound/NotFound";
import Login from "./Page/Auth/Login";
import SignUp from "./Page/Auth/SignUp";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        {/* Dashboard Layout with nested routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="project" element={<Project />} />
          <Route path="/projects/:projectId/tasks" element={<TasksView />} />
        </Route>

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
