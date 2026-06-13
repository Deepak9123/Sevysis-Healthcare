export default function PageHeader({ title, subtitle, action }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-6">
      <div className="space-y-1 min-w-0">
        <h2 className="text-slate-900 font-bold text-lg sm:text-xl truncate">{title}</h2>
        {subtitle && <p className="text-slate-500 text-sm truncate">{subtitle}</p>}
      </div>
      {action && <div className="flex flex-wrap gap-2 items-center sm:justify-end">{action}</div>}
    </div>
  )
}
