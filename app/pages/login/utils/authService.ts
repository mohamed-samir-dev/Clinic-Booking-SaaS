import { UserType, LoginCredentials, AuthResponse } from '@/app/shared/types/auth.types';
import { AUTH_ENDPOINTS, ROLE_ROUTES, ROLES_REQUIRING_BUSINESS_ID } from '@/app/shared/constants/auth.constants';

export const loginUser = async (
  userType: UserType,
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const body: LoginCredentials = {
    email: credentials.email,
    password: credentials.password
  };

  if (ROLES_REQUIRING_BUSINESS_ID.includes(userType)) {
    body.businessId = credentials.businessId;
  }

  const response = await fetch(AUTH_ENDPOINTS[userType], {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }

  return data;
};

export const saveAuthData = (token: string, user: AuthResponse['user']) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

export const getRedirectRoute = (role: string): string => {
  return ROLE_ROUTES[role] || '/';
};
