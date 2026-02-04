import { NavLink } from 'react-router-dom'
import './navBar.css'

export default function NavBar() {
  return (
    <>
    <nav className="navbar">
      <ul className="navbar-list">
        <li><NavLink to='/'>Dashboard</NavLink></li>
      </ul>
    </nav>
    </>
  )
}
