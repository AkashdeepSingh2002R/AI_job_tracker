import { useNavigate } from 'react-router-dom'

export function JobCard({ job, onDelete }){
  const navigate = useNavigate()
  const goEdit = () => navigate(`/edit/${job.id}`)

  const badge = {
    applied:   'bg-gray-200 text-gray-800',
    interviewing: 'bg-yellow-200 text-yellow-800',
    offer:     'bg-green-200 text-green-800',
    rejected:  'bg-red-200 text-red-800',
  }[job.status] || 'bg-gray-200 text-gray-800'

  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm">
      <div className="flex justify-between items-start gap-3">
        <div>
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p className="text-sm text-gray-600">{job.company}</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${badge}`}>{job.status}</span>
      </div>
      <p className="mt-2 text-sm text-gray-700 whitespace-pre-wrap">{job.description}</p>
      <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
        <span>Applied: {job.date || '—'}</span>
        <div className="flex gap-2">
          <button onClick={goEdit} className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">Edit</button>
          <button onClick={()=>onDelete(job.id)} className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600">Delete</button>
        </div>
      </div>
    </div>
  )
}
