import { Calendar, FileText, CreditCard, BarChart2, Clock, CheckCircle, ArrowRight, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import StatCard from '../../components/ui/StatCard'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { mockAppointments, mockPrescriptions, mockPatients } from '../../data/mockData'

export default function PatientDashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const upcoming = mockAppointments.filter(a => a.status !== 'completed')
  const patientCount = mockPatients.length

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <div className="bg-gradient-to-r from-sky-500 to-sky-600 rounded-xl p-4 sm:p-6 text-white">
          <p className="text-sky-100 text-sm font-medium">Good morning,</p>
          <h2 className="text-xl sm:text-2xl font-bold mt-0.5">{user?.name}</h2>
          <p className="text-sky-100 text-sm mt-1 break-words">Blood Group: {user?.bloodGroup} · ID: {user?.id}</p>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-slate-100 text-slate-800 flex items-center gap-2 sm:gap-3">
          <div className="rounded-xl bg-sky-500/10 p-2 sm:p-2.5 flex items-center justify-center text-sky-500">
            <CheckCircle size={18} />
          </div>
          <p className="text-sm font-medium">Health status: Good</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Calendar} label="Total Appointments" value="4" sub="2 upcoming" color="sky" />
        <StatCard icon={FileText} label="Active Prescriptions" value="1" sub="Valid through July" color="indigo" />
        <StatCard icon={Users} label="Patient Records" value={patientCount} sub="Total profiles" color="green" />
        <StatCard icon={BarChart2} label="Lab Reports" value="4" sub="All ready to view" color="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <Card
          className="lg:col-span-2"
          title="Upcoming Appointments"
          action={<Button variant="ghost" size="sm" onClick={() => navigate('/patient/appointments')}><ArrowRight size={14} /></Button>}
        >
          <div className="divide-y divide-slate-50">
            {upcoming.length === 0 ? (
              <p className="px-5 py-8 text-center text-slate-400 text-sm">No upcoming appointments</p>
            ) : upcoming.map(apt => (
              <div key={apt.id} className="flex items-center gap-4 px-5 py-4">
                <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center shrink-0">
                  <Calendar size={18} className="text-sky-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-800 font-semibold text-sm">{apt.doctor}</p>
                  <p className="text-slate-400 text-xs">{apt.specialization}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-slate-700 text-sm font-medium">{apt.date}</p>
                  <p className="text-slate-400 text-xs">{apt.time}</p>
                </div>
                <Badge status={apt.status} />
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-4">
          <Card title="Quick Actions">
            <div className="p-4 space-y-2.5">
              <button onClick={() => navigate('/patient/appointments')} className="w-full flex items-center gap-3 p-3 rounded-xl bg-sky-50 hover:bg-sky-100 transition-colors text-left">
                <div className="w-9 h-9 rounded-lg bg-sky-500 flex items-center justify-center">
                  <Calendar size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-slate-800 text-sm font-semibold">Book Appointment</p>
                  <p className="text-slate-400 text-xs">Schedule a consultation</p>
                </div>
              </button>
              <button onClick={() => navigate('/patient/reports')} className="w-full flex items-center gap-3 p-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 transition-colors text-left">
                <div className="w-9 h-9 rounded-lg bg-indigo-500 flex items-center justify-center">
                  <BarChart2 size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-slate-800 text-sm font-semibold">View Reports</p>
                  <p className="text-slate-400 text-xs">Lab & radiology results</p>
                </div>
              </button>
              <button onClick={() => navigate('/patient/prescriptions')} className="w-full flex items-center gap-3 p-3 rounded-xl bg-green-50 hover:bg-green-100 transition-colors text-left">
                <div className="w-9 h-9 rounded-lg bg-green-500 flex items-center justify-center">
                  <FileText size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-slate-800 text-sm font-semibold">Prescriptions</p>
                  <p className="text-slate-400 text-xs">View current medications</p>
                </div>
              </button>
            </div>
          </Card>

          <Card title="Last Visit">
            <div className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center">
                  <Clock size={16} className="text-slate-500" />
                </div>
                <div>
                  <p className="text-slate-800 text-sm font-semibold">Dr. Priya Mehta</p>
                  <p className="text-slate-400 text-xs">2026-06-01 · OPD</p>
                </div>
              </div>
              <p className="text-slate-600 text-xs bg-slate-50 rounded-lg p-3">
                Diagnosis: Hypertension · Follow-up in 2 weeks
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
