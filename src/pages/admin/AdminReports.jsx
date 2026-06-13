import { useState } from 'react'
import { TrendingUp, Users, BedDouble, CreditCard } from 'lucide-react'
import Card from '../../components/ui/Card'
import StatCard from '../../components/ui/StatCard'
import Button from '../../components/ui/Button'
import PageHeader from '../../components/common/PageHeader'
import { downloadExcel } from '../../utils/excelUtils'

const MONTHLY_REVENUE = [
  { month: 'Jan', amount: 285000, patients: 312 },
  { month: 'Feb', amount: 310000, patients: 340 },
  { month: 'Mar', amount: 295000, patients: 328 },
  { month: 'Apr', amount: 340000, patients: 375 },
  { month: 'May', amount: 380000, patients: 410 },
  { month: 'Jun', amount: 420000, patients: 450 },
]

const DEPT_STATS = [
  { dept: 'Cardiology', opd: 142, ipd: 18, revenue: '₹1,24,500', color: 'bg-sky-500' },
  { dept: 'Orthopedics', opd: 98, ipd: 12, revenue: '₹84,200', color: 'bg-indigo-500' },
  { dept: 'Neurology', opd: 76, ipd: 8, revenue: '₹96,800', color: 'bg-violet-500' },
  { dept: 'General Medicine', opd: 210, ipd: 5, revenue: '₹62,400', color: 'bg-green-500' },
  { dept: 'Pediatrics', opd: 134, ipd: 3, revenue: '₹45,100', color: 'bg-amber-500' },
]

const maxRevenue = Math.max(...MONTHLY_REVENUE.map(m => m.amount))

export default function AdminReports() {
  const [exported, setExported] = useState('')

  async function handleExport(format) {
    setExported(format)

    if (format === 'excel') {
      const headers = ['Month', 'Revenue', 'Patients']
      const rows = MONTHLY_REVENUE.map(m => [m.month, m.amount, m.patients])
      downloadExcel('hospital-revenue-report.xlsx', 'Revenue Data', headers, rows)
    }

    setTimeout(() => setExported(''), 2000)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports & Analytics"
        subtitle="Hospital performance metrics and financials"
        action={
          <Button variant="secondary" size="sm" onClick={() => handleExport('excel')}>
            {exported === 'excel' ? 'Exporting...' : 'Export Reports'}
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={TrendingUp} label="Monthly Revenue" value="₹4.2L" sub="+10.5% vs last month" color="green" />
        <StatCard icon={Users} label="Total Patients" value="450" sub="This month" color="sky" />
        <StatCard icon={BedDouble} label="Avg. Bed Occupancy" value="76%" sub="Across all wards" color="indigo" />
        <StatCard icon={CreditCard} label="Pending Billing" value="₹2.8L" sub="32 unpaid invoices" color="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart (CSS bar chart) */}
        <Card title="Monthly Revenue Trend (2026)">
          <div className="p-5">
            <div className="flex items-end gap-2 h-40">
              {MONTHLY_REVENUE.map(m => {
                const heightPct = (m.amount / maxRevenue) * 100
                return (
                  <div key={m.month} className="flex-1 flex flex-col items-center gap-1.5">
                    <span className="text-xs text-slate-400">₹{Math.round(m.amount / 1000)}k</span>
                    <div className="w-full rounded-t-md bg-sky-500 hover:bg-sky-600 transition-colors cursor-default"
                      style={{ height: `${heightPct}%`, minHeight: '8px' }} />
                    <span className="text-xs text-slate-500 font-medium">{m.month}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </Card>

        {/* Patient Chart */}
        <Card title="Monthly Patient Count">
          <div className="p-5">
            <div className="flex items-end gap-2 h-40">
              {MONTHLY_REVENUE.map(m => {
                const maxP = Math.max(...MONTHLY_REVENUE.map(x => x.patients))
                const heightPct = (m.patients / maxP) * 100
                return (
                  <div key={m.month} className="flex-1 flex flex-col items-center gap-1.5">
                    <span className="text-xs text-slate-400">{m.patients}</span>
                    <div className="w-full rounded-t-md bg-indigo-500 hover:bg-indigo-600 transition-colors cursor-default"
                      style={{ height: `${heightPct}%`, minHeight: '8px' }} />
                    <span className="text-xs text-slate-500 font-medium">{m.month}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </Card>
      </div>

      {/* Department-wise stats */}
      <Card title="Department Performance">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr className="text-slate-500 text-xs uppercase tracking-wider">
                <th className="text-left px-5 py-3 font-medium">Department</th>
                <th className="text-left px-4 py-3 font-medium">OPD Patients</th>
                <th className="text-left px-4 py-3 font-medium">IPD Patients</th>
                <th className="text-left px-4 py-3 font-medium">Revenue</th>
                <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">OPD Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {DEPT_STATS.map(d => {
                const totalOPD = DEPT_STATS.reduce((s, x) => s + x.opd, 0)
                const pct = Math.round((d.opd / totalOPD) * 100)
                return (
                  <tr key={d.dept} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-2.5 h-2.5 rounded-full ${d.color}`} />
                        <span className="text-slate-800 font-semibold">{d.dept}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-slate-700 font-medium">{d.opd}</td>
                    <td className="px-4 py-4 text-slate-700 font-medium">{d.ipd}</td>
                    <td className="px-4 py-4 text-slate-800 font-semibold">{d.revenue}</td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${d.color} rounded-full`} style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-slate-500 text-xs w-8">{pct}%</span>
                      </div>
                    </td>
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
