import React from 'react'
import { NavLink } from 'react-router-dom'
import './navBar.css'

export default function NavBar() {
  return (
    <>
    <nav className="navbar">
      <ul className="navbar-list">
        <li><NavLink to='/'>Dashboard</NavLink></li>
        <li><NavLink to='/Project'>Projects</NavLink></li>
        <li><NavLink to='/Tasks'>Tasks</NavLink></li>
        <li><NavLink to='/Login'>Login</NavLink></li>
      </ul>
    </nav>
    </>
  )
}
