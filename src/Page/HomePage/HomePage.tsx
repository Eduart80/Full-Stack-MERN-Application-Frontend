import React from 'react'
import NavBar from '../../Components/NavBar/NavBar'

export default function HomePage() {
  return (
    <>
    <div style={{ width: '100%', backgroundColor: 'blue', color: 'white', padding: '1rem' }}>
          <NavBar/>
      <nav>NavBar here</nav>
    </div>
    <div style={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
      <div style={{ width: '25%', backgroundColor: 'black', color: 'white', minHeight: '100%' }}>
        <section style={{ padding: '1rem' }}>
          {/* section left */}
          side bar 25% on the left</section>
      </div>
      <div style={{ width: '75%', backgroundColor: 'gray', color: 'white', minHeight: '100%' }}>
        <section style={{ padding: '1rem' }}>
          {/* Section Right */}
          section 3 under nav and 75% of the field for dashboard
        </section>
      </div>
    </div>
    
    </>
  )
}
