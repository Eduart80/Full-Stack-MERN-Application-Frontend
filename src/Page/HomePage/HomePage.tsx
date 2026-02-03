import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllProjects } from '../../API/ProjectAPI';
import { getTasksByProject } from '../../API/TasksAPI';
import Spinner from '../../Components/Spinner/Spinner';
import type { Task } from '../../types';


export default function HomePage() {
   const [stats, setStats] = useState({
      totalProjects:0,
      totalTasks:0,
      completedTasks:0
    }) 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    fetchDashboardStats();
  }, []);

    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        const projects = await getAllProjects();
        
        const totalProjects = projects.length;
 
        let totalTasks = 0;
        let completedTasks = 0;
        
       const taskPromises = projects.map((project: any) => 
        getTasksByProject(project._id).catch(err => {
          console.error(`Error fetching tasks for project ${project._id}:`, err);
          return []; // Return empty array if error
        })
      );
      
      const allTasksArrays = await Promise.all(taskPromises);
      
      // Count tasks from all projects
      allTasksArrays.forEach((tasks: Task[]) => {
        totalTasks += tasks.length;
        completedTasks += tasks.filter((task: Task) => 
          task.status === 'Done' || task.completed === true
        ).length;
      });
      
      console.log('Stats:', { totalProjects, totalTasks, completedTasks }); // DEBUG
      
        
        setStats({
          totalProjects,
          totalTasks,
          completedTasks
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    }

     if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <Spinner />
      </div>
    );
  }
  return (
    <>
      <h2>Welcome to your Dashboard</h2>
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <Link to="/project" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card text-center" style={{ cursor: 'pointer' }}>
              <div className="card-body">
                <h5 className="card-title">Projects</h5>
                <p className="card-text display-6">{stats.totalProjects}</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-4 mb-3">
          <Link to="/tasks" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card text-center" style={{ cursor: 'pointer' }}>
              <div className="card-body">
                <h5 className="card-title">Tasks</h5>
                <p className="card-text display-6">{stats.totalTasks}</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-4 mb-3">
          <Link to="/completed" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card text-center" style={{ cursor: 'pointer' }}>
              <div className="card-body">
                <h5 className="card-title">Completed</h5>
                <p className="card-text display-6">{stats.completedTasks}</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <section className="card">
        <div className="card-body">
          <h5 className="card-title">Recent Activity</h5>
          <ul>
            <li>Created new project "MERN App"</li>
            <li>Completed task "Setup backend"</li>
            <li>Added user to project</li>
            <li>Sample text area</li>
          </ul>
        </div>
      </section>
    </>
  )
}