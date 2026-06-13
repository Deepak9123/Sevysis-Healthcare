import { useState } from 'react'
import { Plus, Trash2, Send, Save, Stethoscope } from 'lucide-react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import PageHeader from '../../components/common/PageHeader'
import { mockOPDQueue } from '../../data/mockData'

const EMPTY_MED = { name: '', dose: '', duration: '' }

export default function OPDConsultation() {
  const [activePatient, setActivePatient] = useState(mockOPDQueue[0])
  const [form, setForm] = useState({ symptoms: '', diagnosis: '', notes: '' })
  const [medicines, setMedicines] = useState([{ ...EMPTY_MED }])
  const [saved, setSaved] = useState(false)
  const [sent, setSent] = useState(false)

  function addMedicine() {
    setMedicines(prev => [...prev, { ...EMPTY_MED }])
  }

  function removeMedicine(i) {
    setMedicines(prev => prev.filter((_, idx) => idx !== i))
  }

  function updateMedicine(i, field, val) {
    setMedicines(prev => prev.map((m, idx) => idx === i ? { ...m, [field]: val } : m))
  }

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function handleSend() {
    setSent(true)
    setTimeout(() => setSent(false), 2000)
  }

  return (
    <div className="space-y-6">
      <PageHeader title="OPD Consultation" subtitle="Current OPD queue and consultation panel" />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Queue Sidebar */}
        <Card title="OPD Queue">
          <div className="divide-y divide-slate-50">
            {mockOPDQueue.map(q => (
              <button
                key={q.token}
                onClick={() => setActivePatient(q)}
                className={`w-full text-left px-4 py-3.5 transition-colors hover:bg-slate-50 ${
                  activePatient?.token === q.token ? 'bg-sky-50 border-l-2 border-sky-500' : ''
                }`}
              >
                <div className="flex items-center gap-2.5 mb-1">
                  <span className={`w-6 h-6 rounded-md text-xs font-bold flex items-center justify-center ${
                    q.status === 'in-consultation' ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>{q.token}</span>
                  <p className="text-slate-800 text-sm font-semibold">{q.name}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-slate-400 text-xs">{q.time}</p>
                  <Badge status={q.status} />
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Consultation Panel */}
        <div className="lg:col-span-3 space-y-4">
          {/* Patient Info */}
          <Card>
            <div className="flex items-center gap-4 p-5">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                <Stethoscope size={22} className="text-indigo-600" />
              </div>
              <div>
                <p className="text-slate-800 font-bold text-base">{activePatient?.name}</p>
                <p className="text-slate-400 text-sm">Age {activePatient?.age} · Token #{activePatient?.token} · {activePatient?.time}</p>
              </div>
              <div className="ml-auto">
                <Badge status={activePatient?.status} />
              </div>
            </div>
          </Card>

          {/* Symptoms & Diagnosis */}
          <Card title="Consultation Details">
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Symptoms / Chief Complaint</label>
                <textarea
                  value={form.symptoms}
                  onChange={e => setForm(f => ({ ...f, symptoms: e.target.value }))}
                  placeholder={activePatient?.symptoms ?? 'Enter patient symptoms...'}
                  rows={2}
                  className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-sky-400/30 focus:border-sky-400 text-slate-700 placeholder-slate-400 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Diagnosis</label>
                <textarea
                  value={form.diagnosis}
                  onChange={e => setForm(f => ({ ...f, diagnosis: e.target.value }))}
                  placeholder="Enter diagnosis..."
                  rows={2}
                  className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-sky-400/30 focus:border-sky-400 text-slate-700 placeholder-slate-400 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Additional Notes</label>
                <textarea
                  value={form.notes}
                  onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  placeholder="Clinical notes, observations..."
                  rows={2}
                  className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-sky-400/30 focus:border-sky-400 text-slate-700 placeholder-slate-400 resize-none"
                />
              </div>
            </div>
          </Card>

          {/* Prescription */}
          <Card
            title="Prescription"
            action={
              <Button variant="ghost" size="sm" onClick={addMedicine}>
                <Plus size={14} /> Add Medicine
              </Button>
            }
          >
            <div className="p-5">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-slate-400 text-xs border-b border-slate-100">
                      <th className="text-left pb-2 font-medium">Medicine Name</th>
                      <th className="text-left pb-2 font-medium">Dose</th>
                      <th className="text-left pb-2 font-medium">Duration</th>
                      <th className="pb-2"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {medicines.map((m, i) => (
                      <tr key={i}>
                        <td className="py-2 pr-3">
                          <input
                            value={m.name}
                            onChange={e => updateMedicine(i, 'name', e.target.value)}
                            placeholder="e.g. Paracetamol"
                            className="w-full px-2.5 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-400/50 focus:border-sky-400"
                          />
                        </td>
                        <td className="py-2 pr-3">
                          <input
                            value={m.dose}
                            onChange={e => updateMedicine(i, 'dose', e.target.value)}
                            placeholder="500mg 1-0-1"
                            className="w-full px-2.5 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-400/50 focus:border-sky-400"
                          />
                        </td>
                        <td className="py-2 pr-3">
                          <input
                            value={m.duration}
                            onChange={e => updateMedicine(i, 'duration', e.target.value)}
                            placeholder="5 days"
                            className="w-full px-2.5 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-400/50 focus:border-sky-400"
                          />
                        </td>
                        <td className="py-2">
                          <button onClick={() => removeMedicine(i)} className="p-1.5 text-slate-300 hover:text-red-500 transition-colors">
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex gap-3 mt-5 pt-4 border-t border-slate-100">
                <Button variant="primary" size="md" onClick={handleSave}>
                  <Save size={15} /> {saved ? 'Saved!' : 'Save'}
                </Button>
                <Button variant="indigo" size="md" onClick={handleSend}>
                  <Send size={15} /> {sent ? 'Sent!' : 'Send to Pharmacy'}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
