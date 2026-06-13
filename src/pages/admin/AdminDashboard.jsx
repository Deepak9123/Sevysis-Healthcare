import { Users, UserCheck, BedDouble, TrendingUp, ArrowRight, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import StatCard from '../../components/ui/StatCard'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { mockDoctors, mockPatients, mockBeds } from '../../data/mockData'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const totalBeds = mockBeds.reduce((s, b) => s + b.total, 0)
  const occupiedBeds = mockBeds.reduce((s, b) => s + b.occupied, 0)

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-4 sm:p-6 text-white">
          <p className="text-slate-400 text-sm">Admin Panel</p>
          <h2 className="text-xl sm:text-2xl font-bold mt-0.5">Hospital Overview</h2>
          <p className="text-slate-400 text-sm mt-1 break-words">Sevysis Healthcare Management System</p>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-slate-100 text-slate-800 flex flex-col gap-3 sm:gap-2">
          <Button variant="primary" size="sm" className="w-full justify-center" onClick={() => navigate('/admin/doctors')}>
            <Plus size={14} /> Add Doctor
          </Button>
          <Button variant="secondary" size="sm" className="w-full justify-center" onClick={() => navigate('/admin/beds')}>
            Manage Beds
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={UserCheck} label="Total Doctors" value={mockDoctors.length} sub={`${mockDoctors.filter(d => d.status === 'available').length} available now`} color="sky" />
        <StatCard icon={Users} label="Total Patients" value={mockPatients.length} sub={`${mockPatients.filter(p => p.status === 'IPD').length} admitted (IPD)`} color="indigo" />
        <StatCard icon={BedDouble} label="Beds Occupied" value={`${occupiedBeds}/${totalBeds}`} sub={`${totalBeds - occupiedBeds} available`} color="rose" />
        <StatCard icon={TrendingUp} label="Today's Revenue" value="₹42,500" sub="+12% from yesterday" color="green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bed Occupancy */}
        <Card title="Ward Occupancy">
          <div className="p-5 space-y-4">
            {mockBeds.map(b => {
              const pct = Math.round((b.occupied / b.total) * 100)
              const barColor = pct >= 90 ? 'bg-red-500' : pct >= 70 ? 'bg-amber-500' : 'bg-green-500'
              return (
                <div key={b.ward}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-slate-700 font-medium">{b.ward}</span>
                    <span className="text-slate-500">{b.occupied}/{b.total} <span className="text-slate-400 text-xs">beds</span></span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${barColor} rounded-full transition-all`} style={{ width: `${pct}%` }} />
                  </div>
                  <p className="text-slate-400 text-xs mt-1">{pct}% occupied · {b.available} free</p>
                </div>
              )
            })}
          </div>
        </Card>

        {/* Doctors */}
        <Card
          title="Doctors on Duty"
          action={<Button variant="ghost" size="sm" onClick={() => navigate('/admin/doctors')}><ArrowRight size={14} /></Button>}
        >
          <div className="divide-y divide-slate-50">
            {mockDoctors.slice(0, 4).map(d => (
              <div key={d.id} className="flex items-center gap-3 px-5 py-3.5">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 text-xs font-bold shrink-0">
                  {d.name.split(' ').filter(p => !p.startsWith('Dr')).map(p => p[0]).join('').slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-800 text-sm font-semibold truncate">{d.name}</p>
                  <p className="text-slate-400 text-xs">{d.specialization}</p>
                </div>
                <Badge status={d.status} />
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Patients */}
        <Card
          title="Recent Patients"
          action={<Button variant="ghost" size="sm" onClick={() => navigate('/admin/patients')}><ArrowRight size={14} /></Button>}
        >
          <div className="divide-y divide-slate-50">
            {mockPatients.map(p => (
              <div key={p.id} className="flex items-center gap-3 px-5 py-3.5">
                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 text-xs font-bold shrink-0">
                  {p.name.split(' ').map(x => x[0]).join('').slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-800 text-sm font-semibold truncate">{p.name}</p>
                  <p className="text-slate-400 text-xs">Age {p.age} · {p.gender}</p>
                </div>
                <Badge status={p.status} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
