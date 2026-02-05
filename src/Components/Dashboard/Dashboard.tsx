import NavBar from "../NavBar/NavBar";
import { Link, Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useTheme } from "../../Context/ThemeContext";


export default function dashboardComp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('Guest')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
 
  useEffect(() => {
    const token = localStorage.getItem('token')
    const userLocal = localStorage.getItem('user')
    let storedUserName = 'Guest'
    if (userLocal) {
      try {
        const user = JSON.parse(userLocal)
        storedUserName = user.username || 'Guest'
      } catch (e) {
        storedUserName = 'Guest'
      }
    }
   
    setIsLoggedIn(!!token)
    setUserName(storedUserName)
  }, [userName])

  const handleLogOut = ()=>{
    localStorage.clear()
    setIsLoggedIn(false)
    setUserName('Guest')
  }

  return (
    <div className='d-flex flex-column min-vh-100 theme-container'>
      <div className='w-100 ps-3 d-flex align-items-center'>
          {/* Hamburger Menu Button */}
          <button 
            className='btn d-md-none me-3'
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label='Toggle menu'
            style={{ fontSize: '1.5rem', padding: '0.25rem 0.5rem', color: 'var(--text-primary)' }}
          >
            ☰
          </button>
          <NavBar/>
      </div>
      {/*Content */}
      <div className='container-fluid flex-fill d-flex flex-column p-0'>
        <div className="row flex-fill g-0 m-0">
          {/* Overlay for mobile */}
          {isSidebarOpen && (
            <div 
              className='d-md-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50'
              style={{ zIndex: 1040 }}
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
          {/* Sidebar */}
          <aside className={`col-md-3 col-lg-2 theme-sidebar p-4 d-flex flex-column ${
            isSidebarOpen ? 'sidebar-open' : ''
          }`}>
            {/* Close button for mobile */}
            <button 
              className='btn btn-link text-white d-md-none align-self-end p-0 mb-2'
              onClick={() => setIsSidebarOpen(false)}
              aria-label='Close menu'
              style={{ fontSize: '1.5rem' }}
            >
              ✕
            </button>
            <div className="mb-4">
              <div className="rounded-circle bg-secondary" style={{ width: 48, height: 48 }}></div>
              <div className="mt-2">{userName}</div>
              <div className="text-success small">{userName? 'Online': 'Offline'}</div>
            </div>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <Link className="nav-link text-white" to="/Project" onClick={() => setIsSidebarOpen(false)}>Projects</Link></li>
              <li className="nav-item mb-2">
                <Link className="nav-link text-white" to="/Tasks" onClick={() => setIsSidebarOpen(false)}>Tasks</Link></li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/Setting" onClick={() => setIsSidebarOpen(false)}>Settings</Link></li>
              <li className="nav-item">
                {isLoggedIn ? (
                  <Link className="nav-link text-white"
                   to="/login"
                   onClick={() => { handleLogOut(); setIsSidebarOpen(false); }}
                   >Logout</Link>
                ) : (
                  <Link className="nav-link text-white" to="/login" onClick={() => setIsSidebarOpen(false)}>Login</Link>
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
          <main className="col-md-9 col-lg-10 p-4 theme-main d-flex flex-column">
            {/* Children routes to render */}
            <Outlet /> 
          </main>
        </div>
      </div>
    </div>
  )
}