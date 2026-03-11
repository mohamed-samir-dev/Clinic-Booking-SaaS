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
    const errorMessage = getErrorMessage(data, response.status);
    throw new Error(errorMessage);
  }

  return data;
};

const getErrorMessage = (data: { code?: string; message?: string; messageAr?: string }, status: number): string => {
  // Check for deactivated account
  if (data.code === 'ACCOUNT_DEACTIVATED' || status === 403) {
    const locale = localStorage.getItem('locale') || 'en';
    return locale === 'ar' ? (data.messageAr || 'تم إلغاء تفعيل حسابك') : (data.message || 'Your account has been deactivated');
  }
  
  const message = data.message || '';
  
  if (message?.toLowerCase().includes('invalid credentials') || message?.toLowerCase().includes('incorrect')) {
    return 'The email or password you entered is incorrect. Please try again.';
  }
  
  if (status === 401) {
    return 'Authentication failed. Please check your credentials and try again.';
  }
  
  if (status === 404) {
    return 'Account not found. Please verify your email address or sign up.';
  }
  
  if (status >= 500) {
    return 'Server error. Please try again later or contact support.';
  }
  
  return message || 'Unable to sign in. Please try again.';
};

export const saveAuthData = (token: string, user: AuthResponse['user']) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('userRole', user.role);
};

export const getRedirectRoute = (role: string): string => {
  return ROLE_ROUTES[role] || '/';
};
