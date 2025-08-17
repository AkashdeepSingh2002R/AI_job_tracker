import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { toast } from 'react-toastify'

export function Login(){
  const { state, dispatch } = useApp()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(()=>{
    if(state.authError){ toast.error(state.authError); dispatch({ type:'CLEAR_AUTH_ERROR' }) }
  }, [state.authError, dispatch])

  useEffect(()=>{ if(state.isLoggedIn){ toast.success('Logged in'); navigate('/dashboard') } }, [state.isLoggedIn, navigate])

  const onSubmit = (e)=>{
    e.preventDefault()
    if(!username.trim()) return toast.error('Username is required')
    if(!password) return toast.error('Password is required')
    dispatch({ type:'LOGIN', payload:{ username, password } })
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] grid place-items-center px-4">
      <form onSubmit={onSubmit} className="w-full max-w-md bg-white border rounded-xl p-6 shadow-sm space-y-4">
        <h2 className="text-2xl font-semibold">Welcome back</h2>
        <div>
          <label className="block text-sm mb-1">Username</label>
          <input value={username} onChange={e=>setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"/>
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"/>
        </div>
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
        <p className="text-sm text-center">No account? <Link to="/register" className="text-blue-600 hover:underline">Create one</Link></p>
      </form>
    </div>
  )
}
