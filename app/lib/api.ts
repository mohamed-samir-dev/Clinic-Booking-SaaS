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
    getAll: () => fetchAPI('/api/owner/doctors', { requireAuth: true }),
    delete: (id: string) => fetchAPI(`/api/owner/doctors/${id}`, { method: 'DELETE', requireAuth: true }),
  },
  reviews: {
    getAll: () => fetchAPI('/api/reviews'),
    getStats: () => fetchAPI('/api/reviews/stats'),
  },
};
