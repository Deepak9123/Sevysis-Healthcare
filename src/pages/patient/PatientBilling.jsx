import { useState } from 'react'
import { CreditCard } from 'lucide-react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import ExportDropdown from '../../components/ui/ExportDropdown'
import PageHeader from '../../components/common/PageHeader'
import { mockBillingData } from '../../data/mockData'
import { downloadPdf, downloadWordDoc } from '../../utils/exportUtils'

export default function PatientBilling() {
  const [billing, setBilling] = useState(mockBillingData)
  const [paymentMessage, setPaymentMessage] = useState('')
  const [downloaded, setDownloaded] = useState({ pdf: false, doc: false })
  const [selectedMethod, setSelectedMethod] = useState('')

  function handlePay() {
    setBilling(prev => ({ ...prev, paid: prev.paid + prev.pending, pending: 0 }))
    setPaymentMessage('Payment complete')
    setTimeout(() => setPaymentMessage(''), 2500)
  }

  async function handleDownload(format) {
    setDownloaded(prev => ({ ...prev, [format]: true }))

    const title = `Invoice ${billing.invoiceNo}`
    const lines = [
      `Patient: ${billing.patientName} (${billing.patientId})`,
      `Invoice No: ${billing.invoiceNo}`,
      `Date: ${billing.date}`,
      '',
      ...billing.items.map(item => `${item.description}: ₹${item.amount.toLocaleString()}`),
      '',
      `Total: ₹${billing.total.toLocaleString()}`,
      `Paid: ₹${billing.paid.toLocaleString()}`,
      `Balance Due: ₹${billing.pending.toLocaleString()}`,
    ]

    if (format === 'pdf') {
      await downloadPdf(`${billing.invoiceNo}.pdf`, title, lines)
    } else {
      const itemsHtml = billing.items
        .map(item => `<tr><td style="padding:8px 0;color:#111827;">${item.description}</td><td style="padding:8px 0;color:#111827;text-align:right;">₹${item.amount.toLocaleString()}</td></tr>`)
        .join('')
      const htmlBody = `
        <div style="font-family:sans-serif;color:#374151;line-height:1.6;">
          <p><strong>Patient:</strong> ${billing.patientName} (${billing.patientId})</p>
          <p><strong>Invoice No:</strong> ${billing.invoiceNo}</p>
          <p><strong>Date:</strong> ${billing.date}</p>
          <table style="width:100%;border-collapse:collapse;margin-top:18px;">
            <tbody>${itemsHtml}</tbody>
          </table>
          <p style="margin-top:18px;"><strong>Total:</strong> ₹${billing.total.toLocaleString()}</p>
          <p><strong>Paid:</strong> ₹${billing.paid.toLocaleString()}</p>
          <p><strong>Balance Due:</strong> ₹${billing.pending.toLocaleString()}</p>
        </div>
      `
      downloadWordDoc(`${billing.invoiceNo}.doc`, title, htmlBody)
    }

    setTimeout(() => setDownloaded(prev => ({ ...prev, [format]: false })), 2000)
  }

  function handleMethodSelect(method) {
    setSelectedMethod(method)
    setPaymentMessage(`${method} selected for payment`)
    setTimeout(() => setPaymentMessage(''), 2000)
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Billing" subtitle="Your outstanding invoices and payment history" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Invoice Card */}
        <Card className="lg:col-span-2" title="Invoice Details">
          <div className="p-5">
            {/* Invoice header */}
            <div className="flex items-start justify-between pb-5 border-b border-slate-100 mb-5">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-sky-500 flex items-center justify-center">
                    <span className="text-white font-black text-base">S</span>
                  </div>
                  <div>
                    <p className="text-slate-800 font-bold">Sevysis Hospital</p>
                    <p className="text-slate-400 text-xs">Healthcare Practice Management</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-slate-500 text-xs">Invoice No.</p>
                <p className="text-slate-800 font-bold">{billing.invoiceNo}</p>
                <p className="text-slate-400 text-xs mt-1">{billing.date}</p>
              </div>
            </div>

            {/* Patient info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5 text-sm">
              <div>
                <p className="text-slate-400 text-xs mb-0.5">Patient Name</p>
                <p className="text-slate-800 font-semibold">{billing.patientName}</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs mb-0.5">Patient ID</p>
                <p className="text-slate-800 font-semibold">{billing.patientId}</p>
              </div>
            </div>

            {/* Line items */}
            <table className="w-full text-sm mb-5">
              <thead>
                <tr className="text-slate-400 text-xs border-b border-slate-100">
                  <th className="text-left pb-2 font-medium">Description</th>
                  <th className="text-right pb-2 font-medium">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {billing.items.map((item, i) => (
                  <tr key={i}>
                    <td className="py-3 text-slate-700">{item.description}</td>
                    <td className="py-3 text-right text-slate-800 font-medium">₹{item.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t-2 border-slate-200">
                <tr>
                  <td className="pt-3 text-slate-800 font-bold">Total</td>
                  <td className="pt-3 text-right text-slate-900 font-bold text-base">₹{billing.total.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="pt-1 text-green-600 text-sm">Paid</td>
                  <td className="pt-1 text-right text-green-600 font-medium">−₹{billing.paid.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="pt-1 text-amber-600 font-semibold">Balance Due</td>
                  <td className="pt-1 text-right text-amber-600 font-bold">₹{billing.pending.toLocaleString()}</td>
                </tr>
              </tfoot>
            </table>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="primary" size="lg" className="flex-1 justify-center" onClick={handlePay} disabled={billing.pending === 0}>
                <CreditCard size={16} /> {billing.pending === 0 ? 'Paid' : `Pay ₹${billing.pending.toLocaleString()}`}
              </Button>
              <ExportDropdown
                title={downloaded.pdf || downloaded.doc ? 'Downloading' : 'Download'}
                options={[
                  { label: 'PDF', value: 'pdf' },
                  { label: 'Word', value: 'doc' },
                ]}
                onSelect={handleDownload}
              />
            </div>
          </div>
        </Card>

        {/* Payment Summary */}
        <div className="space-y-4">
          <Card title="Payment Summary">
            <div className="p-5 space-y-4">
              {[
                { label: 'Total Amount', value: `₹${billing.total.toLocaleString()}`, color: 'text-slate-800' },
                { label: 'Amount Paid', value: `₹${billing.paid.toLocaleString()}`, color: 'text-green-600' },
                { label: 'Balance Due', value: `₹${billing.pending.toLocaleString()}`, color: 'text-amber-600' },
              ].map(item => (
                <div key={item.label} className="flex justify-between items-center">
                  <span className="text-slate-500 text-sm">{item.label}</span>
                  <span className={`font-bold ${item.color}`}>{item.value}</span>
                </div>
              ))}

              {/* Progress bar */}
              <div className="mt-2">
                <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                  <span>Payment progress</span>
                  <span>{Math.round((billing.paid / billing.total) * 100)}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${(billing.paid / billing.total) * 100}%` }}
                  />
                </div>
              </div>
              {paymentMessage && (
                <div className="mt-4 text-sm text-green-600 font-medium">{paymentMessage}</div>
              )}
            </div>
          </Card>

          <Card title="Payment Methods">
            <div className="p-4 space-y-2.5">
              {['UPI / QR Code', 'Debit / Credit Card', 'Net Banking', 'Cash at Counter'].map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => handleMethodSelect(m)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                    selectedMethod === m
                      ? 'border-sky-500 bg-sky-50 text-sky-700'
                      : 'border-slate-200 text-slate-700 hover:border-sky-400 hover:bg-sky-50'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
