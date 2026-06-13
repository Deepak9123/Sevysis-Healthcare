import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

const PAGE_TITLES = {
  '/patient/dashboard': 'Dashboard',
  '/patient/appointments': 'Appointments',
  '/patient/prescriptions': 'Prescriptions',
  '/patient/reports': 'Lab Reports',
  '/patient/billing': 'Billing',
  '/doctor/dashboard': 'Dashboard',
  '/doctor/opd': 'OPD Consultation',
  '/doctor/ipd/monitor': 'IPD Monitoring',
  '/doctor/ipd/admit': 'IPD Admission',
  '/doctor/discharge': 'Patient Discharge',
  '/patient/profile': 'Profile',
  '/doctor/profile': 'Profile',
  '/admin/profile': 'Profile',
  '/admin/dashboard': 'Dashboard',
  '/admin/doctors': 'Manage Doctors',
  '/admin/patients': 'Manage Patients',
  '/admin/beds': 'Beds & Wards',
  '/admin/reports': 'Reports & Analytics',
}

export default function DashboardLayout() {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem('sidebarCollapsed') === 'true'
  })
  const title = PAGE_TITLES[location.pathname] ?? 'Sevysis'

  useEffect(() => {
    window.localStorage.setItem('sidebarCollapsed', sidebarCollapsed ? 'true' : 'false')
  }, [sidebarCollapsed])

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar
        open={sidebarOpen}
        collapsed={sidebarCollapsed}
        onClose={() => setSidebarOpen(false)}
        onToggleCollapse={() => setSidebarCollapsed(curr => !curr)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title={title} onOpenSidebar={() => setSidebarOpen(true)} />
        <main className="flex-1 px-4 py-6 md:px-6 md:py-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
