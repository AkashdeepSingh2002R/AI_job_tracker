import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { toast } from 'react-toastify'

export function EditJob(){
  const { id } = useParams()
  const { state, dispatch } = useApp()
  const nav = useNavigate()
  const job = useMemo(()=> state.jobs.find(j => j.id === id), [state.jobs, id])
  const [form, setForm] = useState({ company:'', title:'', status:'applied', date:'', description:'' })

  useEffect(()=>{
    if(job){
      setForm({ company: job.company, title: job.title, status: job.status, date: job.date || '', description: job.description || '' })
    }
  }, [job])

  if(!job){
    return <div className="max-w-xl mx-auto bg-white border rounded-xl p-6 shadow-sm">Job not found.</div>
  }

  const onChange = (e)=> setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = (e)=>{
    e.preventDefault()
    if(!form.company.trim()) return toast.error('Company is required')
    if(!form.title.trim()) return toast.error('Job title is required')
    dispatch({ type:'UPDATE_JOB', payload:{ id, updates: form } })
    toast.success('Job updated')
    nav('/dashboard')
  }

  return (
    <div className="max-w-xl mx-auto bg-white border rounded-xl p-6 shadow-sm space-y-4">
      <h2 className="text-xl font-semibold">Edit Job</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Company</label>
          <input name="company" value={form.company} onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"/>
        </div>
        <div>
          <label className="block text-sm mb-1">Title</label>
          <input name="title" value={form.title} onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"/>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm mb-1">Status</label>
            <select name="status" value={form.status} onChange={onChange} className="w-full px-3 py-2 border rounded">
              <option value="applied">Applied</option>
              <option value="interviewing">Interviewing</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm mb-1">Date</label>
            <input type="date" name="date" value={form.date} onChange={onChange}
              className="w-full px-3 py-2 border rounded"/>
          </div>
        </div>
        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea name="description" value={form.description} onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" rows="4"/>
        </div>
        <div className="flex justify-end gap-2">
          <button type="button" onClick={()=>nav('/dashboard')} className="px-3 py-2 rounded border">Cancel</button>
          <button className="px-3 py-2 rounded bg-blue-600 text-white">Save</button>
        </div>
      </form>
    </div>
  )
}
