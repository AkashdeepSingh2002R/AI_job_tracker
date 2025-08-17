import { NavLink, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export function Header(){
  const { state, dispatch } = useApp()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
    navigate('/login')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-blue-600 text-white shadow">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <NavLink to="/dashboard" className="text-xl font-semibold">Job Tracker</NavLink>
          <ul className="hidden sm:flex items-center gap-6">
            <li><NavLink to="/dashboard" className={({isActive})=> isActive?'text-white font-semibold':'hover:text-blue-200'}>Dashboard</NavLink></li>
            <li><NavLink to="/add" className={({isActive})=> isActive?'text-white font-semibold':'hover:text-blue-200'}>Add Job</NavLink></li>
            <li><NavLink to="/profile" className={({isActive})=> isActive?'text-white font-semibold':'hover:text-blue-200'}>Profile</NavLink></li>
          </ul>
          <div className="flex items-center gap-3">
            {state.isLoggedIn ? (
              <button onClick={handleLogout} className="bg-red-500 px-3 py-1.5 rounded hover:bg-red-600">Logout</button>
            ) : (
              <NavLink to="/login" className="bg-white text-blue-600 px-3 py-1.5 rounded hover:bg-blue-50">Login</NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
