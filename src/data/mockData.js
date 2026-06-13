export const mockAppointments = [
  { id: 1, doctor: 'Dr. Priya Mehta', specialization: 'Cardiology', date: '2026-06-15', time: '10:00 AM', status: 'confirmed', type: 'OPD' },
  { id: 2, doctor: 'Dr. Rajan Kumar', specialization: 'Orthopedics', date: '2026-06-18', time: '11:30 AM', status: 'pending', type: 'OPD' },
  { id: 3, doctor: 'Dr. Anita Singh', specialization: 'Neurology', date: '2026-05-30', time: '09:00 AM', status: 'completed', type: 'OPD' },
  { id: 4, doctor: 'Dr. Vikram Nair', specialization: 'General Medicine', date: '2026-06-20', time: '02:00 PM', status: 'confirmed', type: 'OPD' },
]

export const mockDoctors = [
  { id: 1, name: 'Dr. Priya Mehta', specialization: 'Cardiology', patients: 24, status: 'available', experience: '12 yrs', qualification: 'MBBS, MD', schedule: 'Mon–Fri' },
  { id: 2, name: 'Dr. Rajan Kumar', specialization: 'Orthopedics', patients: 18, status: 'busy', experience: '8 yrs', qualification: 'MBBS, MS', schedule: 'Mon–Sat' },
  { id: 3, name: 'Dr. Anita Singh', specialization: 'Neurology', patients: 31, status: 'available', experience: '15 yrs', qualification: 'MBBS, DM', schedule: 'Tue–Sat' },
  { id: 4, name: 'Dr. Vikram Nair', specialization: 'General Medicine', patients: 42, status: 'available', experience: '10 yrs', qualification: 'MBBS', schedule: 'Mon–Fri' },
  { id: 5, name: 'Dr. Suman Das', specialization: 'Pediatrics', patients: 56, status: 'off-duty', experience: '6 yrs', qualification: 'MBBS, DCH', schedule: 'Mon–Fri' },
]

export const mockPatients = [
  { id: 1, name: 'Arjun Sharma', age: 34, gender: 'Male', contact: '9876543210', ward: 'General', bed: 'G-12', status: 'IPD', doctor: 'Dr. Priya Mehta', admitDate: '2026-06-10' },
  { id: 2, name: 'Sunita Patel', age: 52, gender: 'Female', contact: '9123456789', ward: '—', bed: '—', status: 'OPD', doctor: 'Dr. Rajan Kumar', admitDate: '—' },
  { id: 3, name: 'Ramesh Gupta', age: 67, gender: 'Male', contact: '9988776655', ward: 'ICU', bed: 'ICU-3', status: 'IPD', doctor: 'Dr. Anita Singh', admitDate: '2026-06-12' },
  { id: 4, name: 'Kavya Reddy', age: 28, gender: 'Female', contact: '9765432100', ward: 'Private', bed: 'P-5', status: 'IPD', doctor: 'Dr. Vikram Nair', admitDate: '2026-06-08' },
  { id: 5, name: 'Mohan Das', age: 45, gender: 'Male', contact: '9654321098', ward: '—', bed: '—', status: 'OPD', doctor: 'Dr. Priya Mehta', admitDate: '—' },
]

export const mockPrescriptions = [
  { id: 1, doctor: 'Dr. Priya Mehta', date: '2026-06-01', diagnosis: 'Hypertension', medicines: [{ name: 'Atorvastatin', dose: '10mg', duration: '30 days' }, { name: 'Aspirin', dose: '75mg', duration: '30 days' }], status: 'active' },
  { id: 2, doctor: 'Dr. Rajan Kumar', date: '2026-05-15', diagnosis: 'Knee Joint Pain', medicines: [{ name: 'Ibuprofen', dose: '400mg', duration: '7 days' }, { name: 'Pantoprazole', dose: '40mg', duration: '7 days' }], status: 'completed' },
  { id: 3, doctor: 'Dr. Vikram Nair', date: '2026-04-20', diagnosis: 'Viral Fever', medicines: [{ name: 'Paracetamol', dose: '650mg', duration: '5 days' }, { name: 'Cetirizine', dose: '10mg', duration: '5 days' }], status: 'completed' },
]

export const mockReports = [
  { id: 1, name: 'Complete Blood Count (CBC)', date: '2026-06-05', doctor: 'Dr. Priya Mehta', type: 'Lab', result: 'Normal', status: 'ready' },
  { id: 2, name: 'Chest X-Ray', date: '2026-06-01', doctor: 'Dr. Priya Mehta', type: 'Radiology', result: 'Clear', status: 'ready' },
  { id: 3, name: 'ECG Report', date: '2026-05-28', doctor: 'Dr. Priya Mehta', type: 'Cardiology', result: 'Normal Sinus Rhythm', status: 'ready' },
  { id: 4, name: 'Lipid Profile', date: '2026-05-15', doctor: 'Dr. Priya Mehta', type: 'Lab', result: 'LDL slightly elevated', status: 'ready' },
]

export const mockBeds = [
  { ward: 'General', total: 40, occupied: 32, available: 8, color: 'sky' },
  { ward: 'Semi-Private', total: 20, occupied: 15, available: 5, color: 'indigo' },
  { ward: 'Private', total: 10, occupied: 7, available: 3, color: 'violet' },
  { ward: 'ICU', total: 8, occupied: 6, available: 2, color: 'rose' },
]

export const mockIPDPatients = [
  { id: 1, name: 'Arjun Sharma', ward: 'General', bed: 'G-12', admitDate: '2026-06-10', doctor: 'Dr. Priya Mehta', condition: 'Stable', days: 3, diagnosis: 'Hypertension monitoring' },
  { id: 2, name: 'Ramesh Gupta', ward: 'ICU', bed: 'ICU-3', admitDate: '2026-06-12', doctor: 'Dr. Anita Singh', condition: 'Critical', days: 1, diagnosis: 'Stroke recovery' },
  { id: 3, name: 'Kavya Reddy', ward: 'Private', bed: 'P-5', admitDate: '2026-06-08', doctor: 'Dr. Vikram Nair', condition: 'Recovering', days: 5, diagnosis: 'Post-surgical recovery' },
]

export const mockOPDQueue = [
  { token: 1, name: 'Sunita Patel', age: 52, time: '09:00 AM', type: 'OPD', status: 'in-consultation', symptoms: 'Knee pain, difficulty walking' },
  { token: 2, name: 'Mohan Das', age: 38, time: '09:30 AM', type: 'OPD', status: 'waiting', symptoms: 'Chest discomfort, shortness of breath' },
  { token: 3, name: 'Lakshmi Rao', age: 65, time: '10:00 AM', type: 'OPD', status: 'waiting', symptoms: 'Headache, dizziness' },
  { token: 4, name: 'Ravi Teja', age: 28, time: '10:30 AM', type: 'OPD', status: 'waiting', symptoms: 'Fever, body ache' },
]

export const mockBillingData = {
  patientId: 'PT-2026-001',
  patientName: 'Arjun Sharma',
  invoiceNo: 'INV-2026-0432',
  date: '2026-06-13',
  items: [
    { description: 'Consultation Charges', amount: 500 },
    { description: 'Room Charges (3 days)', amount: 4500 },
    { description: 'Lab Charges (CBC, Lipid)', amount: 1200 },
    { description: 'Pharmacy', amount: 850 },
    { description: 'Nursing Charges', amount: 600 },
  ],
  total: 7650,
  paid: 2000,
  pending: 5650,
}

export const mockTimeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
]

export const mockVitals = {
  bp: '128/82 mmHg',
  pulse: '78 bpm',
  temp: '98.6°F',
  spo2: '98%',
  weight: '72 kg',
}
