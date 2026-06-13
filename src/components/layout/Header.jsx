import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, Search, ChevronDown, Menu } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const NOTIFICATIONS = [
  { id: 1, text: 'Appointment confirmed for June 15', time: '2m ago', unread: true },
  { id: 2, text: 'New lab report is ready', time: '1h ago', unread: true },
  { id: 3, text: 'Prescription refill reminder', time: '3h ago', unread: false },
]

export default function Header({ title, onOpenSidebar }) {
  const { user, logout } = useAuth()
  const [showNotifs, setShowNotifs] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const unreadCount = NOTIFICATIONS.filter(n => n.unread).length
  const menuRef = useRef(null)
  const notifRef = useRef(null)
  const navigate = useNavigate()

  const handleProfileNavigate = () => {
    setShowMenu(false)
    if (user?.role) navigate(`/${user.role}/profile`)
  }

  const handleLogout = () => {
    setShowMenu(false)
    logout()
    navigate('/login')
  }

  useEffect(() => {
    if (!showMenu && !showNotifs) return

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false)
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifs(false)
      }
    }

    window.addEventListener('mousedown', handleClickOutside)
    return () => window.removeEventListener('mousedown', handleClickOutside)
  }, [showMenu, showNotifs])

  return (
    <header className="h-16 bg-white/95 backdrop-blur-sm border-b border-slate-200/80 flex items-center px-6 gap-4 sticky top-0 z-30 shadow-sm">
      {/* Page Title */}
      <div className="flex-1">
        <h1 className="text-slate-800 font-semibold text-lg leading-none">{title}</h1>
        <p className="text-slate-400 text-xs mt-1">
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Mobile menu */}
      <button
        type="button"
        onClick={onOpenSidebar}
        className="inline-flex items-center justify-center rounded-lg p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors lg:hidden"
      >
        <Menu size={20} />
      </button>

      {/* Search */}
      <div className="relative hidden md:flex items-center">
        <Search size={15} className="absolute left-3 text-slate-400" />
        <input
          type="text"
          placeholder="Search..."
          className="pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400 w-56 text-slate-700 placeholder-slate-400"
        />
      </div>

      {/* Notifications */}
      <div className="relative" ref={notifRef}>
        <button
          onClick={() => setShowNotifs(s => !s)}
          className="relative p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
          )}
        </button>

        {showNotifs && (
          <div className="fixed sm:absolute top-16 sm:top-11 left-2 right-2 sm:left-auto sm:right-0 w-[calc(100vw-1rem)] sm:w-80 max-w-[calc(100vw-1rem)] sm:max-w-[20rem] bg-white rounded-xl shadow-xl border border-slate-200 z-50 max-h-[calc(100vh-7rem)] overflow-y-auto">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
              <span className="font-semibold text-slate-800 text-sm">Notifications</span>
              <span className="text-xs text-sky-600 font-medium">{unreadCount} new</span>
            </div>
            {NOTIFICATIONS.map(n => (
              <div key={n.id} className={`px-4 py-3 border-b border-slate-50 last:border-0 ${n.unread ? 'bg-sky-50/50' : ''}`}>
                <p className="text-sm text-slate-700">{n.text}</p>
                <p className="text-xs text-slate-400 mt-1">{n.time}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Avatar */}
      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setShowMenu(s => !s)}
          className="flex items-center gap-2.5 cursor-pointer group rounded-full px-2 py-1 hover:bg-slate-100 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white font-semibold text-sm">
            {user?.initials}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-slate-800 text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-slate-400 text-xs mt-0.5 capitalize">{user?.role}</p>
          </div>
          <ChevronDown size={14} className="text-slate-400" />
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white border border-slate-200 shadow-xl z-50">
            <button
              type="button"
              onClick={handleProfileNavigate}
              className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-100"
            >
              Profile
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
