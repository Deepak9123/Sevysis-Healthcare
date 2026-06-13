import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './routes/ProtectedRoute'
import DashboardLayout from './components/layout/DashboardLayout'

import Login from './pages/auth/Login'

import PatientDashboard from './pages/patient/PatientDashboard'
import Appointments from './pages/patient/Appointments'
import Prescriptions from './pages/patient/Prescriptions'
import Reports from './pages/patient/Reports'
import PatientBilling from './pages/patient/PatientBilling'

import DoctorDashboard from './pages/doctor/DoctorDashboard'
import OPDConsultation from './pages/doctor/OPDConsultation'
import IPDAdmission from './pages/doctor/IPDAdmission'
import IPDMonitoring from './pages/doctor/IPDMonitoring'
import Discharge from './pages/doctor/Discharge'

import AdminDashboard from './pages/admin/AdminDashboard'
import ManageDoctors from './pages/admin/ManageDoctors'
import ManagePatients from './pages/admin/ManagePatients'
import BedsWards from './pages/admin/BedsWards'
import AdminReports from './pages/admin/AdminReports'
import Profile from './pages/Profile'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />

          {/* Patient */}
          <Route
            path="/patient"
            element={
              <ProtectedRoute role="patient">
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<PatientDashboard />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="prescriptions" element={<Prescriptions />} />
            <Route path="reports" element={<Reports />} />
            <Route path="billing" element={<PatientBilling />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Doctor */}
          <Route
            path="/doctor"
            element={
              <ProtectedRoute role="doctor">
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DoctorDashboard />} />
            <Route path="opd" element={<OPDConsultation />} />
            <Route path="ipd/admit" element={<IPDAdmission />} />
            <Route path="ipd/monitor" element={<IPDMonitoring />} />
            <Route path="discharge" element={<Discharge />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="doctors" element={<ManageDoctors />} />
            <Route path="patients" element={<ManagePatients />} />
            <Route path="beds" element={<BedsWards />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
