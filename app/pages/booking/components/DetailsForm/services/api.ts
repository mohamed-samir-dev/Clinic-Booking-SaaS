import {  BookingData,CreateAppointmentParams } from '../types/types';
import { convertTo24Hour } from './utils';

export const createAppointment = async ({
  selectedDoctor,
  selectedDate,
  selectedTime,
  selectedService,
  patientData,
  files,
  user,
  token,
  locale
}: CreateAppointmentParams): Promise<BookingData> => {
  let guestId = null;
  if (!user) {
    guestId = localStorage.getItem('guestId');
    if (!guestId) {
      guestId = crypto.randomUUID();
      localStorage.setItem('guestId', guestId);
    }
  }

  const { startTime24, endTime24 } = convertTo24Hour(selectedTime);

  const year = selectedDate.getFullYear();
  const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
  const day = String(selectedDate.getDate()).padStart(2, '0');
  const localDateString = `${year}-${month}-${day}`;

  const appointmentData = {
    doctorId: selectedDoctor._id,
    appointmentDate: localDateString,
    startTime: startTime24,
    endTime: endTime24,
    patientData: {
      fullName: patientData.fullName,
      email: patientData.email,
      phone: patientData.phone,
      dateOfBirth: patientData.dateOfBirth,
      gender: patientData.gender
    },
    reason: patientData.reason,
    service: selectedService,
    type: selectedService.toLowerCase().includes('follow') ? 'follow-up' : 'consultation',
    guestId
  };

  const headers: Record<string, string> = {};

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  let body: BodyInit;
  let contentTypeHeader: Record<string, string> = {};

  if (files && files.length > 0) {
    const formData = new FormData();
    formData.append('data', JSON.stringify(appointmentData));
    files.forEach((file) => formData.append('files', file));
    body = formData;
  } else {
    contentTypeHeader = { 'Content-Type': 'application/json' };
    body = JSON.stringify(appointmentData);
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/appointments`, {
    method: 'POST',
    headers: { ...headers, ...contentTypeHeader },
    body
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMessage = data.messageEn || data.message || 'Failed to create appointment';
    throw new Error(errorMessage);
  }

  if (data.guestId) {
    localStorage.setItem('guestId', data.guestId);
  }

  return {
    appointmentId: data.appointment._id,
    doctor: {
      name: locale === 'ar' ? selectedDoctor.name.ar : selectedDoctor.name.en,
      specialty: locale === 'ar' ? selectedDoctor.specialty.ar : selectedDoctor.specialty.en,
      photoUrl: selectedDoctor.photoUrl
    },
    patient: {
      fullName: patientData.fullName,
      email: patientData.email,
      phone: patientData.phone
    },
    appointmentDate: selectedDate.toISOString(),
    startTime: selectedTime,
    endTime: endTime24,
    service: data.appointment.service || selectedService,
    fee: selectedDoctor.fees || 150,
    status: data.appointment.status
  };
};
