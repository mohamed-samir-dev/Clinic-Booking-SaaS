export const fetchFavoriteDoctors = async (token: string) => {
  const response = await fetch('http://localhost:5000/api/patients/favorites', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (response.ok) {
    const result = await response.json();
    return result.data;
  }
  return [];
};

export const fetchFavoriteClinics = async (token: string) => {
  const response = await fetch('http://localhost:5000/api/patients/favorites/clinics', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (response.ok) {
    const result = await response.json();
    return result.data;
  }
  return [];
};
