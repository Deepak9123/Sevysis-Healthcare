export default function Card({ children, className = '', title, action }) {
  return (
    <div className={`bg-white rounded-3xl shadow-sm border border-slate-100 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${className}`}>
      {(title || action) && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-4 py-3 sm:px-5 sm:py-4 border-b border-slate-100">
          {title && <h3 className="font-semibold text-slate-800 text-sm">{title}</h3>}
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  )
}
