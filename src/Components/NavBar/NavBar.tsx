import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavBar() {
  return (
    <>
    <nav>
      <ul>
        <li><NavLink to='/'>Dashboard</NavLink></li>
        <li><NavLink to='/Project'>Projects</NavLink></li>
        <li><NavLink to='/Tasks'>Tasks</NavLink></li>
        <li><NavLink to='/Login'>Login</NavLink></li>
      </ul>
    </nav>
    </>
  )
}
