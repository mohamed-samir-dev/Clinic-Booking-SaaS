import React from 'react';
import { FaClock } from 'react-icons/fa';
import { Appointment } from '@/app/types/appointment';
import { getText } from '@/app/utils/i18n';

interface NextAppointmentCardProps {
  appointment: Appointment;
  formatDate: (date: string) => { day: string; fullDate: string };
}

export function NextAppointmentCard({ appointment, formatDate }: NextAppointmentCardProps) {
  return (
    <div className="bg-linear-to-r from-teal-500 to-teal-600 rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 text-white">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <FaClock className="text-lg sm:text-xl" />
        <h3 className="text-base sm:text-lg font-bold">Next Appointment</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <div>
          <p className="text-teal-100 text-xs mb-1">Doctor</p>
          <p className="font-semibold text-sm sm:text-base truncate">{getText(appointment.doctorId?.name)}</p>
          {appointment.doctorId?.specialty && (
            <p className="text-teal-100 text-xs sm:text-sm truncate">{getText(appointment.doctorId.specialty)}</p>
          )}
        </div>
        <div>
          <p className="text-teal-100 text-xs mb-1">Date & Time</p>
          <p className="font-semibold text-sm sm:text-base">
            {formatDate(appointment.appointmentDate).fullDate}
          </p>
          <p className="text-teal-100 text-xs sm:text-sm">{appointment.startTime}</p>
        </div>
        <div>
          <p className="text-teal-100 text-xs mb-1">Clinic</p>
          <p className="font-semibold text-sm sm:text-base truncate">
            {appointment.doctorId?.clinicId?.name 
              ? getText(appointment.doctorId.clinicId.name) 
              : (appointment.businessId?.name ? getText(appointment.businessId.name) : 'N/A')}
          </p>
        </div>
      </div>
    </div>
  );
}
