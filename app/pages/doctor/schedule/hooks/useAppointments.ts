import { useState, useEffect } from 'react';
import { Appointment } from '../types';

export const useAppointments = (currentDate: Date) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        
        const allResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/appointments/doctor/range?start=${monthStart.toISOString()}&end=${monthEnd.toISOString()}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        if (allResponse.ok) {
          const allData = await allResponse.json();
          setAppointments(allData.appointments || []);
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [currentDate]);

  return appointments;
};
