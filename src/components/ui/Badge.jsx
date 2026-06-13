const VARIANTS = {
  confirmed:       'bg-green-100 text-green-700',
  completed:       'bg-slate-100 text-slate-600',
  pending:         'bg-amber-100 text-amber-700',
  cancelled:       'bg-red-100 text-red-700',
  active:          'bg-sky-100 text-sky-700',
  available:       'bg-green-100 text-green-700',
  busy:            'bg-amber-100 text-amber-700',
  'off-duty':      'bg-slate-100 text-slate-500',
  IPD:             'bg-indigo-100 text-indigo-700',
  OPD:             'bg-sky-100 text-sky-700',
  Stable:          'bg-green-100 text-green-700',
  Recovering:      'bg-sky-100 text-sky-700',
  Critical:        'bg-red-100 text-red-700',
  ready:           'bg-green-100 text-green-700',
  'in-consultation': 'bg-sky-100 text-sky-700',
  waiting:         'bg-amber-100 text-amber-700',
  Emergency:       'bg-red-100 text-red-700',
  Planned:         'bg-indigo-100 text-indigo-700',
}

export default function Badge({ status }) {
  const cls = VARIANTS[status] ?? 'bg-slate-100 text-slate-600'
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${cls}`}>
      {status}
    </span>
  )
}
