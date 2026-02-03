import { useState, useEffect } from "react";
import { getAllProjects } from "../../API/ProjectAPI";
import Spinner from "../Spinner/Spinner";
import { Link } from "react-router-dom";

interface Project {
  _id: string;
  name: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
  createdAt: string;
}
export default function ProjectComp() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  };

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
          <Link key={project._id} to={`/projects/${project._id}/tasks`} className="text-decoration-none text-dark">
          <div className="col-md-7 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Title {project.name}</h5>
                <p className="card-text">Description: {project.description}</p>
                <p className="card-text">Status: {project.status}</p>
                <small className="text-muted">
                  Created: {new Date(project.createdAt).toLocaleDateString()}
                </small>
              </div>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
