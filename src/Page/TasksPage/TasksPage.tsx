import { useState } from 'react'
import BackButton from '../../Components/BackButton/BackButton'
import TasksView from '../../Components/Task/TaskView'
import TaskModal from '../../Components/Modals/TaskModals'
import { useParams } from 'react-router-dom'


export default function Tasks() {
  const {projectId}=useParams<{projectId:string}>()
  const [showCreateModal, setShowCreateModal]=useState(false)
  const[refreshTasks, setRefreshTasks]=useState(0)
  
  const handleTaskCreation= ()=>{
    setShowCreateModal(false)
    setRefreshTasks(prev => prev + 1)
  }

  return (
    <>
    <div className="d-flex align-items-center">
        <BackButton />
       </div>
    <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Your Tasks</h2>
        <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
          <i className="bi bi-plus-circle me-2"></i>
          Create New Task
        </button>
      </div>
      <hr/>
    <div className="row mb-4">
      <TasksView key={refreshTasks}/>
    </div>

     {showCreateModal && projectId && (
      <TaskModal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        onTaskCreated={handleTaskCreation}
        projectId={projectId}
      />
     )}
    </>

  )
}
