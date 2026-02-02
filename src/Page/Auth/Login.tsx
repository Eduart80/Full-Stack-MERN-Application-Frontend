import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../../API/AuthAPI'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  
  return (
    <div>Login</div>
  )
}
