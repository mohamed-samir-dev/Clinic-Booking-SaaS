// Dashboard Components
export { StatCard } from './dashboard/components/StatCard';
export { QuickActions } from './dashboard/components/QuickActions';
export { WeeklyChart } from './dashboard/components/WeeklyChart';

// Appointments Components
export { AppointmentsTable } from './appointments/components/AppointmentsTable';
export { AppointmentFilters } from './appointments/components/AppointmentFilters';

// Doctors Components
export { DoctorCard } from './doctors/components/DoctorCard';

// Patients Components
export { PatientsTable } from './patients/components/PatientsTable';

// Reviews Components
export { ReviewCard } from './reviews/components/ReviewCard';
export { RatingOverview } from './reviews/components/RatingOverview';

// Schedule Components
export { DoctorScheduleCard } from './schedule/components/DoctorScheduleCard';

// Settings Components
export { ClinicInfoForm } from './settings/components/ClinicInfoForm';
export { WorkingHoursForm } from './settings/components/WorkingHoursForm';

// Shared Components
export { default as Sidebar } from './components/Sidebar';
export { default as Navbar } from './components/Navbar';

// Hooks
export { useDashboardData } from './dashboard/hooks/useDashboardData';

// Types
export type { DashboardData, DashboardStats, WeeklyData } from './dashboard/types';
export type { Appointment } from './appointments/types';
export type { Doctor } from './doctors/page';
export type { Patient } from './patients/page';
export type { Review } from './reviews/page';
export type { Appointment as ScheduleAppointment } from './schedule/page';
export type { ClinicData } from './settings/page';
