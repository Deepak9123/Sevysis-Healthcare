import { useState, useRef, useEffect } from 'react'
import { Download, ChevronDown } from 'lucide-react'
import Button from './Button'

export default function ExportDropdown({ title = 'Download', options = [], onSelect, className = '' }) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    function handleClick(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className={`relative inline-flex ${className}`} ref={containerRef}>
      <Button variant="secondary" size="sm" onClick={() => setIsOpen(open => !open)} className="justify-between min-w-[120px]">
        <Download size={14} />
        <span className="truncate">{title}</span>
        <ChevronDown size={14} className="text-slate-400" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 min-w-[150px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
          {options.map(option => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                setIsOpen(false)
                onSelect(option.value)
              }}
              className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-100"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
