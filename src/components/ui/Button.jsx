export default function Button({ children, onClick, variant = 'primary', size = 'md', type = 'button', disabled, className = '' }) {
  const base = 'inline-flex items-center gap-2 font-medium rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary:   'bg-sky-500 hover:bg-sky-600 text-white focus:ring-sky-400 shadow-sm',
    secondary: 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 focus:ring-slate-300 shadow-sm',
    danger:    'bg-red-500 hover:bg-red-600 text-white focus:ring-red-400 shadow-sm',
    ghost:     'bg-transparent hover:bg-slate-100 text-slate-600 focus:ring-slate-300',
    success:   'bg-green-500 hover:bg-green-600 text-white focus:ring-green-400 shadow-sm',
    indigo:    'bg-indigo-500 hover:bg-indigo-600 text-white focus:ring-indigo-400 shadow-sm',
  }

  const sizes = {
    sm:  'px-3 py-1.5 text-xs',
    md:  'px-4 py-2 text-sm',
    lg:  'px-5 py-2.5 text-sm',
    xl:  'px-6 py-3 text-base',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  )
}
