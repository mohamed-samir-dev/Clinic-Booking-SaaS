import { useState, useEffect } from 'react';
import { DashboardData } from '../types';
import toast from 'react-hot-toast';

const ALLOWED_API_BASE = process.env.NEXT_PUBLIC_API_URL ?? '';

export const useDashboardData = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const url = new URL('/api/manager/dashboard', ALLOWED_API_BASE);
        const response = await fetch(url.toString(), {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error('Failed to fetch dashboard data');

        const result = await response.json();
        setData(result);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load dashboard data';
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
