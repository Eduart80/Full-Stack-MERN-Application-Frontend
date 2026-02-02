import React from 'react'
import NavBar from '../../Components/NavBar/NavBar'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className='d-flex flex-column min-vh-100 bg-light'>
      <div className='w-100 ps-3'>
          <NavBar/>
      </div>
      {/*Content */}
      <div className='container-fluid flex-fill d-flex flex-column p-0'>
        <div className="row flex-fill g-0 m-0">
          {/* Sidebar */}
          <aside className="col-md-3 col-lg-2 bg-dark text-white p-4 d-flex flex-column">
            <div className="mb-4">
              <div className="rounded-circle bg-secondary" style={{ width: 48, height: 48 }}></div>
              <div className="mt-2">User Name</div>
              <div className="text-success small">Online</div>
            </div>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <Link className="nav-link text-white" to="/Project">Projects</Link></li>
              <li className="nav-item mb-2">
                <Link className="nav-link text-white" to="/Tasks">Tasks</Link></li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/Setting">Settings</Link></li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/Login">Login</Link></li>
            </ul>
          </aside>
          {/* Main Section */}
          <main className="col-md-9 col-lg-10 p-4 bg-white d-flex flex-column">
            <h2>Welcome to your Dashboard</h2>
            <div className="row mb-4">
              <div className="col-md-4 mb-3">
                <Link to="/Project" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card text-center">
                  <div className="card-body">
                    <h5 className="card-title">Projects</h5>
                    <p className="card-text display-6">5</p>
                  </div>
                </div>
                </Link>
              </div>
              <div className="col-md-4 mb-3">
                <Link to="/Tasks" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card text-center">
                  <div className="card-body">
                    <h5 className="card-title">Tasks</h5>
                    <p className="card-text display-6">12</p>
                  </div>
                </div>
                </Link>
              </div>
              <div className="col-md-4 mb-3">
                <Link to="/Completed" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card text-center">
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
                </ul>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}