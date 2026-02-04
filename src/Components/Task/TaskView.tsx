import { useState, useEffect } from "react";
import Spinner from "../Spinner/Spinner";
import { getAllTasks} from '../../API/TasksAPI'
import type { Task } from "../../types";
import { useParams } from "react-router-dom";
import axios from "axios";
import TaskModal from "../Modals/TaskModals";
import TaskPassFail from "./passFail";

export default function TasksView() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTask, setEditingTask]=useState<Task | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)

  const {projectId} = useParams<{projectId:string}>()

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
     
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
      completed: "success",
      "To Do": "secondary",
      "In Progress": "primary",
      "Done": "success"
    };
    return statusColors[status] || "secondary";
  }

  const handleDelete = async (taskId:string)=>{
    if(!window.confirm("Are you sure you want to delete task?")){
      return
    }

    try{
      const token = localStorage.getItem('token')
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/tasks/${taskId}`,
        {headers:{
          'Authorization':`Bearer ${token}`
        }}
      )
      setTasks(tasks.filter(task => task._id !== taskId))
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete task");
      console.error("Error deleting task:", err);
    }
  }

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowEditModal(true);
  }

  const handleTaskUpdated = () => {
    setShowEditModal(false)
    setEditingTask(null)
    fetchTasks()
  }

  if (loading) {
    return <Spinner />
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
                    <small className="text-body-secondary d-block mb-2">
                      Created: {new Date(task.createdAt).toLocaleDateString()}
                    </small>
                  )}
                  <div className="d-flex gap-2">
                    {/* Show Pass/Fail dropdown as an option for every task */}
                    <TaskPassFail showOptions={true} />
                  </div>
                  <div className="d-flex gap-2">
                    <button 
                      className="btn btn-sm btn-primary"
                      onClick={() => handleEdit(task)}
                    >
                      <i className="bi bi-pencil me-1"></i>
                      Edit
                    </button>
                    <button 
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(task._id)}
                    >
                      <i className="bi bi-trash me-1"></i>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && editingTask && projectId && (
        <TaskModal
          show={showEditModal}
          onHide={() => {
            setShowEditModal(false);
            setEditingTask(null);
          }}
          onTaskCreated={handleTaskUpdated}
          projectId={projectId}
          editMode={true}
         taskToEdit={{
            _id: editingTask._id,
            title: editingTask.title,
            description: editingTask.description ?? "",
            status: editingTask.status
          }}
        />
      )}
    </div>
  );
}