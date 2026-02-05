import { useEffect, useState } from 'react'
import { getAllProjects } from '../../API/ProjectAPI';
import { getTasksByProject } from '../../API/TasksAPI'
import type {Task as TaskAPI} from '../../types/index'
import Spinner from '../../Components/Spinner/Spinner';
import type { Project } from '../../types';
import { Link } from 'react-router-dom';
import BackButton from '../../Components/BackButton/BackButton';

interface TaskRow {
  projectId: string;
  projectName: string;
  taskId: string;
  taskName: string;
  status: string;
  createdDate: string;
}

export default function AllTasksPage() {
  const [allTasks, setAllTasks] = useState<TaskRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const fetchAllTasks = async () => {
    try {
      setLoading(true);
      const projects = await getAllProjects();
      
      const taskPromises = projects.map((project: Project) => 
        getTasksByProject(project._id)
          .then((projectTasks: TaskAPI[]) => ({
            project,
            tasks: projectTasks
          }))
          .catch(err => {
            console.error(`Error fetching tasks for project ${project._id}:`, err);
            return { project, tasks: [] as TaskAPI[] };
          })
      );
      
      const projectsWithTasks = await Promise.all(taskPromises);
      
      const allTasksList: TaskRow[] = [];
      projectsWithTasks.forEach(({ project, tasks }) => {
        tasks.forEach((task: TaskAPI) => {
          allTasksList.push({
            projectId: project._id,
            projectName: project.name,
            taskId: task._id,
            taskName: task.title,
            status: task.status,
            createdDate: task.createdAt || task.updatedAt || 'N/A'
          });
        });
      });
      
      setAllTasks(allTasksList);
    } catch (error) {
      console.error('Error fetching all tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (dateString === 'N/A') return dateString;
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'done':
        return 'bg-success';
      case 'in progress':
      case 'in-progress':
        return 'bg-primary';
      case 'pending':
        return 'bg-warning text-dark';
      default:
        return 'bg-secondary';
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <Spinner />
      </div>
    );
  }

  return (
    <>
    <div className="d-flex align-items-center">
        <BackButton />
       </div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>All Tasks</h2>
      </div>

      {allTasks.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No tasks found. Create a project and add tasks to get started.
        </div>
      ) : (
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Project Name</th>
                    <th scope="col">Task Name</th>
                    <th scope="col">Status</th>
                    <th scope="col">Created Date</th>
                  </tr>
                </thead>
                <tbody>
                  {allTasks.map((task, index) => (
                    <tr key={task.taskId}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <Link 
                          to={`/projects/${task.projectId}/tasks`}
                          style={{ textDecoration: 'none' }}
                        >
                          {task.projectName}
                        </Link>
                      </td>
                      <td>{task.taskName}</td>
                      <td>
                        <span className={`badge ${getStatusBadgeClass(task.status)}`}>
                          {task.status}
                        </span>
                      </td>
                      <td>{formatDate(task.createdDate)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3">
              <p className="text-muted">
                Total Tasks: <strong>{allTasks.length}</strong>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
