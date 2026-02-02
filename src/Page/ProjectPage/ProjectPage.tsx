import React from 'react'
import ProjectComp from '../../Components/ProjectComp/ProjectComp'

export default function Project() {
  return (
   <>
    {/* Main Section */}
    <main className="col-md-9 col-lg-10 p-4 bg-white d-flex flex-column">
      <h2>Your Projects</h2>
      <div className="row mb-4">
        <ProjectComp/>
        </div>
        <div className="col-md-4 mb-3">
        <p>project card 2</p>
        </div>
    </main>
   </>
  )
}
