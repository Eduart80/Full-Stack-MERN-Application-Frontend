import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { createProject, updateProject, type Project } from "../../API/ProjectAPI";

interface CreateProjectModalProps {
  show: boolean;
  onHide: () => void;
  onProjectCreated: () => void;
  editMode?: boolean;
  projectToEdit?: Project;
}

///////// PROJECT /////////
export default function CreateProjectModal({
  show,
  onHide,
  onProjectCreated,
  editMode = false, 
  projectToEdit 
}: CreateProjectModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editMode && projectToEdit) {
      setName(projectToEdit.name);
      setDescription(projectToEdit.description);
      setStatus(projectToEdit.status || "Pending");
      setStartDate(projectToEdit.startDate || "");
      setEndDate(projectToEdit.endDate || "");
    } else {
      // Reset form for create mode
      setName("");
      setDescription("");
      setStatus("Pending");
      setStartDate("");
      setEndDate("");
    }
  }, [editMode, projectToEdit, show]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const projectData = { 
        name, 
        description, 
        status,
        startDate: startDate || "", 
        endDate: endDate || ""
      }

      if (editMode && projectToEdit) {
        await updateProject(projectToEdit._id, projectData);
      } else {
        await createProject(projectData);
      }
      setName("")
      setDescription("")
      setStartDate("Pending")
      setEndDate("")
      onProjectCreated();
    } catch (err: any) {
      setError(err.message || "Failed to create project");
    } finally {
      setLoading(false);
    }
  };


  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{editMode? 'Edit Project' : 'Create New Project'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter project name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter project description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status <span className="text-danger">*</span></Form.Label>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
              disabled={loading}
            >
              <option value="Pending">Pending</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
            </Form.Select>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              disabled={loading}
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onHide} disabled={loading}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Project"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
