import { useState } from 'react'
import { Activity, RefreshCw, CheckCircle } from 'lucide-react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import PageHeader from '../../components/common/PageHeader'
import { mockIPDPatients, mockVitals } from '../../data/mockData'

const VITALS = [
  { label: 'Blood Pressure', key: 'bp', icon: '🩺' },
  { label: 'Pulse Rate', key: 'pulse', icon: '💓' },
  { label: 'Temperature', key: 'temp', icon: '🌡️' },
  { label: 'SpO₂', key: 'spo2', icon: '🫁' },
]

const MEDS = [
  { name: 'Atorvastatin 10mg', time: '08:00 AM', status: 'given' },
  { name: 'Aspirin 75mg', time: '08:00 AM', status: 'given' },
  { name: 'Metoprolol 25mg', time: '02:00 PM', status: 'pending' },
  { name: 'Atorvastatin 10mg', time: '08:00 PM', status: 'pending' },
]

export default function IPDMonitoring() {
  const [activePatient, setActivePatient] = useState(mockIPDPatients[0])
  const [notes, setNotes] = useState('')
  const [vitals, setVitals] = useState(mockVitals)
  const [updated, setUpdated] = useState(false)

  function handleUpdate() {
    setUpdated(true)
    setTimeout(() => setUpdated(false), 2000)
  }

  return (
    <div className="space-y-6">
      <PageHeader title="IPD Monitoring" subtitle="Track inpatient status, vitals and medication charts" />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Patient List */}
        <Card title="IPD Patients">
          <div className="divide-y divide-slate-50">
            {mockIPDPatients.map(p => (
              <button
                key={p.id}
                onClick={() => setActivePatient(p)}
                className={`w-full text-left px-4 py-3.5 transition-colors hover:bg-slate-50 ${
                  activePatient?.id === p.id ? 'bg-indigo-50 border-l-2 border-indigo-500' : ''
                }`}
              >
                <p className="text-slate-800 text-sm font-semibold">{p.name}</p>
                <p className="text-slate-400 text-xs mt-0.5">{p.ward} · {p.bed}</p>
                <div className="mt-1.5">
                  <Badge status={p.condition} />
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Monitoring Panel */}
        <div className="lg:col-span-3 space-y-4">
          {/* Patient Info Banner */}
          <Card>
            <div className="flex items-center gap-5 p-5">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
                <Activity size={22} className="text-indigo-600" />
              </div>
              <div className="flex-1">
                <p className="text-slate-800 font-bold text-base">{activePatient?.name}</p>
                <p className="text-slate-400 text-sm">{activePatient?.ward} · Bed {activePatient?.bed} · Admitted {activePatient?.admitDate}</p>
                <p className="text-slate-500 text-xs mt-0.5">{activePatient?.diagnosis} · Day {activePatient?.days}</p>
              </div>
              <Badge status={activePatient?.condition} />
            </div>
          </Card>

          {/* Vitals */}
          <Card title="Vitals">
            <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-3">
              {VITALS.map(v => (
                <div key={v.key} className="bg-slate-50 rounded-xl p-3 text-center">
                  <span className="text-xl">{v.icon}</span>
                  <p className="text-slate-800 font-bold text-base mt-1">{vitals[v.key]}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{v.label}</p>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Daily Notes */}
            <Card title="Daily Notes">
              <div className="p-4">
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Enter daily progress notes for this patient..."
                  rows={5}
                  className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-sky-400/30 focus:border-sky-400 text-slate-700 placeholder-slate-400 resize-none"
                />
              </div>
            </Card>

            {/* Medication Chart */}
            <Card title="Medication Chart">
              <div className="divide-y divide-slate-50">
                {MEDS.map((m, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${m.status === 'given' ? 'bg-green-500' : 'bg-amber-400'}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-700 text-sm font-medium truncate">{m.name}</p>
                      <p className="text-slate-400 text-xs">{m.time}</p>
                    </div>
                    <span className={`text-xs font-semibold ${m.status === 'given' ? 'text-green-600' : 'text-amber-600'}`}>
                      {m.status === 'given' ? 'Given' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="flex justify-end">
            <Button variant="primary" size="lg" onClick={handleUpdate}>
              {updated ? <><CheckCircle size={16} /> Updated!</> : <><RefreshCw size={16} /> Update Record</>}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
