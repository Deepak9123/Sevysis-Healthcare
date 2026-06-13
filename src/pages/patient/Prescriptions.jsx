import { useState } from 'react'
import { FileText, Pill } from 'lucide-react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import ExportDropdown from '../../components/ui/ExportDropdown'
import PageHeader from '../../components/common/PageHeader'
import { mockPrescriptions } from '../../data/mockData'
import { downloadPdf, downloadWordDoc } from '../../utils/exportUtils'

export default function Prescriptions() {
  const [downloaded, setDownloaded] = useState({})

  async function handleDownload(id, format) {
    const key = `${id}-${format}`
    setDownloaded(prev => ({ ...prev, [key]: true }))

    const prescription = mockPrescriptions.find(p => p.id === id)
    if (!prescription) return

    const title = `Prescription - ${prescription.diagnosis}`
    const lines = [
      `Doctor: ${prescription.doctor}`,
      `Date: ${prescription.date}`,
      `Diagnosis: ${prescription.diagnosis}`,
      '',
      'Medicines:',
      ...prescription.medicines.map(m => `${m.name} • ${m.dose} • ${m.duration}`),
    ]

    if (format === 'pdf') {
      await downloadPdf(`prescription-${id}.pdf`, title, lines)
    } else {
      const medicinesHtml = prescription.medicines
        .map(m => `<tr><td style="padding:6px 0;color:#111827;">${m.name}</td><td style="padding:6px 0;color:#111827;">${m.dose}</td><td style="padding:6px 0;color:#111827;">${m.duration}</td></tr>`)
        .join('')
      const htmlBody = `
        <div style="font-family:sans-serif;color:#374151;line-height:1.6;">
          <p><strong>Doctor:</strong> ${prescription.doctor}</p>
          <p><strong>Date:</strong> ${prescription.date}</p>
          <p><strong>Diagnosis:</strong> ${prescription.diagnosis}</p>
          <table style="width:100%;border-collapse:collapse;margin-top:16px;">
            <thead><tr><th style="text-align:left;padding-bottom:8px;color:#111827;">Medicine</th><th style="text-align:left;padding-bottom:8px;color:#111827;">Dose</th><th style="text-align:left;padding-bottom:8px;color:#111827;">Duration</th></tr></thead>
            <tbody>${medicinesHtml}</tbody>
          </table>
        </div>
      `
      downloadWordDoc(`prescription-${id}.doc`, title, htmlBody)
    }

    setTimeout(() => setDownloaded(prev => ({ ...prev, [key]: false })), 2000)
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Prescriptions" subtitle="Your medication history and active prescriptions" />

      <div className="space-y-4">
        {mockPrescriptions.map(p => (
          <Card key={p.id}>
            <div className="p-5">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                    <FileText size={18} className="text-indigo-500" />
                  </div>
                  <div>
                    <p className="text-slate-800 font-semibold">{p.diagnosis}</p>
                    <p className="text-slate-400 text-sm">{p.doctor} · {p.date}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge status={p.status} />
                  <ExportDropdown
                    title="Download"
                    options={[
                      { label: 'PDF', value: 'pdf' },
                      { label: 'Word', value: 'doc' },
                    ]}
                    onSelect={format => handleDownload(p.id, format)}
                  />
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  <Pill size={12} className="inline mr-1.5" />Medicines
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-slate-400 text-xs">
                        <th className="text-left pb-2 font-medium">Medicine</th>
                        <th className="text-left pb-2 font-medium">Dose</th>
                        <th className="text-left pb-2 font-medium">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {p.medicines.map((m, i) => (
                        <tr key={i} className="text-slate-700">
                          <td className="py-2 font-medium">{m.name}</td>
                          <td className="py-2 text-slate-500">{m.dose}</td>
                          <td className="py-2 text-slate-500">{m.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
