const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const registerPatient = async (data: { name: string; email: string; password: string; phone: string }) => {
  const response = await fetch(`${API_URL}/api/v1/auth/patient/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Registration failed');
  }

  return response.json();
};
