import React from 'react'

export default function TasksView() {
  return (
    <div>
      <h2>Tasks</h2>
      <div className="mb-4">
        <button className="btn btn-primary">+ Add New Task</button>
      </div>
      
      {/* Task List */}
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Setup Backend API</h5>
          <p className="card-text text-muted">Due: Feb 5, 2026</p>
          <span className="badge bg-warning">In Progress</span>
        </div>
      </div>
      
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Design UI Components</h5>
          <p className="card-text text-muted">Due: Feb 8, 2026</p>
          <span className="badge bg-success">Completed</span>
        </div>
      </div>
      
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Write Unit Tests</h5>
          <p className="card-text text-muted">Due: Feb 10, 2026</p>
          <span className="badge bg-secondary">Todo</span>
        </div>
      </div>
    </div>
  )
}