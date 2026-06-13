export default function StatCard({ icon: Icon, label, value, sub, color = 'sky', trend }) {
  const colors = {
    sky:    { bg: 'bg-sky-50',    icon: 'bg-sky-500',    text: 'text-sky-600' },
    indigo: { bg: 'bg-indigo-50', icon: 'bg-indigo-500', text: 'text-indigo-600' },
    green:  { bg: 'bg-green-50',  icon: 'bg-green-500',  text: 'text-green-600' },
    amber:  { bg: 'bg-amber-50',  icon: 'bg-amber-500',  text: 'text-amber-600' },
    rose:   { bg: 'bg-rose-50',   icon: 'bg-rose-500',   text: 'text-rose-600' },
    violet: { bg: 'bg-violet-50', icon: 'bg-violet-500', text: 'text-violet-600' },
  }
  const c = colors[color] ?? colors.sky

  return (
    <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-slate-100 flex items-start gap-3 sm:gap-4">
      <div className={`${c.icon} w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0`}>
        <Icon size={18} className="text-white" />
      </div>
      <div className="min-w-0">
        <p className="text-slate-500 text-sm font-medium">{label}</p>
        <p className="text-slate-900 text-xl sm:text-2xl font-bold mt-0.5">{value}</p>
        {sub && <p className={`text-[11px] sm:text-xs mt-1 font-medium ${c.text}`}>{sub}</p>}
      </div>
    </div>
  )
}
