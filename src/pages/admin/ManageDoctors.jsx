import { useState } from 'react'
import { Plus, Search, UserCheck } from 'lucide-react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import PageHeader from '../../components/common/PageHeader'
import { mockDoctors } from '../../data/mockData'

export default function ManageDoctors() {
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [doctors, setDoctors] = useState(mockDoctors)
  const [form, setForm] = useState({ name: '', specialization: '', qualification: '', experience: '' })

  const filtered = doctors.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.specialization.toLowerCase().includes(search.toLowerCase())
  )

  function handleAdd() {
    if (!form.name || !form.specialization) return
    setDoctors(prev => [...prev, { id: Date.now(), ...form, patients: 0, status: 'available', schedule: 'Mon–Fri' }])
    setForm({ name: '', specialization: '', qualification: '', experience: '' })
    setShowModal(false)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Doctors"
        subtitle={`${doctors.length} doctors registered`}
        action={
          <Button variant="primary" onClick={() => setShowModal(true)}>
            <Plus size={15} /> Add Doctor
          </Button>
        }
      />

      {/* Search */}
      <div className="relative">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or specialization..."
          className="pl-10 pr-4 py-2.5 w-full max-w-md text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400/30 focus:border-sky-400 text-slate-700 placeholder-slate-400"
        />
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr className="text-slate-500 text-xs uppercase tracking-wider">
                <th className="text-left px-5 py-3 font-medium">Doctor</th>
                <th className="text-left px-4 py-3 font-medium">Specialization</th>
                <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Qualification</th>
                <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Experience</th>
                <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Patients</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(d => (
                <tr key={d.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-bold shrink-0">
                        {d.name.replace('Dr. ', '').split(' ').map(x => x[0]).join('').slice(0, 2)}
                      </div>
                      <span className="text-slate-800 font-semibold">{d.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-slate-600">{d.specialization}</td>
                  <td className="px-4 py-4 text-slate-500 hidden md:table-cell">{d.qualification}</td>
                  <td className="px-4 py-4 text-slate-500 hidden lg:table-cell">{d.experience}</td>
                  <td className="px-4 py-4 text-slate-800 font-medium hidden lg:table-cell">{d.patients}</td>
                  <td className="px-4 py-4"><Badge status={d.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Doctor Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <UserCheck size={18} className="text-sky-500" />
                <h3 className="text-slate-800 font-bold">Add New Doctor</h3>
              </div>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 text-xl leading-none">×</button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { label: 'Full Name', key: 'name', placeholder: 'Dr. Full Name' },
                { label: 'Specialization', key: 'specialization', placeholder: 'e.g. Cardiology' },
                { label: 'Qualification', key: 'qualification', placeholder: 'e.g. MBBS, MD' },
                { label: 'Experience', key: 'experience', placeholder: 'e.g. 8 yrs' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">{f.label}</label>
                  <input
                    value={form[f.key]}
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-sky-400/30 focus:border-sky-400 text-slate-700 placeholder-slate-400"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 px-6 pb-6">
              <Button variant="secondary" className="flex-1 justify-center" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button variant="primary" className="flex-1 justify-center" onClick={handleAdd}>Add Doctor</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
