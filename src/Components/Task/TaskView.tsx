import { useState, useEffect } from "react";
import Spinner from "../Spinner/Spinner";
import { getAllTasks, type Task } from '../../API/TasksAPI'
import { useParams } from "react-router-dom";

export default function TasksView() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {projectId} = useParams<{projectId:string}>()

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("projectId from params:", projectId);
      if(!projectId) throw new Error("Project Id is missing")
       const data: Task[] = await getAllTasks(projectId);
      setTasks(data);
      
    } catch (err: any) {
      setError(err.message || "Failed to fetch tasks");
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusColors: { [key: string]: string } = {
      pending: "warning",
      "in-progress": "info",
      completed: "success"
    };
    return statusColors[status] || "secondary";
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
        {tasks.length === 0 ? (
          <div className="col-12">
            <p className="text-muted">No tasks available</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div key={task._id} className="col-md-6 col-lg-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{task.title}</h5>
                  <p className="card-text">{task.description}</p>
                  <p className="card-text">
                    <span className={`badge bg-${getStatusBadge(task.status)}`}>
                      {task.status}
                    </span>
                  </p>
                  {task.createdAt && (
                    <small className="text-muted">
                      Created: {new Date(task.createdAt).toLocaleDateString()}
                    </small>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}