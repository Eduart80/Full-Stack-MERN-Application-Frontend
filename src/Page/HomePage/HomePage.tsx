import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <>
      <h2>Welcome to your Dashboard</h2>
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <Link to="/project" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card text-center" style={{ cursor: 'pointer' }}>
              <div className="card-body">
                <h5 className="card-title">Projects</h5>
                <p className="card-text display-6">5</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-4 mb-3">
          <Link to="/tasks" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card text-center" style={{ cursor: 'pointer' }}>
              <div className="card-body">
                <h5 className="card-title">Tasks</h5>
                <p className="card-text display-6">12</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-4 mb-3">
          <Link to="/completed" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card text-center" style={{ cursor: 'pointer' }}>
              <div className="card-body">
                <h5 className="card-title">Completed</h5>
                <p className="card-text display-6">8</p>
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