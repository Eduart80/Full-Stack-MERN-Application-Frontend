import NavBar from "../NavBar/NavBar";
import { Link, Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useTheme } from "../../Context/ThemeContext";


export default function dashboardComp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    // Check user status
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [])

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
                {isLoggedIn ? (
                  <Link className="nav-link text-white" to="/login">Logout</Link>
                ) : (
                  <Link className="nav-link text-white" to="/login">Login</Link>
                )}
              </li>
              <li className="nav-item mb-2">
                <button 
                  className="nav-link text-white border-0 bg-transparent w-100 text-start"
                  onClick={() => {
                  toggleTheme()
                }}
                >
                  {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                </button>
              </li>
            </ul>
          </aside>
          <main className="col-md-9 col-lg-10 p-4 bg-white d-flex flex-column">
            {/* Children routes to render */}
            <Outlet /> 
          </main>
        </div>
      </div>
    </div>
  )
}