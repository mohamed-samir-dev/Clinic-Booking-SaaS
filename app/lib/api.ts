const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface FetchOptions extends RequestInit {
  requireAuth?: boolean;
}

async function fetchAPI<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { requireAuth = false, headers = {}, ...restOptions } = options;

  const config: RequestInit = {
    ...restOptions,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (requireAuth) {
    const token = localStorage.getItem('token');
    if (token) {
      (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

export const api = {
  doctors: {
    getTop: () => fetchAPI('/api/doctors/top'),
    getAll: (filters?: { specialty?: string; gender?: string; isAvailableToday?: boolean; minExperience?: number }) => {
      const params = new URLSearchParams();
      if (filters?.specialty) params.append('specialty', filters.specialty);
      if (filters?.gender) params.append('gender', filters.gender);
      if (filters?.isAvailableToday !== undefined) params.append('isAvailableToday', String(filters.isAvailableToday));
      if (filters?.minExperience) params.append('minExperience', String(filters.minExperience));
      return fetchAPI(`/api/doctors/all?${params.toString()}`);
    },
    getById: (id: string) => fetchAPI(`/api/doctors/${id}`),
    getFilters: () => fetchAPI('/api/doctors/filters'),
    delete: (id: string) => fetchAPI(`/api/owner/doctors/${id}`, { method: 'DELETE', requireAuth: true }),
  },
  reviews: {
    getAll: () => fetchAPI('/api/reviews'),
    getStats: () => fetchAPI('/api/reviews/stats'),
  },
  patient: {
    appointments: {
      getAll: () => fetchAPI('/api/patient/appointments', { requireAuth: true }),
      cancel: (id: string) => fetchAPI(`/api/patient/appointments/${id}/cancel`, { 
        method: 'PUT', 
        requireAuth: true 
      }),
    },
  },
};
