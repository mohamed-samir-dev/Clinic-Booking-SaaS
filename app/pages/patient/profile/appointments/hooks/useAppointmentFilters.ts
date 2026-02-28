import { useState } from 'react';
import { Appointment, AppointmentFilters } from '@/app/types/appointment';
import { getText } from '@/app/utils/i18n';

export function useAppointmentFilters(appointments: Appointment[], activeTab: 'upcoming' | 'past' | 'cancelled') {
  const [filters, setFilters] = useState<AppointmentFilters>({});

  const getFilteredAppointments = () => {
    let filtered = appointments;

    const now = new Date();
    if (activeTab === 'upcoming') {
      filtered = filtered.filter(apt => 
        ['pending', 'confirmed'].includes(apt.status) && 
        new Date(apt.appointmentDate) >= now
      );
    } else if (activeTab === 'past') {
      filtered = filtered.filter(apt => 
        apt.status === 'completed' || 
        (new Date(apt.appointmentDate) < now && apt.status !== 'cancelled')
      );
    } else if (activeTab === 'cancelled') {
      filtered = filtered.filter(apt => apt.status === 'cancelled');
    }

    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(apt =>
        getText(apt.doctorId?.name).toLowerCase().includes(search) ||
        getText(apt.businessId?.name).toLowerCase().includes(search) ||
        getText(apt.service).toLowerCase().includes(search)
      );
    }

    if (filters.status) {
      filtered = filtered.filter(apt => apt.status === filters.status);
    }

    if (filters.sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.appointmentDate).getTime() - new Date(a.appointmentDate).getTime());
    } else if (filters.sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime());
    }

    return filtered;
  };

  return {
    filters,
    setFilters,
    filteredAppointments: getFilteredAppointments(),
  };
}
