import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { BookingData,UseBookingParams } from '../types/types';
import { createAppointment } from '../services/api';

export const useBooking = ({ selectedDoctor, selectedService, selectedDate, selectedTime }: UseBookingParams) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [reason, setReason] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [agreeToPolicy, setAgreeToPolicy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { user, token } = useSelector((state: RootState) => state.auth);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleFinishBooking = useCallback(async () => {
    setError(null);
    
    if (!agreeToPolicy) {
      setError('Please agree to the privacy policy');
      return;
    }

    if (!fullName || !phone || !email || !dateOfBirth || !gender || !reason) {
      setError('Please fill all required fields');
      return;
    }

    if (!selectedDoctor || !selectedDate || !selectedTime) {
      setError('Please complete all booking steps');
      return;
    }

    setIsSubmitting(true);

    try {
      const data = await createAppointment({
        selectedDoctor,
        selectedDate,
        selectedTime,
        selectedService,
        patientData: { fullName, phone, email, dateOfBirth, gender, reason },
        user,
        token
      });

      setBookingData(data);
      return true;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create booking. Please try again.';
      setError(errorMessage);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [agreeToPolicy, fullName, phone, email, dateOfBirth, gender, reason, selectedDoctor, selectedDate, selectedTime, selectedService, user, token]);

  const canSubmit = agreeToPolicy && !!fullName && !!phone && !!email && !!dateOfBirth && !!gender && !!reason;

  return {
    fullName, setFullName,
    phone, setPhone,
    email, setEmail,
    dateOfBirth, setDateOfBirth,
    gender, setGender,
    reason, setReason,
    file, handleFileChange,
    agreeToPolicy, setAgreeToPolicy,
    isSubmitting,
    bookingData,
    handleFinishBooking,
    canSubmit,
    error,
    setError
  };
};
