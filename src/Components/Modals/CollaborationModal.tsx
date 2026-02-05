import { useState } from 'react';
import { Modal, Button, Form, ListGroup, Badge } from 'react-bootstrap';
import { searchUserByEmail, addCollaborator, removeCollaborator } from '../../API/CollaborationAPI';
import type { User } from '../../types';

interface CollaborationModalProps {
  show: boolean;
  onHide: () => void;
  projectId: string;
  projectName: string;
  collaborators: User[];
  isOwner: boolean;
  onCollaboratorAdded: () => void;
}

export default function CollaborationModal({ 
  show, 
  onHide, 
  projectId, 
  projectName,
  collaborators,
  isOwner,
  onCollaboratorAdded 
}: CollaborationModalProps) {
  const [email, setEmail] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError('');
    setSearchResults([]);

    try {
      const users = await searchUserByEmail(email.trim());
      setSearchResults(users);
      if (users.length === 0) {
        setError('No users found with that email');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCollaborator = async (userId: string) => {
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      await addCollaborator(projectId, userId);
      setSuccessMessage('Collaborator added successfully!');
      setSearchResults([]);
      setEmail('');
      onCollaboratorAdded();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCollaborator = async (userId: string) => {
    if (!window.confirm('Remove this collaborator?')) return;

    setLoading(true);
    setError('');

    try {
      await removeCollaborator(projectId, userId);
      setSuccessMessage('Collaborator removed successfully!');
      onCollaboratorAdded();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isAlreadyCollaborator = (userId: string) => {
    return collaborators.some(c => c._id === userId);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Manage Collaborators - {projectName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}

        {/* Current Collaborators */}
        <div className="mb-4">
          <h6>Current Collaborators ({collaborators.length})</h6>
          {collaborators.length === 0 ? (
            <p className="text-muted">No collaborators yet. Add someone below!</p>
          ) : (
            <ListGroup>
              {collaborators.map((user) => (
                <ListGroup.Item key={user._id} className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{user.username}</strong>
                    <br />
                    <small className="text-muted">{user.email}</small>
                  </div>
                  {isOwner && (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleRemoveCollaborator(user._id)}
                      disabled={loading}
                    >
                      Remove
                    </Button>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </div>

        {/* Add Collaborator */}
        {isOwner && (
          <>
            <hr />
            <h6>Add New Collaborator</h6>
            <Form onSubmit={handleSearch}>
              <Form.Group className="mb-3">
                <Form.Label>Search by Email</Form.Label>
                <div className="d-flex gap-2">
                  <Form.Control
                    type="email"
                    placeholder="Enter user email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                  </Button>
                </div>
              </Form.Group>
            </Form>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="mt-3">
                <h6>Search Results:</h6>
                <ListGroup>
                  {searchResults.map((user) => (
                    <ListGroup.Item key={user._id} className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{user.username}</strong>
                        <br />
                        <small className="text-muted">{user.email}</small>
                      </div>
                      {isAlreadyCollaborator(user._id) ? (
                        <Badge bg="secondary">Already Added</Badge>
                      ) : (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleAddCollaborator(user._id)}
                          disabled={loading}
                        >
                          Add
                        </Button>
                      )}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            )}
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
