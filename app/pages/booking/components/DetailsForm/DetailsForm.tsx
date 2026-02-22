'use client';

import { useState, useEffect, useCallback } from 'react';
import { Doctor } from '@/app/types/index';
import BookingSummary from '../TimeSelection/components/BookingSummary';
import BookingConfirmationPopup from '../BookingConfirmationPopup';
import Toast from '@/app/components/Toast';
import { 
  PatientTypeSelector, 
  BasicInformation, 
  PatientDemographics, 
  MedicalContext, 
  PrivacyPolicy,
  useBooking 
} from './index';

interface DetailsFormProps {
  selectedDoctor?: Doctor;
  selectedService: string;
  selectedDate: Date | null;
  selectedTime: string;
  onBookingSubmit?: (handler: () => void, isSubmitting: boolean, canSubmit: boolean) => void;
}

export default function DetailsForm({ selectedDoctor, selectedService, selectedDate, selectedTime, onBookingSubmit }: DetailsFormProps) {
  const [patientType, setPatientType] = useState<'new' | 'returning'>('new');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const {
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
  } = useBooking({ selectedDoctor, selectedService, selectedDate, selectedTime });

  const onFinish = useCallback(async () => {
    const success = await handleFinishBooking();
    if (success) setShowConfirmation(true);
  }, [handleFinishBooking]);

  useEffect(() => {
    if (onBookingSubmit) {
      onBookingSubmit(onFinish, isSubmitting, canSubmit);
    }
  }, [onFinish, isSubmitting, canSubmit, onBookingSubmit]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Patient Details</h2>
          <p className="text-gray-600 mb-6">Step 4 of 4: Please provide your personal and medical information.</p>

          <PatientTypeSelector patientType={patientType} setPatientType={setPatientType} />

          <BasicInformation 
            fullName={fullName} 
            setFullName={setFullName}
            phone={phone}
            setPhone={setPhone}
            email={email}
            setEmail={setEmail}
          />

          <PatientDemographics 
            dateOfBirth={dateOfBirth}
            setDateOfBirth={setDateOfBirth}
            gender={gender}
            setGender={setGender}
          />

          <MedicalContext 
            reason={reason}
            setReason={setReason}
            file={file}
            handleFileChange={handleFileChange}
          />

          <PrivacyPolicy agreeToPolicy={agreeToPolicy} setAgreeToPolicy={setAgreeToPolicy} />
        </div>
      </div>

      <BookingSummary
        doctorObject={selectedDoctor || null}
        selectedService={selectedService}
        consultationDuration={30}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
      />

      {bookingData && (
        <BookingConfirmationPopup
          isOpen={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          bookingData={bookingData}
        />
      )}

      {error && (
        <Toast
          message={error}
          type="error"
          onClose={() => setError(null)}
        />
      )}
    </div>
  );
}
