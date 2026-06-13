import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { User, Stethoscope, ShieldCheck, Eye, EyeOff, ArrowRight, Heart } from 'lucide-react'

const ROLES = [
  { id: 'patient',  label: 'Patient',  icon: User,         desc: 'Access your health records & appointments' },
  { id: 'doctor',   label: 'Doctor',   icon: Stethoscope,  desc: 'Manage patients & consultations' },
  { id: 'admin',    label: 'Admin',    icon: ShieldCheck,  desc: 'Hospital management & analytics' },
]

export default function Login() {
  const [role, setRole] = useState('patient')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const REDIRECT = { patient: '/patient/dashboard', doctor: '/doctor/dashboard', admin: '/admin/dashboard' }
  const DEFAULT_EMAILS = {
    patient: 'patient@sevysis.com',
    doctor: 'doctor@sevysis.com',
    admin: 'admin@sevysis.com',
  }
  const DEFAULT_PASSWORD = 'Admin@123'
  const [error, setError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  function validateEmailOrMobile(value) {
    const trimmed = value.trim()
    if (!trimmed) return 'Email or mobile is required.'
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const mobilePattern = /^\d{10}$/
    if (trimmed.includes('@')) {
      return emailPattern.test(trimmed) ? '' : 'Enter a valid email address.'
    }
    return mobilePattern.test(trimmed) ? '' : 'Enter a valid 10-digit mobile number.'
  }

  function handleLogin(e) {
    e.preventDefault()
    setError('')
    setEmailError('')
    setPasswordError('')

    const emailValidation = validateEmailOrMobile(email)
    const passwordValidation = password.trim() ? '' : 'Password is required.'

    if (emailValidation || passwordValidation) {
      setEmailError(emailValidation)
      setPasswordError(passwordValidation)
      return
    }

    setLoading(true)
    setTimeout(() => {
      const loggedIn = login(role, email.trim().toLowerCase(), password)
      setLoading(false)
      if (loggedIn) {
        navigate(REDIRECT[role])
      } else {
        setError(`Invalid credentials for ${role}. Use ${DEFAULT_EMAILS[role]} / ${DEFAULT_PASSWORD}`)
      }
    }, 700)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 flex-col justify-between p-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-sky-500 blur-3xl" />
          <div className="absolute bottom-32 right-10 w-48 h-48 rounded-full bg-indigo-500 blur-3xl" />
        </div>

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0">
            <img src="/logo.jpeg" alt="Sevysis" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="text-white font-bold text-xl tracking-tight">Sevysis</span>
            <p className="text-sky-300 text-xs">Healthcare Practice Management</p>
          </div>
        </div>

        {/* Center Content */}
        <div className="relative space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
            <Heart size={28} className="text-sky-400" />
          </div>
          <h2 className="text-4xl font-bold text-white leading-tight">
            Better Healthcare,<br />
            <span className="text-sky-400">Simplified.</span>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed max-w-sm">
            Seamlessly manage OPD & IPD workflows, appointments, prescriptions,
            billing, and discharge — all in one place.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {['OPD Management', 'IPD Monitoring', 'Smart Billing', 'Lab Reports', 'e-Prescriptions'].map(f => (
              <span key={f} className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/10 text-slate-300 border border-white/10">
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="relative">
          <p className="text-slate-500 text-xs">
            © 2026 Sevysis. Secure & HIPAA-compliant platform.
          </p>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-xl overflow-hidden shrink-0">
              <img src="/logo.jpeg" alt="Sevysis" className="w-full h-full object-cover" />
            </div>
            <span className="text-slate-800 font-bold text-lg">Sevysis</span>
          </div>

          <div className="mb-7">
            <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
            <p className="text-slate-500 text-sm mt-1">Sign in to your portal</p>
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <p className="text-slate-600 text-sm font-medium mb-2.5">Sign in as</p>
            <div className="grid grid-cols-3 gap-2.5">
              {ROLES.map(({ id, label, icon: Icon, desc }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setRole(id)}
                  className={`p-3 rounded-xl border-2 text-left transition-all duration-150 ${
                    role === id
                      ? 'border-sky-500 bg-sky-50'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${
                    role === id ? 'bg-sky-500' : 'bg-slate-100'
                  }`}>
                    <Icon size={16} className={role === id ? 'text-white' : 'text-slate-500'} />
                  </div>
                  <p className={`text-xs font-semibold ${role === id ? 'text-sky-700' : 'text-slate-700'}`}>
                    {label}
                  </p>
                </button>
              ))}
            </div>
            <p className="text-slate-400 text-xs mt-2">{ROLES.find(r => r.id === role)?.desc}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email / Mobile</label>
              <input
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email or mobile"
                className={`w-full px-4 py-2.5 text-sm border rounded-lg bg-white focus:outline-none focus:ring-2 focus:border-sky-400 text-slate-800 placeholder-slate-400 ${emailError ? 'border-rose-300 focus:ring-rose-200' : 'border-slate-200 focus:ring-sky-500/30'}`}
              />
              {emailError && <p className="mt-2 text-xs text-rose-600">{emailError}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={`w-full px-4 py-2.5 pr-10 text-sm border rounded-lg bg-white focus:outline-none focus:ring-2 focus:border-sky-400 text-slate-800 placeholder-slate-400 ${passwordError ? 'border-rose-300 focus:ring-rose-200' : 'border-slate-200 focus:ring-sky-500/30'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {passwordError && <p className="mt-2 text-xs text-rose-600">{passwordError}</p>}
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-300 text-sky-500" />
                <span className="text-sm text-slate-600">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => alert('Forgot password flow is not available in demo mode.')}
                className="text-sm text-sky-600 hover:text-sky-700 font-medium"
              >
                Forgot password?
              </button>
            </div>

            {error && (
              <div className="rounded-xl bg-rose-50 border border-rose-100 p-3 text-rose-700 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 disabled:bg-sky-400 text-white font-semibold py-2.5 rounded-lg transition-all duration-150 shadow-sm mt-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  Signing in...
                </>
              ) : (
                <>Sign In <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <p className="text-center text-slate-400 text-xs mt-6">
            Demo credentials:
            Patient: patient@sevysis.com
            Doctor: doctor@sevysis.com
            Admin: admin@sevysis.com
            Password: Admin@123
          </p>
        </div>
      </div>
    </div>
  )
}
