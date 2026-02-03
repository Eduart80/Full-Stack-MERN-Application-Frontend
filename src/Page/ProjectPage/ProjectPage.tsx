import React, { useState } from 'react'
import ProjectComp from '../../Components/ProjectComp/ProjectComp'
import CreateProjectModal from '../../Components/Modals/Modals'
import BackButton from '../../Components/BackButton/BackButton' 

export default function Project() {
  const [showCreateModal, setShowCreateModal]=useState(false)
  const[refreshProject, setRefreshProject]=useState(0)

  const handleProjectCreation= ()=>{
    setShowCreateModal(false)
    setRefreshProject(prev => prev + 1)
  }
  return (
   <>
   <div className="d-flex align-items-center">
    <BackButton />
   </div>
    {/* Main Section */}
    <main className="col-md-9 col-lg-12 p-4 bg-white d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Your Projects</h2>
        <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
          <i className="bi bi-plus-circle me-2"></i>
          Create New Project
        </button>
      </div>
      <hr/>
      <div className="row mb-4">
        <ProjectComp key={refreshProject} />
        </div>

        {showCreateModal && (
        <CreateProjectModal 
          show={showCreateModal}
          onHide={() => setShowCreateModal(false)}
          onProjectCreated={handleProjectCreation}
        />
      )}
    </main>
   </>
  )
}
