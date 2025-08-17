import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { toast } from 'react-toastify'

export function Register(){
  const { state, dispatch } = useApp()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const navigate = useNavigate()

  useEffect(()=>{
    if(state.authError){ toast.error(state.authError); dispatch({ type:'CLEAR_AUTH_ERROR' }) }
  }, [state.authError, dispatch])

  useEffect(()=>{ if(state.isLoggedIn){ toast.success('Account created'); navigate('/dashboard') } }, [state.isLoggedIn, navigate])

  const onSubmit = (e)=>{
    e.preventDefault()
    if(!username.trim()) return toast.error('Username is required')
    if(password.length < 6) return toast.error('Password must be at least 6 characters')
    if(password !== confirm) return toast.error('Passwords do not match')
    dispatch({ type:'REGISTER', payload:{ username, password } })
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] grid place-items-center px-4">
      <form onSubmit={onSubmit} className="w-full max-w-md bg-white border rounded-xl p-6 shadow-sm space-y-4">
        <h2 className="text-2xl font-semibold">Create account</h2>
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
        <div>
          <label className="block text-sm mb-1">Confirm password</label>
          <input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"/>
        </div>
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Create Account</button>
      </form>
    </div>
  )
}
