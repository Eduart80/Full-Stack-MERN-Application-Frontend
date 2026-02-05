import { useEffect, useState } from 'react'
import { getAllProjects } from '../../API/ProjectAPI';
import { getTasksByProject } from '../../API/TasksAPI';
import type {Task as TaskAPI} from '../../types/index'
import Spinner from '../../Components/Spinner/Spinner';
import type { Project } from '../../types';
import { Link } from 'react-router-dom';
import BackButton from '../../Components/BackButton/BackButton';

interface CompletedTaskRow {
  projectId: string;
  projectName: string;
  taskId: string;
  taskName: string;
  status: string;
  completedDate: string;
}

export default function CompletedPage() {
  const [completedTasks, setCompletedTasks] = useState<CompletedTaskRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  const fetchCompletedTasks = async () => {
    try {
      setLoading(true);
      const projects = await getAllProjects();
      
      const taskPromises = projects.map((project: Project) => 
        getTasksByProject(project._id)
          .then((projectTasks: TaskAPI[]) => ({
            project,
            tasks: projectTasks.filter((task: TaskAPI) => 
              task.status === 'Done' || task.completed === true
            )
          }))
          .catch(err => {
            console.error(`Error fetching tasks for project ${project._id}:`, err);
            return { project, tasks: [] as TaskAPI[] };
          })
      );
      
      const projectsWithTasks = await Promise.all(taskPromises);
      
      const completed: CompletedTaskRow[] = [];
      projectsWithTasks.forEach(({ project, tasks }) => {
        tasks.forEach((task: TaskAPI) => {
          completed.push({
            projectId: project._id,
            projectName: project.name,
            taskId: task._id,
            taskName: task.title,
            status: task.status,
            completedDate: task.updatedAt || task.createdAt || 'N/A'
          });
        });
      });
      
      setCompletedTasks(completed);
    } catch (error) {
      console.error('Error fetching completed tasks:', error);
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
        <h2>Completed Tasks</h2>
      </div>

      {completedTasks.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No completed tasks yet.
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
                    <th scope="col">Date Completed</th>
                  </tr>
                </thead>
                <tbody>
                  {completedTasks.map((task, index) => (
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
                        <span className="badge bg-success">
                          {task.status}
                        </span>
                      </td>
                      <td>{formatDate(task.completedDate)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3">
              <p className="text-muted">
                Total Completed Tasks: <strong>{completedTasks.length}</strong>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
