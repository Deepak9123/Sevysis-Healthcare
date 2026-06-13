import { createContext, useContext, useEffect, useRef, useState } from 'react'

const AuthContext = createContext(null)
const LOCAL_STORAGE_KEY = 'sevysisAuth'
const DEFAULT_PASSWORD = 'Admin@123'
const DEFAULT_CREDENTIALS = {
  patient: 'patient@sevysis.com',
  doctor: 'doctor@sevysis.com',
  admin: 'admin@sevysis.com',
}

const MOCK_USERS = {
  patient: {
    id: 'PT-2026-001',
    name: 'Arjun Sharma',
    role: 'patient',
    initials: 'AS',
    age: 34,
    bloodGroup: 'O+',
    contact: '+91 98765 43210',
  },
  doctor: {
    id: 'DR-2026-001',
    name: 'Dr. Priya Mehta',
    role: 'doctor',
    initials: 'PM',
    specialization: 'Cardiology',
    department: 'Cardiology Dept.',
  },
  admin: {
    id: 'ADM-001',
    name: 'Admin User',
    role: 'admin',
    initials: 'AU',
  },
}

export function AuthProvider({ children }) {
  const activityTimer = useRef(null)
  const [user, setUser] = useState(() => {
    if (typeof window === 'undefined') return null
    const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!stored) return null
    try {
      const parsed = JSON.parse(stored)
      return parsed?.user ?? null
    } catch {
      return null
    }
  })

  const resetTimer = () => {
    if (activityTimer.current) window.clearTimeout(activityTimer.current)
    activityTimer.current = window.setTimeout(() => {
      setUser(null)
      window.localStorage.removeItem(LOCAL_STORAGE_KEY)
    }, 5 * 60 * 1000)
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (user) {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ user }))
    } else {
      window.localStorage.removeItem(LOCAL_STORAGE_KEY)
    }
  }, [user])

  useEffect(() => {
    if (!user || typeof window === 'undefined') return

    resetTimer()
    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll']
    const handleActivity = () => resetTimer()

    events.forEach((event) => window.addEventListener(event, handleActivity))
    return () => {
      events.forEach((event) => window.removeEventListener(event, handleActivity))
      if (activityTimer.current) window.clearTimeout(activityTimer.current)
    }
  }, [user])

  const login = (role, email, password) => {
    const expectedEmail = DEFAULT_CREDENTIALS[role]
    if (!expectedEmail || email.toLowerCase() !== expectedEmail || password !== DEFAULT_PASSWORD) {
      return null
    }
    const userData = MOCK_USERS[role]
    setUser(userData)
    return userData
  }

  const logout = () => {
    setUser(null)
    if (activityTimer.current) window.clearTimeout(activityTimer.current)
    if (typeof window !== 'undefined') window.localStorage.removeItem(LOCAL_STORAGE_KEY)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
