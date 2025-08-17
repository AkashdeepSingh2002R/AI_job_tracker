import { useApp } from '../context/AppContext'

export function Profile(){
  const { state } = useApp()
  return (
    <div className="max-w-xl mx-auto bg-white border rounded-xl p-6 shadow-sm space-y-2">
      <h2 className="text-xl font-semibold">Profile</h2>
      <div><span className="text-gray-500 text-sm">User:</span> <span className="font-medium">{state.currentUser || '—'}</span></div>
      <div><span className="text-gray-500 text-sm">Jobs saved:</span> <span className="font-medium">{state.jobs.length}</span></div>
    </div>
  )
}
