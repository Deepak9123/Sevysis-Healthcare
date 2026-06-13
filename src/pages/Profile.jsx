import PageHeader from '../components/common/PageHeader'
import { useAuth } from '../context/AuthContext'

export default function Profile() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="space-y-6">
      <PageHeader title="Profile" subtitle="Your account details and dashboard settings" />

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 max-w-3xl">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-sky-500 flex items-center justify-center text-white text-3xl font-semibold">
            {user.initials}
          </div>
          <div>
            <h2 className="text-slate-900 text-2xl font-semibold">{user.name}</h2>
            <p className="text-slate-500 mt-1 capitalize">{user.role}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">User ID</p>
            <p className="text-sm font-medium text-slate-900 mt-2">{user.id}</p>
          </div>
          {user.contact && (
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Contact</p>
              <p className="text-sm font-medium text-slate-900 mt-2">{user.contact}</p>
            </div>
          )}
          {user.specialization && (
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Specialization</p>
              <p className="text-sm font-medium text-slate-900 mt-2">{user.specialization}</p>
            </div>
          )}
          {user.department && (
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Department</p>
              <p className="text-sm font-medium text-slate-900 mt-2">{user.department}</p>
            </div>
          )}
          {user.age && (
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Age</p>
              <p className="text-sm font-medium text-slate-900 mt-2">{user.age}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
