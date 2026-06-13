# Sevysis — Healthcare Practice Management Application (PMA)

> Frontend UI documentation for internal development reference.

---

## Overview

**Sevysis** is a Healthcare Practice Management System designed to streamline hospital operations across three user roles: Patient, Doctor, and Admin. This document captures the UI structure, flows, and conventions for the frontend codebase.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 (Vite 8) |
| Styling | Tailwind CSS v4 |
| Routing | React Router DOM v7 |
| Icons | Lucide React |
| State | React Context API |
| Data | Mock data (src/data/mockData.js) — to be replaced with API |

---

## User Roles & Entry Points

| Role | Login As | Dashboard Route |
|------|----------|-----------------|
| Patient | patient | /patient/dashboard |
| Doctor | doctor | /doctor/dashboard |
| Admin | admin | /admin/dashboard |

> For demo, just select a role on the login screen and click Sign In. No credentials required.

---

## Project Structure

```
src/
├── context/AuthContext.jsx      # Auth state, mock user data, login/logout
├── routes/ProtectedRoute.jsx    # Role-based route guard
├── data/mockData.js             # All mock data (appointments, patients, doctors, etc.)
│
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx          # Role-aware navigation sidebar
│   │   ├── Header.jsx           # Top bar with search, notifications, user
│   │   └── DashboardLayout.jsx  # Sidebar + Header + <Outlet> wrapper
│   ├── ui/
│   │   ├── StatCard.jsx         # KPI metric card (icon, value, label, sub)
│   │   ├── Badge.jsx            # Status badge (status string → color)
│   │   ├── Button.jsx           # Reusable button (variant, size)
│   │   └── Card.jsx             # White card container (title, action slot)
│   └── common/
│       └── PageHeader.jsx       # Page title + subtitle + action slot
│
└── pages/
    ├── auth/Login.jsx
    ├── patient/
    │   ├── PatientDashboard.jsx
    │   ├── Appointments.jsx
    │   ├── Prescriptions.jsx
    │   ├── Reports.jsx
    │   └── PatientBilling.jsx
    ├── doctor/
    │   ├── DoctorDashboard.jsx
    │   ├── OPDConsultation.jsx
    │   ├── IPDAdmission.jsx
    │   ├── IPDMonitoring.jsx
    │   └── Discharge.jsx
    └── admin/
        ├── AdminDashboard.jsx
        ├── ManageDoctors.jsx
        ├── ManagePatients.jsx
        ├── BedsWards.jsx
        └── AdminReports.jsx
```

---

## Screen Inventory (from wireframe PDF)

| # | Screen | Route | Role |
|---|--------|-------|------|
| 1 | Login | /login | All |
| 2 | Patient Dashboard | /patient/dashboard | Patient |
| 3 | Doctor Dashboard | /doctor/dashboard | Doctor |
| 4 | Appointment Booking | /patient/appointments | Patient |
| 5 | OPD Consultation | /doctor/opd | Doctor |
| 6 | IPD Admission | /doctor/ipd/admit | Doctor |
| 7 | IPD Monitoring | /doctor/ipd/monitor | Doctor |
| 8 | Billing | /patient/billing | Patient |
| 9 | Discharge | /doctor/discharge | Doctor |
| 10 | Admin Dashboard | /admin/dashboard | Admin |
| + | Manage Doctors | /admin/doctors | Admin |
| + | Manage Patients | /admin/patients | Admin |
| + | Beds & Wards | /admin/beds | Admin |
| + | Reports & Analytics | /admin/reports | Admin |

---

## Design System

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| Primary | #0EA5E9 (sky-500) | Actions, active states, links |
| Sidebar | #0F172A (slate-900) | Navigation background |
| Background | #F1F5F9 (slate-100) | App background |
| Surface | #FFFFFF | Cards, panels |
| Text Primary | #0F172A (slate-900) | Headings |
| Text Secondary | #64748B (slate-500) | Labels, sub-text |

### Component Conventions
- **Cards**: `bg-white rounded-xl shadow-sm border border-slate-100`
- **Buttons**: Use `Button.jsx` with `variant` prop (primary / secondary / danger / ghost / success / indigo)
- **Status badges**: Use `Badge.jsx` — pass the status string, it maps to colors automatically
- **Stat cards**: Use `StatCard.jsx` — icon, label, value, sub, color
- **Forms**: `border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-400/30 focus:border-sky-400`

---

## UX Flows (from PDF)

### Patient OPD Journey
Login → Patient Dashboard → Book Appointment → Select Doctor/Date/Time → Confirmed → Visit → Doctor Consultation → Prescription → Billing → View Reports

### Patient IPD Journey
OPD Consultation → Doctor Recommends Admission → IPD Admission → Ward/Bed Allocation → Treatment & Monitoring → Final Billing → Doctor Discharge Approval → Discharge Summary → Discharged

### Doctor Journey
Login → Doctor Dashboard → View OPD Queue → Select Patient → Consultation → Add Diagnosis & Prescription → [For IPD: Monitor Patient → Update Notes → Approve Discharge]

### Admin Journey
Login → Admin Dashboard → Manage Doctors/Patients → Bed & Ward Management → Billing → Reports & Analytics

---

## Backend Integration Checklist (Future)

When integrating the backend, replace mock data with API calls:

- [ ] `AuthContext.jsx` — Replace mock `MOCK_USERS` with POST `/api/auth/login`
- [ ] `mockData.js` — Replace each export with GET/POST API calls via hooks (e.g., `useAppointments`, `usePatients`)
- [ ] Add `axios` or `fetch` wrapper in `src/services/api.js`
- [ ] Add token storage (`localStorage` or `httpOnly` cookie)
- [ ] Add loading and error states to all data-fetching pages
- [ ] Add form validation (e.g., `react-hook-form` + `zod`)
- [ ] Replace mock doctors/patients dropdowns with paginated API data

---

## Commands

```bash
npm run dev      # Start dev server (http://localhost:5173)
npm run build    # Production build
npm run preview  # Preview production build
```

---

## Notes

- **No credentials required** in current demo build — select role and Sign In
- All data is mock/static in `src/data/mockData.js`
- The `App.css` file from the Vite scaffold is no longer used — Tailwind handles all styling
- `src/assets/react.svg` and `vite.svg` can be deleted when cleaning up
- PDF wireframes are in `docs/DOC-20260612-WA0002_260613_153416.pdf`
