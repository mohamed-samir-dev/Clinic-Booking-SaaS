import { useState, useEffect, useCallback } from 'react';
import { Appointment, Stat } from '../types';

export const useDoctorData = (token: string | null) => {
  const [stats, setStats] = useState<Stat[]>([
    { icon: 'event_available', label: "Today's Appointments", value: '0', color: 'from-blue-500 to-blue-600' },
    { icon: 'pending_actions', label: 'Pending Requests', value: '0', color: 'from-orange-500 to-orange-600' },
    { icon: 'calendar_month', label: 'Total Appointments', value: '0', color: 'from-purple-500 to-purple-600' },
    { icon: 'payments', label: 'Monthly Revenue', value: '$0', color: 'from-green-500 to-green-600' },
    { icon: 'star', label: 'Average Rating', value: '0.0', color: 'from-yellow-500 to-yellow-600' },
  ]);

  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([]);
  const [newRequests, setNewRequests] = useState<Appointment[]>([]);
  const [pendingCount, setPendingCount] = useState(0);

  const fetchStats = useCallback(async () => {
    if (!token) return;
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/appointments/doctor-stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) return;
      
      const data = await response.json();
      
      if (data.todayAppointments !== undefined) {
        setStats([
          { icon: 'event_available', label: "Today's Appointments", value: data.todayAppointments.toString(), color: 'from-blue-500 to-blue-600' },
          { icon: 'pending_actions', label: 'Pending Requests', value: data.pendingRequests.toString(), color: 'from-orange-500 to-orange-600' },
          { icon: 'calendar_month', label: 'Total Appointments', value: data.totalAppointments.toString(), color: 'from-purple-500 to-purple-600' },
          { icon: 'payments', label: 'Monthly Revenue', value: `$${data.monthlyRevenue.toLocaleString()}`, color: 'from-green-500 to-green-600' },
          { icon: 'star', label: 'Average Rating', value: data.averageRating, color: 'from-yellow-500 to-yellow-600' },
        ]);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  }, [token]);

  const fetchTodayAppointments = useCallback(async () => {
    if (!token) return;
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/appointments/doctor/today`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) return;
      
      const data = await response.json();
      setTodayAppointments(data.appointments || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  }, [token]);

  const fetchPendingRequests = useCallback(async () => {
    if (!token) {
      console.warn('No token available for fetching pending requests');
      return;
    }
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/appointments/doctor/pending`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          console.error('Authentication failed. Please log in again.');
        } else {
          console.error('Failed to fetch pending requests:', response.status);
        }
        return;
      }
      
      const data = await response.json();
      const requests = data.requests || [];
      setNewRequests(requests.slice(0, 3));
      setPendingCount(requests.length);
    } catch (error) {
      console.error('Error fetching pending requests:', error);
    }
  }, [token]);

  const refreshData = useCallback(() => {
    fetchStats();
    fetchTodayAppointments();
    fetchPendingRequests();
  }, [fetchStats, fetchTodayAppointments, fetchPendingRequests]);

  useEffect(() => {
    if (!token) return;

    const loadData = async () => {
      await Promise.all([
        fetchStats(),
        fetchTodayAppointments(),
        fetchPendingRequests()
      ]);
    };

    loadData();

    const handleAppointmentUpdate = () => {
      refreshData();
    };

    window.addEventListener('appointmentUpdated', handleAppointmentUpdate);
    return () => window.removeEventListener('appointmentUpdated', handleAppointmentUpdate);
  }, [token, fetchStats, fetchTodayAppointments, fetchPendingRequests, refreshData]);

  return {
    stats,
    todayAppointments,
    newRequests,
    pendingCount,
    refreshData
  };
};
