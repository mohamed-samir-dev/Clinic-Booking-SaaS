import { PermissionItem } from '../types';

export const PERMISSION_ITEMS: PermissionItem[] = [
  { key: 'manageDoctors', label: 'Manage Doctors' },
  { key: 'manageAppointments', label: 'Manage Appointments' },
  { key: 'viewReports', label: 'View Reports' },
  { key: 'managePricesServices', label: 'Manage Prices/Services' },
  { key: 'managePayments', label: 'Manage Payments' },
];

export const PERMISSION_KEYS = PERMISSION_ITEMS.map((p) => p.key);
