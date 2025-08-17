import { createContext, useContext, useEffect, useReducer } from 'react'

const Ctx = createContext()

function safeRead(key, fallback){
  const raw = localStorage.getItem(key)
  if(!raw || raw === '[object Object]') return fallback
  try { return JSON.parse(raw) } catch { return fallback }
}

const initial = {
  accounts: safeRead('accounts', []),
  jobs: safeRead('jobs', []),
  currentUser: localStorage.getItem('currentUser') || null,
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
  authError: null,
}

function reducer(state, action){
  switch(action.type){
    // Auth
    case 'REGISTER': {
      const { username, password } = action.payload
      const exists = state.accounts.some(a => a.username.toLowerCase() === username.toLowerCase())
      if(exists) return { ...state, authError: 'Username already exists' }
      const accounts = [...state.accounts, { username, password }]
      return { ...state, accounts, currentUser: username, isLoggedIn: true, authError: null }
    }
    case 'LOGIN': {
      const { username, password } = action.payload
      const ok = state.accounts.find(a => a.username.toLowerCase() === username.toLowerCase() && a.password === password)
      if(!ok) return { ...state, authError: 'Invalid credentials' }
      return { ...state, currentUser: username, isLoggedIn: true, authError: null }
    }
    case 'LOGOUT':
      return { ...state, currentUser: null, isLoggedIn: false, authError: null }

    // Jobs
    case 'ADD_JOB': {
      const job = { ...action.payload, id: crypto.randomUUID() }
      return { ...state, jobs: [job, ...state.jobs] }
    }
    case 'UPDATE_JOB': {
      const { id, updates } = action.payload
      const jobs = state.jobs.map(j => j.id === id ? { ...j, ...updates } : j)
      return { ...state, jobs }
    }
    case 'DELETE_JOB':
      return { ...state, jobs: state.jobs.filter(j => j.id !== action.payload) }

    // Utils
    case 'CLEAR_AUTH_ERROR': return { ...state, authError: null }

    default: return state
  }
}

export function AppProvider({ children }){
  const [state, dispatch] = useReducer(reducer, initial)

  useEffect(()=> localStorage.setItem('accounts', JSON.stringify(state.accounts)), [state.accounts])
  useEffect(()=> localStorage.setItem('jobs', JSON.stringify(state.jobs)), [state.jobs])
  useEffect(()=> {
    localStorage.setItem('currentUser', state.currentUser ?? '')
    localStorage.setItem('isLoggedIn', String(state.isLoggedIn))
  }, [state.currentUser, state.isLoggedIn])

  return <Ctx.Provider value={{ state, dispatch }}>{children}</Ctx.Provider>
}

export function useApp(){ return useContext(Ctx) }
