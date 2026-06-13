import { useState } from 'react'
import { BedDouble } from 'lucide-react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import PageHeader from '../../components/common/PageHeader'
import { mockBeds, mockIPDPatients } from '../../data/mockData'

const WARD_COLORS = {
  General:       { bg: 'bg-sky-500',    light: 'bg-sky-50',    text: 'text-sky-600',    bar: 'bg-sky-500' },
  'Semi-Private':{ bg: 'bg-indigo-500', light: 'bg-indigo-50', text: 'text-indigo-600', bar: 'bg-indigo-500' },
  Private:       { bg: 'bg-violet-500', light: 'bg-violet-50', text: 'text-violet-600', bar: 'bg-violet-500' },
  ICU:           { bg: 'bg-rose-500',   light: 'bg-rose-50',   text: 'text-rose-600',   bar: 'bg-rose-500' },
}

export default function BedsWards() {
  const [beds, setBeds] = useState(mockBeds)
  const [action, setAction] = useState('ward')
  const [newWardName, setNewWardName] = useState('')
  const [wardCount, setWardCount] = useState(4)
  const [selectedWard, setSelectedWard] = useState(mockBeds[0]?.ward || 'General')

  function handleSubmit(event) {
    event.preventDefault()

    if (action === 'ward') {
      const total = Number(wardCount)
      if (!newWardName.trim() || total < 1) return
      setBeds(prev => [...prev, { ward: newWardName.trim(), total, occupied: 0, available: total, color: 'sky' }])
      setNewWardName('')
      setWardCount(4)
    } else {
      setBeds(prev => prev.map(b => {
        if (b.ward !== selectedWard) return b
        return { ...b, total: b.total + 1, available: b.available + 1 }
      }))
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Beds & Wards" subtitle="Hospital bed availability and ward management" />

      <Card title="Ward Controls">
        <div className="p-5 space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button variant={action === 'ward' ? 'primary' : 'ghost'} size="sm" onClick={() => setAction('ward')}>
              Add Ward
            </Button>
            <Button variant={action === 'bed' ? 'primary' : 'ghost'} size="sm" onClick={() => setAction('bed')}>
              Add Bed
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-[1fr_auto] items-end">
            {action === 'ward' ? (
              <>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-slate-500 text-sm">Ward name</span>
                    <input
                      type="text"
                      value={newWardName}
                      onChange={event => setNewWardName(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800"
                      placeholder="e.g. Neonatal"
                    />
                  </label>
                  <label className="block">
                    <span className="text-slate-500 text-sm">Total beds</span>
                    <input
                      type="number"
                      min="1"
                      value={wardCount}
                      onChange={event => setWardCount(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800"
                    />
                  </label>
                </div>
              </>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="text-slate-500 text-sm">Choose ward</span>
                  <select
                    value={selectedWard}
                    onChange={event => setSelectedWard(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800"
                  >
                    {beds.map(b => (
                      <option key={b.ward} value={b.ward}>{b.ward}</option>
                    ))}
                  </select>
                </label>
                <div className="flex flex-col justify-end">
                  <span className="text-slate-500 text-sm mb-2">Bed count</span>
                  <p className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">Adds one bed to the selected ward</p>
                </div>
              </div>
            )}
            <Button variant="primary" type="submit" size="sm" className="w-full sm:w-auto">
              Save {action === 'ward' ? 'Ward' : 'Bed'}
            </Button>
          </form>
        </div>
      </Card>

      {/* Ward Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {beds.map(b => {
          const c = WARD_COLORS[b.ward] ?? WARD_COLORS.General
          const pct = Math.round((b.occupied / b.total) * 100)
          return (
            <div key={b.ward} className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 ${c.bg} rounded-xl flex items-center justify-center`}>
                  <BedDouble size={20} className="text-white" />
                </div>
                <span className={`text-2xl font-black ${c.text}`}>{pct}%</span>
              </div>
              <h3 className="text-slate-800 font-bold">{b.ward} Ward</h3>
              <p className="text-slate-400 text-sm mt-0.5">{b.occupied} occupied · {b.available} free of {b.total}</p>
              <div className="mt-3 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full ${c.bar} rounded-full`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          )
        })}
      </div>

      {/* IPD Patients */}
      <Card title="Current IPD Patients">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr className="text-slate-500 text-xs uppercase tracking-wider">
                <th className="text-left px-5 py-3 font-medium">Patient</th>
                <th className="text-left px-4 py-3 font-medium">Ward</th>
                <th className="text-left px-4 py-3 font-medium">Bed</th>
                <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Doctor</th>
                <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Admitted</th>
                <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Days</th>
                <th className="text-left px-4 py-3 font-medium">Condition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {mockIPDPatients.map(p => {
                const c = WARD_COLORS[p.ward]
                return (
                  <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${c?.light ?? 'bg-slate-100'} flex items-center justify-center ${c?.text ?? 'text-slate-600'} text-xs font-bold shrink-0`}>
                          {p.name.split(' ').map(x => x[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <p className="text-slate-800 font-semibold">{p.name}</p>
                          <p className="text-slate-400 text-xs">{p.diagnosis}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${c?.light ?? 'bg-slate-100'} ${c?.text ?? 'text-slate-600'}`}>{p.ward}</span>
                    </td>
                    <td className="px-4 py-4 text-slate-700 font-medium">{p.bed}</td>
                    <td className="px-4 py-4 text-slate-500 hidden md:table-cell">{p.doctor}</td>
                    <td className="px-4 py-4 text-slate-500 hidden md:table-cell">{p.admitDate}</td>
                    <td className="px-4 py-4 text-slate-700 font-medium hidden lg:table-cell">{p.days} days</td>
                    <td className="px-4 py-4"><Badge status={p.condition} /></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
