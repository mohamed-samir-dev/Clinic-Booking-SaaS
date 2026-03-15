export const fetchFavoriteDoctors = async (token: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/patients/favorites`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (response.ok) {
    const result = await response.json();
    return result.data;
  }
  return [];
};

export const fetchFavoriteClinics = async (token: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/patients/favorites/clinics`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (response.ok) {
    const result = await response.json();
    return result.data;
  }
  return [];
};
