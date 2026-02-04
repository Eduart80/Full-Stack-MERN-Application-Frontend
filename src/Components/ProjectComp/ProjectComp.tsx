import { useState, useEffect } from "react";
import { getAllProjects } from "../../API/ProjectAPI";
import Spinner from "../Spinner/Spinner";
import { Link } from "react-router-dom";
import axios from "axios";
import ProjectModal from "../Modals/Modals";
import type {Project} from '../../API/ProjectAPI'

export default function ProjectComp() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)


  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllProjects();
      setProjects(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch projects");
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  }
// Delete
  const handleDelete = async (projectId: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/projects/${projectId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setProjects(projects.filter(project => project._id !== projectId));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete project");
      console.error("Error deleting project:", err);
    }
  };

  const handleEdit= ( project: Project) => {
    
    setEditingProject(project);
    setShowEditModal(true);
  };

  const handleProjectUpdated = () => {
    setShowEditModal(false);
    setEditingProject(null);
    fetchProject();
  }

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <div className="row">
        {projects.map((project) => (
          <div key={project._id} className="text-decoration-none text-dark">
          <div className="col-md-7 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Title {project.name}</h5>
                <p className="card-text">Description: {project.description}</p>
                <p className="card-text">Status: {project.status}</p>
                
                
                  <div className="d-flex gap-2 flex-wrap">
                    <Link
                      to={`/projects/${project._id}/tasks`}
                      className="btn btn-sm btn-primary"
                    >
                      <i className="bi bi-list-task me-1"></i>
                      View Tasks
                    </Link>
                    <button 
                        className="btn btn-sm btn-secondary"
                        onClick={() => handleEdit(project)}
                        >
                        <i className="bi bi-pencil me-1"></i>
                        Edit
                      </button>
                      <button 
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(project._id)}
                        >
                        <i className="bi bi-trash me-1"></i>
                        Delete
                    </button>
                  </div>
                  {project.createdAt && (
                    <small className="text-body-secondary d-block mb-2 mt-2">
                      Created: {new Date(project.createdAt).toLocaleDateString()}
                    </small>
                  )}
              </div>
            </div>
          </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {showEditModal && editingProject && (
        <ProjectModal
          show={showEditModal}
          onHide={() => {
            setShowEditModal(false);
            setEditingProject(null);
          }}
          onProjectCreated={handleProjectUpdated}
          editMode={true}
          projectToEdit={editingProject}
        />
      )}
    </div>
  );
}
