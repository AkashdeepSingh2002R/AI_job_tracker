import { useMemo, useState } from 'react'
import { useApp } from '../context/AppContext'
import { JobCard } from '../components/JobCard'

export function Dashboard(){
  const { state, dispatch } = useApp()
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('all')

  const filtered = useMemo(()=>{
    return state.jobs.filter(j => {
      const matchesQ = (j.company + ' ' + j.title + ' ' + j.description).toLowerCase().includes(q.toLowerCase())
      const matchesS = status === 'all' ? true : j.status === status
      return matchesQ && matchesS
    })
  }, [state.jobs, q, status])

  const counts = useMemo(()=>{
    const c = { total: state.jobs.length, applied:0, interviewing:0, offer:0, rejected:0 }
    for(const j of state.jobs){ c[j.status] = (c[j.status]||0)+1 }
    return c
  }, [state.jobs])

  const del = (id)=> dispatch({ type:'DELETE_JOB', payload:id })

  const exportJSON = ()=> {
    const blob = new Blob([JSON.stringify(state.jobs, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'jobs.json'; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <Stat label="Total" value={counts.total}/>
        <Stat label="Applied" value={counts.applied}/>
        <Stat label="Interviewing" value={counts.interviewing}/>
        <Stat label="Offer" value={counts.offer}/>
        <Stat label="Rejected" value={counts.rejected}/>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <input placeholder="Search company, title, description..." value={q} onChange={e=>setQ(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"/>
        <select value={status} onChange={e=>setStatus(e.target.value)} className="px-3 py-2 border rounded">
          <option value="all">All</option>
          <option value="applied">Applied</option>
          <option value="interviewing">Interviewing</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
        <button onClick={exportJSON} className="px-3 py-2 rounded bg-gray-800 text-white">Export JSON</button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {filtered.map(job => <JobCard key={job.id} job={job} onDelete={del}/>)}
        {filtered.length === 0 && <p className="text-gray-600">No jobs match your search.</p>}
      </div>
    </div>
  )
}

function Stat({label, value}){
  return (
    <div className="bg-white border rounded-xl p-4 text-center shadow-sm">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  )
}
