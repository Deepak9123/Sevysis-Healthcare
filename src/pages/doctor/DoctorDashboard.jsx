import { Users, BedDouble, ClipboardList, CheckCircle, Clock, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import StatCard from '../../components/ui/StatCard'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { mockOPDQueue, mockIPDPatients } from '../../data/mockData'

export default function DoctorDashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-xl p-4 sm:p-6 text-white">
          <p className="text-indigo-200 text-sm font-medium">Good morning,</p>
          <h2 className="text-xl sm:text-2xl font-bold mt-0.5">{user?.name}</h2>
          <p className="text-indigo-200 text-sm mt-1 break-words">{user?.specialization} · {user?.id}</p>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-slate-100 text-slate-800 flex items-center gap-2 sm:gap-3">
          <div className="rounded-xl bg-indigo-500/10 p-2 sm:p-2.5 flex items-center justify-center text-indigo-600">
            <Clock size={18} />
          </div>
          <p className="text-sm font-medium">OPD starts at 09:00 AM</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={ClipboardList} label="Today's OPD" value={mockOPDQueue.length} sub="4 in queue" color="sky" />
        <StatCard icon={BedDouble} label="IPD Patients" value={mockIPDPatients.length} sub="1 critical" color="rose" />
        <StatCard icon={CheckCircle} label="Consultations Done" value="6" sub="Today so far" color="green" />
        <StatCard icon={Users} label="Pending Reviews" value="2" sub="IPD notes due" color="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* OPD Queue */}
        <Card
          className="lg:col-span-2"
          title="Today's OPD Queue"
          action={<Button variant="ghost" size="sm" onClick={() => navigate('/doctor/opd')}><ArrowRight size={14} /></Button>}
        >
          <div className="divide-y divide-slate-50">
            {mockOPDQueue.map(q => (
              <div key={q.token} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50/50 transition-colors">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${
                  q.status === 'in-consultation' ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {q.token}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-800 font-semibold text-sm">{q.name}</p>
                  <p className="text-slate-400 text-xs">Age {q.age} · {q.symptoms}</p>
                </div>
                <p className="text-slate-500 text-sm shrink-0 hidden md:block">{q.time}</p>
                <Badge status={q.status} />
              </div>
            ))}
          </div>
        </Card>

        {/* IPD Summary */}
        <div className="space-y-4">
          <Card
            title="IPD Patients"
            action={<Button variant="ghost" size="sm" onClick={() => navigate('/doctor/ipd/monitor')}><ArrowRight size={14} /></Button>}
          >
            <div className="divide-y divide-slate-50">
              {mockIPDPatients.map(p => (
                <div key={p.id} className="px-5 py-3.5">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-slate-800 font-semibold text-sm">{p.name}</p>
                    <Badge status={p.condition} />
                  </div>
                  <p className="text-slate-400 text-xs">{p.ward} · Bed {p.bed} · Day {p.days}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Quick Actions">
            <div className="p-4 space-y-2.5">
              <Button variant="primary" size="md" className="w-full justify-center" onClick={() => navigate('/doctor/opd')}>
                Start OPD Consultation
              </Button>
              <Button variant="secondary" size="md" className="w-full justify-center" onClick={() => navigate('/doctor/ipd/admit')}>
                Admit New Patient
              </Button>
              <Button variant="secondary" size="md" className="w-full justify-center" onClick={() => navigate('/doctor/discharge')}>
                Process Discharge
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
