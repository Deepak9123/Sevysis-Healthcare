import * as XLSX from 'xlsx'

export function downloadExcel(filename, sheetName, headers, rows) {
  const workbook = XLSX.utils.book_new()
  const data = [headers, ...rows]
  const worksheet = XLSX.utils.aoa_to_sheet(data)

  const headerRange = XLSX.utils.decode_range(worksheet['!ref'])
  for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
    const address = XLSX.utils.encode_cell({ r: 0, c: C })
    if (!worksheet[address]) continue
    worksheet[address].s = {
      font: { bold: true, color: { rgb: '0EA5E9' } },
      fill: { fgColor: { rgb: 'F0F9FF' } },
      border: {
        top: { style: 'thin', color: { rgb: 'D1D5DB' } },
        bottom: { style: 'thin', color: { rgb: 'D1D5DB' } },
        left: { style: 'thin', color: { rgb: 'D1D5DB' } },
        right: { style: 'thin', color: { rgb: 'D1D5DB' } },
      },
    }
  }

  const wscols = headers.map(() => ({ wpx: 120 }))
  worksheet['!cols'] = wscols

  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(link.href)
}
