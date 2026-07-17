import { AuthResponse } from '@/app/shared/types/auth.types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const registerPatient = async (data: { name: string; email: string; password: string; phone: string }) => {
  const response = await fetch(`${API_URL}/api/v1/auth/patient/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  let json: { message?: string; token: string; user: AuthResponse['user'] };
  try {
    json = await response.json();
  } catch {
    throw new Error('Registration failed. Please try again.');
  }

  if (!response.ok) {
    throw new Error(json.message || 'Registration failed');
  }

  return json;
};
