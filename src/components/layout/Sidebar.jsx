import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  LayoutDashboard, Calendar, FileText, BarChart2, CreditCard,
  Users, BedDouble, UserCheck, BarChart3, Stethoscope,
  LogOut, Activity, ClipboardList, X, ArrowLeft, ArrowRight,
} from 'lucide-react'

const NAV = {
  patient: [
    { label: 'Dashboard', to: '/patient/dashboard', icon: LayoutDashboard },
    { label: 'Appointments', to: '/patient/appointments', icon: Calendar },
    { label: 'Prescriptions', to: '/patient/prescriptions', icon: FileText },
    { label: 'Reports', to: '/patient/reports', icon: BarChart2 },
    { label: 'Billing', to: '/patient/billing', icon: CreditCard },
  ],
  doctor: [
    { label: 'Dashboard', to: '/doctor/dashboard', icon: LayoutDashboard },
    { label: 'OPD Queue', to: '/doctor/opd', icon: ClipboardList },
    { label: 'IPD Patients', to: '/doctor/ipd/monitor', icon: BedDouble },
    { label: 'IPD Admission', to: '/doctor/ipd/admit', icon: Activity },
    { label: 'Discharge', to: '/doctor/discharge', icon: Stethoscope },
  ],
  admin: [
    { label: 'Dashboard', to: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Doctors', to: '/admin/doctors', icon: UserCheck },
    { label: 'Patients', to: '/admin/patients', icon: Users },
    { label: 'Beds & Wards', to: '/admin/beds', icon: BedDouble },
    { label: 'Reports', to: '/admin/reports', icon: BarChart3 },
  ],
}

const ROLE_LABEL = { patient: 'Patient Portal', doctor: 'Doctor Portal', admin: 'Admin Panel' }

export default function Sidebar({ open, collapsed, onClose, onToggleCollapse }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const navItems = NAV[user?.role] ?? []

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-40 bg-slate-950 text-slate-200 flex flex-col shrink-0 transform transition-all duration-300 ease-in-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        } lg:static lg:translate-x-0 ${collapsed ? 'w-20' : 'w-64'} shadow-xl lg:shadow-none ring-1 ring-slate-900/70`}
      >
      <div className="flex items-center justify-between gap-3 px-6 py-5 border-b border-slate-700/60 lg:hidden">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl overflow-hidden shrink-0">
            <img src="/logo.jpeg" alt="Sevysis" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="text-white font-bold text-base tracking-tight">Sevysis</span>
            <p className="text-slate-400 text-xs mt-0.5">{ROLE_LABEL[user?.role]}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X size={18} />
        </button>
      </div>
      <div className={`hidden lg:flex items-center justify-between ${collapsed ? 'px-3 py-4' : 'gap-3 px-6 py-5'} border-b border-slate-700/60`}>
        <div className={`flex items-center ${collapsed ? 'gap-0' : 'gap-3'}`}>
          <div className="w-9 h-9 rounded-xl overflow-hidden shrink-0">
            <img src="/logo.jpeg" alt="Sevysis" className="w-full h-full object-cover" />
          </div>
          {!collapsed && (
            <div>
              <span className="text-white font-bold text-base tracking-tight">Sevysis</span>
              <p className="text-slate-400 text-xs mt-0.5">{ROLE_LABEL[user?.role]}</p>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={onToggleCollapse}
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
        >
          {collapsed ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center ${collapsed ? 'justify-center' : 'gap-3 px-3 py-2.5'} rounded-2xl text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
              }`
            }
          >
            <Icon size={18} />
            {!collapsed && label}
          </NavLink>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="px-3 py-4 border-t border-slate-700/60 lg:px-6">
        <div className={`flex items-center gap-3 px-3 py-2 mb-1 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400 font-semibold text-xs shrink-0">
            {user?.initials}
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-white text-xs font-medium truncate">{user?.name}</p>
              <p className="text-slate-500 text-xs truncate">{user?.id}</p>
            </div>
          )}
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-all duration-150"
        >
          <LogOut size={17} />
          {!collapsed && 'Sign Out'}
        </button>
      </div>
      </aside>
      <div
        className={`fixed inset-0 bg-black/40 z-30 lg:hidden ${open ? 'block' : 'hidden'}`}
        onClick={onClose}
      />
    </>
  )
}
