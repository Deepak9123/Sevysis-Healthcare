import { useState } from 'react'
import { Search, User } from 'lucide-react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import ExportDropdown from '../../components/ui/ExportDropdown'
import PageHeader from '../../components/common/PageHeader'
import { mockPatients } from '../../data/mockData'
import { downloadCsv, downloadPdf, downloadWordDoc } from '../../utils/exportUtils'

export default function ManagePatients() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [patients, setPatients] = useState(mockPatients)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ name: '', age: '', gender: 'Male', contact: '', doctor: '', ward: '', status: 'OPD' })

  const filtered = patients.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.contact.includes(search)
    const matchFilter = filter === 'All' || p.status === filter
    return matchSearch && matchFilter
  })

  async function handleExport(format) {
    const title = 'Patient List Export'
    const rows = patients.map(p => [p.id, p.name, p.age, p.gender, p.contact, p.doctor, p.ward, p.bed, p.status])
    if (format === 'pdf') {
      await downloadPdf('patients.pdf', title, [
        `Export Date: ${new Date().toLocaleDateString()}`,
        '',
        ...patients.map(p => `${p.id} • ${p.name} • ${p.age}/${p.gender} • ${p.ward} • ${p.status}`),
      ])
    } else if (format === 'doc') {
      const rowsHtml = patients.map(p => `<tr><td style="padding:6px 0;color:#111827;">${p.id}</td><td style="padding:6px 0;color:#111827;">${p.name}</td><td style="padding:6px 0;color:#111827;">${p.age}</td><td style="padding:6px 0;color:#111827;">${p.gender}</td><td style="padding:6px 0;color:#111827;">${p.contact}</td><td style="padding:6px 0;color:#111827;">${p.doctor}</td><td style="padding:6px 0;color:#111827;">${p.ward}</td><td style="padding:6px 0;color:#111827;">${p.bed}</td><td style="padding:6px 0;color:#111827;">${p.status}</td></tr>`).join('')
      const htmlBody = `
        <div style="font-family:sans-serif;color:#374151;line-height:1.6;">
          <p>Export Date: ${new Date().toLocaleDateString()}</p>
          <table style="width:100%;border-collapse:collapse;margin-top:16px;">
            <thead><tr><th style="text-align:left;padding-bottom:8px;color:#111827;">ID</th><th style="text-align:left;padding-bottom:8px;color:#111827;">Name</th><th style="text-align:left;padding-bottom:8px;color:#111827;">Age</th><th style="text-align:left;padding-bottom:8px;color:#111827;">Gender</th><th style="text-align:left;padding-bottom:8px;color:#111827;">Contact</th><th style="text-align:left;padding-bottom:8px;color:#111827;">Doctor</th><th style="text-align:left;padding-bottom:8px;color:#111827;">Ward</th><th style="text-align:left;padding-bottom:8px;color:#111827;">Bed</th><th style="text-align:left;padding-bottom:8px;color:#111827;">Status</th></tr></thead>
            <tbody>${rowsHtml}</tbody>
          </table>
        </div>
      `
      downloadWordDoc('patients.doc', title, htmlBody)
    } else {
      downloadCsv('patients.csv', ['ID', 'Name', 'Age', 'Gender', 'Contact', 'Doctor', 'Ward', 'Bed', 'Status'], rows)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Patients"
        subtitle={`${patients.length} total patients registered`}
        action={
          <div className="flex flex-wrap gap-2 items-center">
            <Button variant="primary" onClick={() => setShowModal(true)}>
              <User size={14} /> Add Patient
            </Button>
            <ExportDropdown
              title="Export"
              options={[
                { label: 'PDF', value: 'pdf' },
                { label: 'Word', value: 'doc' },
              ]}
              onSelect={handleExport}
            />
          </div>
        }
      />

      <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3">
        <div className="relative flex-1 sm:flex-initial">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or contact..."
            className="pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400/30 focus:border-sky-400 text-slate-700 placeholder-slate-400 w-full sm:w-64"
          />
        </div>
        <div className="flex gap-2">
          {['All', 'OPD', 'IPD'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                filter === f ? 'bg-sky-500 border-sky-500 text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-sky-300'
              }`}>{f}
            </button>
          ))}
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr className="text-slate-500 text-xs uppercase tracking-wider">
                <th className="text-left px-5 py-3 font-medium">Patient</th>
                <th className="text-left px-4 py-3 font-medium">Age / Gender</th>
                <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Contact</th>
                <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Doctor</th>
                <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Ward / Bed</th>
                <th className="text-left px-4 py-3 font-medium">Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 text-xs font-bold shrink-0">
                        {p.name.split(' ').map(x => x[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-slate-800 font-semibold">{p.name}</p>
                        <p className="text-slate-400 text-xs">{p.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-slate-600">{p.age} · {p.gender}</td>
                  <td className="px-4 py-4 text-slate-500 hidden md:table-cell">{p.contact}</td>
                  <td className="px-4 py-4 text-slate-600 hidden md:table-cell">{p.doctor}</td>
                  <td className="px-4 py-4 text-slate-500 hidden lg:table-cell">
                    {p.ward !== '—' ? `${p.ward} · ${p.bed}` : '—'}
                  </td>
                  <td className="px-4 py-4"><Badge status={p.status} /></td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-slate-400">No patients found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-100 sticky top-0 bg-white">
              <div>
                <h3 className="text-slate-900 font-bold text-lg">Add New Patient</h3>
                <p className="text-slate-500 text-sm hidden sm:block">Create patient profile and assign ward/doctor.</p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 text-2xl leading-none">×</button>
            </div>
            <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Patient Name', key: 'name', placeholder: 'Full name' },
                { label: 'Age', key: 'age', placeholder: 'Age' },
                { label: 'Gender', key: 'gender', placeholder: '' },
                { label: 'Contact', key: 'contact', placeholder: '+91 XXXXXXXXXX' },
                { label: 'Doctor', key: 'doctor', placeholder: 'Assigned doctor' },
                { label: 'Ward', key: 'ward', placeholder: 'Ward name' },
              ].map(field => (
                <div key={field.key} className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">{field.label}</label>
                  {field.key === 'gender' ? (
                    <select
                      value={form.gender}
                      onChange={e => setForm(s => ({ ...s, gender: e.target.value }))}
                      className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-sky-400/30 focus:border-sky-400 text-slate-700"
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  ) : (
                    <input
                      value={form[field.key]}
                      onChange={e => setForm(s => ({ ...s, [field.key]: e.target.value }))}
                      placeholder={field.placeholder}
                      className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-sky-400/30 focus:border-sky-400 text-slate-700"
                    />
                  )}
                </div>
              ))}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Status</label>
                <select
                  value={form.status}
                  onChange={e => setForm(s => ({ ...s, status: e.target.value }))}
                  className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-sky-400/30 focus:border-sky-400 text-slate-700"
                >
                  <option>OPD</option>
                  <option>IPD</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-3 p-4 sm:p-6 border-t border-slate-100 md:flex-row md:justify-end sticky bottom-0 bg-white">
              <Button variant="secondary" onClick={() => setShowModal(false)} className="w-full md:w-auto">Cancel</Button>
              <Button
                variant="primary"
                onClick={() => {
                  if (!form.name || !form.age) return
                  setPatients(prev => [{ id: `P-${Date.now()}`, ...form }, ...prev])
                  setForm({ name: '', age: '', gender: 'Male', contact: '', doctor: '', ward: '', status: 'OPD' })
                  setShowModal(false)
                }}
                className="w-full md:w-auto"
              >
                Add Patient
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
