import { UserType, LoginCredentials, AuthResponse } from '@/app/shared/types/auth.types';
import { AUTH_ENDPOINTS, ROLE_ROUTES, ROLES_REQUIRING_BUSINESS_ID } from '@/app/shared/constants/auth.constants';
import messages from '@/messages/en.json';
import messagesAr from '@/messages/ar.json';

const getLocale = () =>
  typeof window !== 'undefined' ? localStorage.getItem('locale') || 'en' : 'en';

const getLoginMessages = () => {
  const locale = getLocale();
  return locale === 'ar' ? messagesAr.auth.login : messages.auth.login;
};

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
  const t = getLoginMessages();
  const locale = getLocale();

  if (data.code === 'ACCOUNT_DEACTIVATED' || status === 403) {
    return locale === 'ar' ? (data.messageAr || t.accountDeactivated) : (data.message || t.accountDeactivated);
  }

  const message = data.message || '';

  if (message?.toLowerCase().includes('invalid credentials') || message?.toLowerCase().includes('incorrect')) {
    return t.errorIncorrect;
  }

  if (status === 401) return t.authFailed;
  if (status === 404) return t.accountNotFound;
  if (status >= 500) return t.serverError;

  return message || t.unableToSignIn;
};

export const saveAuthData = (token: string, user: AuthResponse['user']) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('userRole', user.role);
  document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
};

export const getRedirectRoute = (role: string): string => {
  return ROLE_ROUTES[role] || '/';
};
