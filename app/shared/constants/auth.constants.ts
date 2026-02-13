import { UserType } from '../types/auth.types';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const AUTH_ENDPOINTS: Record<UserType, string> = {
  patient: `${API_URL}/api/v1/auth/patient/login`,
  owner: `${API_URL}/api/v1/auth/owner/login`,
  manager: `${API_URL}/api/v1/auth/manager/login`,
  doctor: `${API_URL}/api/v1/auth/doctor/login`,
  staff: `${API_URL}/api/v1/auth/staff/login`
};

export const ROLE_ROUTES: Record<string, string> = {
  owner: '/owner',
  manager: '/manager',
  doctor: '/doctor',
  staff: '/staff',
  patient: '/'
};

export const ROLES_REQUIRING_BUSINESS_ID: UserType[] = ['manager', 'doctor', 'staff'];
