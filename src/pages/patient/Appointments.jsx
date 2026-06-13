import { useState } from 'react'
import { Calendar, Clock, CheckCircle } from 'lucide-react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import PageHeader from '../../components/common/PageHeader'
import { mockAppointments, mockDoctors, mockTimeSlots } from '../../data/mockData'

export default function Appointments() {
  const [step, setStep] = useState(1)
  const [selected, setSelected] = useState({ doctor: '', date: '', time: '' })
  const [booked, setBooked] = useState(false)
  const [appointments, setAppointments] = useState(mockAppointments)

  function handleBook() {
    if (!selected.doctor || !selected.date || !selected.time) return
    const doc = mockDoctors.find(d => d.id === Number(selected.doctor))
    const newApt = {
      id: Date.now(),
      doctor: doc?.name,
      specialization: doc?.specialization,
      date: selected.date,
      time: selected.time,
      status: 'confirmed',
      type: 'OPD',
    }
    setAppointments(prev => [newApt, ...prev])
    setBooked(true)
    setTimeout(() => { setBooked(false); setStep(1); setSelected({ doctor: '', date: '', time: '' }) }, 2500)
  }

  const STEPS = ['Select Doctor', 'Choose Date & Time', 'Confirm']

  return (
    <div className="space-y-6">
      <PageHeader title="Appointments" subtitle="Book a new appointment or view your existing ones" />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Booking Form */}
        <Card className="lg:col-span-2" title="Book New Appointment">
          {booked ? (
            <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle size={28} className="text-green-500" />
              </div>
              <h3 className="text-slate-800 font-bold text-base">Appointment Confirmed!</h3>
              <p className="text-slate-500 text-sm mt-2">
                {selected.time} on {selected.date} with {mockDoctors.find(d => d.id === Number(selected.doctor))?.name}
              </p>
            </div>
          ) : (
            <div className="p-5 space-y-5">
              {/* Step 1: Doctor */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Select Doctor</label>
                <select
                  value={selected.doctor}
                  onChange={e => setSelected(s => ({ ...s, doctor: e.target.value }))}
                  className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-sky-400/30 focus:border-sky-400 text-slate-700"
                >
                  <option value="">— Choose a doctor —</option>
                  {mockDoctors.filter(d => d.status !== 'off-duty').map(d => (
                    <option key={d.id} value={d.id}>{d.name} · {d.specialization}</option>
                  ))}
                </select>
              </div>

              {/* Step 2: Date */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Calendar size={14} className="inline mr-1.5" />Select Date
                </label>
                <input
                  type="date"
                  value={selected.date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={e => setSelected(s => ({ ...s, date: e.target.value }))}
                  className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-sky-400/30 focus:border-sky-400 text-slate-700"
                />
              </div>

              {/* Step 3: Time Slots */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Clock size={14} className="inline mr-1.5" />Select Time Slot
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {mockTimeSlots.map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelected(s => ({ ...s, time: t }))}
                      className={`py-2 rounded-lg text-xs font-medium border transition-all ${
                        selected.time === t
                          ? 'bg-sky-500 border-sky-500 text-white'
                          : 'border-slate-200 text-slate-600 hover:border-sky-300 hover:text-sky-600 bg-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full justify-center"
                onClick={handleBook}
                disabled={!selected.doctor || !selected.date || !selected.time}
              >
                Confirm Booking
              </Button>
            </div>
          )}
        </Card>

        {/* Appointments Table */}
        <Card
          className="lg:col-span-3"
          title={`All Appointments (${appointments.length})`}
        >
          <div className="divide-y divide-slate-50">
            {appointments.map(apt => (
              <div key={apt.id} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50/50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center shrink-0">
                  <Calendar size={18} className="text-sky-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-800 font-semibold text-sm">{apt.doctor}</p>
                  <p className="text-slate-400 text-xs">{apt.specialization}</p>
                </div>
                <div className="text-right shrink-0 hidden md:block">
                  <p className="text-slate-700 text-sm">{apt.date}</p>
                  <p className="text-slate-400 text-xs">{apt.time}</p>
                </div>
                <Badge status={apt.status} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
