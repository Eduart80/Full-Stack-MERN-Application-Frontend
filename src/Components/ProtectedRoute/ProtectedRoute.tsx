import React from 'react';
import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../../API/AuthAPI'

export default function ProtectedRoute({ children }: { children: React.ReactElement }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }
  
  return children
}