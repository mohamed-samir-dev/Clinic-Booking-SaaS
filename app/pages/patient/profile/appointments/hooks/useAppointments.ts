import { useState, useEffect } from 'react';
import { Appointment } from '@/app/types/appointment';

interface CancelResult {
  success: boolean;
  message?: string;
}

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/patients/appointments', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setAppointments(data.appointments || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleCancelAppointment = async (id: string): Promise<CancelResult> => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/patients/appointments/${id}/cancel`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      if (data.success) {
        await fetchAppointments();
        return { success: true, message: 'Appointment cancelled successfully' };
      } else {
        return { success: false, message: data.message || 'Failed to cancel appointment' };
      }
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      return { success: false, message: 'Error cancelling appointment' };
    }
  };

  return {
    appointments,
    loading,
    fetchAppointments,
    handleCancelAppointment,
  };
}
