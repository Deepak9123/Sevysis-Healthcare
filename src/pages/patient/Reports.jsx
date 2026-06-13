import { useState } from 'react'
import { BarChart2, Eye, FlaskConical } from 'lucide-react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import ExportDropdown from '../../components/ui/ExportDropdown'
import PageHeader from '../../components/common/PageHeader'
import { mockReports } from '../../data/mockData'
import { downloadPdf, downloadWordDoc } from '../../utils/exportUtils'

const TYPE_COLORS = {
  Lab:        { bg: 'bg-sky-50', text: 'text-sky-600' },
  Radiology:  { bg: 'bg-violet-50', text: 'text-violet-600' },
  Cardiology: { bg: 'bg-rose-50', text: 'text-rose-600' },
}

export default function Reports() {
  const [activeReport, setActiveReport] = useState(null)
  const [downloads, setDownloads] = useState({})

  function handleView(id) {
    setActiveReport(id)
  }

  async function handleDownload(id, format) {
    const key = `${id}-${format}`
    setDownloads(prev => ({ ...prev, [key]: true }))

    const report = mockReports.find(r => r.id === id)
    if (!report) return

    const title = `${report.name}`
    const lines = [
      `Report: ${report.name}`,
      `Doctor: ${report.doctor}`,
      `Date: ${report.date}`,
      `Type: ${report.type}`,
      `Result: ${report.result}`,
      '',
      'This report contains diagnostics and observations from the latest laboratory review.',
    ]

    if (format === 'pdf') {
      await downloadPdf(`report-${id}.pdf`, title, lines)
    } else {
      const htmlBody = `
        <div style="font-family:sans-serif;color:#374151;line-height:1.6;">
          <p><strong>Doctor:</strong> ${report.doctor}</p>
          <p><strong>Date:</strong> ${report.date}</p>
          <p><strong>Type:</strong> ${report.type}</p>
          <p><strong>Result:</strong> ${report.result}</p>
          <p style="margin-top:16px;color:#111827;">${report.name}</p>
        </div>
      `
      downloadWordDoc(`report-${id}.doc`, title, htmlBody)
    }

    setTimeout(() => setDownloads(prev => ({ ...prev, [key]: false })), 2000)
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Lab Reports" subtitle="All your diagnostic and lab investigation results" />

      <Card>
        <div className="divide-y divide-slate-50">
          {mockReports.map(r => {
            const color = TYPE_COLORS[r.type] ?? { bg: 'bg-slate-50', text: 'text-slate-500' }
            return (
              <div key={r.id} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50/50 transition-colors">
                <div className={`w-10 h-10 rounded-xl ${color.bg} flex items-center justify-center shrink-0`}>
                  <FlaskConical size={18} className={color.text} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-800 font-semibold text-sm">{r.name}</p>
                  <p className="text-slate-400 text-xs">{r.doctor} · {r.date}</p>
                </div>
                <div className="hidden md:block">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${color.bg} ${color.text}`}>
                    {r.type}
                  </span>
                </div>
                <div className="text-right shrink-0 hidden md:block">
                  <p className="text-slate-700 text-xs font-medium">{r.result}</p>
                </div>
                <Badge status={r.status} />
                <div className="flex flex-wrap gap-2 shrink-0">
                  <Button variant="ghost" size="sm" onClick={() => handleView(r.id)}><Eye size={14} /></Button>
                  <ExportDropdown
                    title="Download"
                    options={[
                      { label: 'PDF', value: 'pdf' },
                      { label: 'Word', value: 'doc' },
                    ]}
                    onSelect={format => handleDownload(r.id, format)}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </Card>
      {activeReport && (
        <Card title="Report Preview">
          <div className="p-5 bg-slate-50 rounded-2xl">
            <p className="text-slate-800 font-semibold mb-2">{mockReports.find(r => r.id === activeReport)?.name}</p>
            <p className="text-slate-500 text-sm">Use the preview button to review this report.</p>
          </div>
        </Card>
      )}
    </div>
  )
}
