import hospitalLogoSvg from '../assets/hospital-logo.svg?raw'

function svgToDataUri(svg) {
  const encoded = btoa(unescape(encodeURIComponent(svg)))
  return `data:image/svg+xml;base64,${encoded}`
}

const logoDataUri = svgToDataUri(hospitalLogoSvg)
const logoHtml = `
  <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px;">
    <img src="${logoDataUri}" width="160" height="48" alt="Sevysis logo" style="display:block;" />
  </div>
`

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function fetchImageAsDataUri(url) {
  return fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    }))
}

export function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(link.href)
}

export async function downloadWordDoc(filename, title, htmlBody) {
  try {
    const logoDataUri = await fetchImageAsDataUri('/logo.jpeg')
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8" /><title>${title}</title></head><body><div style="text-align:center;margin-bottom:32px;border-bottom:2px solid #0ea5e9;padding-bottom:20px;display:flex;align-items:center;justify-content:center;gap:12px;"><img src="${logoDataUri}" alt="Sevysis logo" style="width:50px;height:50px;display:block;object-fit:contain;" /><h2 style="color:#0ea5e9;font-size:28px;margin:0;font-weight:bold;">Sevysis</h2></div><h1 style="font-family:sans-serif;color:#111827;font-size:26px;margin-bottom:16px;margin-top:0;">${title}</h1>${htmlBody}</body></html>`
    downloadFile(filename, html, 'application/msword')
  } catch (error) {
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8" /><title>${title}</title></head><body><div style="text-align:center;margin-bottom:32px;border-bottom:2px solid #0ea5e9;padding-bottom:20px;"><h2 style="color:#0ea5e9;font-size:28px;margin:0;font-weight:bold;">Sevysis</h2><p style="color:#6b7280;font-size:14px;margin:8px 0 0;">Healthcare Practice Management</p></div><h1 style="font-family:sans-serif;color:#111827;font-size:26px;margin-bottom:16px;margin-top:0;">${title}</h1>${htmlBody}</body></html>`
    downloadFile(filename, html, 'application/msword')
  }
}

export function downloadCsv(filename, headers, rows) {
  const escapeCell = value => {
    const str = String(value ?? '')
    return `"${str.replace(/"/g, '""')}"`
  }
  const csv = [headers.map(escapeCell).join(','), ...rows.map(row => row.map(escapeCell).join(','))].join('\r\n')
  downloadFile(filename, csv, 'text/csv;charset=utf-8;')
}

export async function downloadPdf(filename, title, lines) {
  try {
    const { jsPDF } = await import('jspdf')
    const pdf = new jsPDF({ unit: 'pt', format: 'letter' })

    const logoDataUri = await fetchImageAsDataUri('/logo.jpeg')
    pdf.addImage(logoDataUri, 'JPEG', 40, 25, 50, 50)

    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(28)
    pdf.setTextColor('#0ea5e9')
    pdf.text('Sevysis', 100, 55)

    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(10)
    pdf.setTextColor('#6b7280')
    pdf.text('Healthcare Practice Management', 100, 70)

    pdf.setDrawColor(14, 165, 233)
    pdf.setLineWidth(2)
    pdf.line(40, 85, 555, 85)

    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(16)
    pdf.setTextColor('#111827')
    pdf.text(title, 40, 110)

    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(10)
    pdf.setTextColor('#475569')
    let y = 130
    lines.forEach(line => {
      const splitText = pdf.splitTextToSize(line, 520)
      pdf.setTextColor(line.trim() === '' ? '#ffffff' : '#475569')
      pdf.text(splitText, 40, y)
      y += splitText.length * 14
      if (y > 740) {
        pdf.addPage()
        y = 40
      }
    })

    pdf.save(filename)
  } catch (error) {
    const bodyHtml = lines.map(line => `<p style="font-family:sans-serif;color:#374151;margin:0 0 12px;">${escapeHtml(line)}</p>`).join('')
    const fallbackName = filename.endsWith('.pdf') ? filename.replace(/\.pdf$/i, '.doc') : `${filename}.doc`
    downloadWordDoc(fallbackName, title, bodyHtml)
  }
}
