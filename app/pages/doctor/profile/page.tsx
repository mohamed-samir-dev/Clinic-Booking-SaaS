'use client';

import { useState } from 'react';
import { useDoctorProfile, useProfileEdit } from './hooks/useDoctorProfile';
import { ProfileCard } from './components/ProfileCard';
import { ContactInfo } from './components/ContactInfo';
import { EducationSection } from './components/EducationSection';
import { PersonalInfo } from './components/PersonalInfo';
import { Specializations, LanguagesSection } from './components/SpecializationsAndLanguages';
import { WorkingHours } from './components/WorkingHours';
import { validateWorkingHours, addTimeSlot, removeTimeSlot, updateTimeSlot } from './utils/scheduleHelpers';
import { Toast } from './components/Toast';

type EditingField = 'name' | 'fees' | 'duration' | 'email' | 'phone' | 'location' | 'password' | null;

export default function DoctorProfilePage() {
  const { profile, setProfile, loading, clinicHours, token } = useDoctorProfile();
  const { editData, setEditData } = useProfileEdit(profile);
  const [editingSchedule, setEditingSchedule] = useState(false);
  const [savingSchedule, setSavingSchedule] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [editingField, setEditingField] = useState<EditingField>(null);
  const [fieldSaving, setFieldSaving] = useState(false);
  const [toast, setToast] = useState<{message: string; type: 'success' | 'error'} | null>(null);

  const handleSaveSchedule = async () => {
    if (!token) return;
    
    setErrorMessage('');
    setSuccessMessage('');
    
    const validation = validateWorkingHours(editData.availability, clinicHours);
    if (!validation.valid) {
      setErrorMessage(validation.error || 'Invalid working hours');
      return;
    }
    
    setSavingSchedule(true);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/doctors/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ availability: editData.availability })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update schedule');
      }
      
      const data = await response.json();
      setProfile(data);
      setEditingSchedule(false);
      setSuccessMessage('Working hours updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error: unknown) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to update schedule');
    } finally {
      setSavingSchedule(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleFieldSave = async (field: EditingField) => {
    if (!token || !field) return;
    setFieldSaving(true);
    
    try {
      let updateData: Record<string, string | number | { address: string; city: string }> = {};
      
      switch(field) {
        case 'name':
          updateData = { firstName: editData.firstName, lastName: editData.lastName };
          break;
        case 'fees':
          updateData = { fees: editData.fees };
          break;
        case 'duration':
          updateData = { consultationDuration: editData.consultationDuration };
          break;
        case 'email':
          updateData = { email: editData.email };
          break;
        case 'phone':
          updateData = { phone: editData.phone };
          break;
        case 'location':
          updateData = { location: editData.location };
          break;
        case 'password':
          if (!editData.password) {
            showToast('Please enter a new password', 'error');
            setFieldSaving(false);
            return;
          }
          updateData = { password: editData.password };
          break;
      }
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/doctors/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update');
      }
      
      const data = await response.json();
      setProfile(data);
      setEditingField(null);
      if (field === 'password') {
        setEditData({...editData, password: ''});
      }
      showToast('Updated successfully!', 'success');
    } catch (error: unknown) {
      showToast(error instanceof Error ? error.message : 'Failed to update', 'error');
    } finally {
      setFieldSaving(false);
    }
  };

  const handleFieldCancel = (field: EditingField) => {
    if (!profile) return;
    
    switch(field) {
      case 'name':
        setEditData({...editData, firstName: profile.firstName, lastName: profile.lastName});
        break;
      case 'fees':
        setEditData({...editData, fees: profile.fees});
        break;
      case 'duration':
        setEditData({...editData, consultationDuration: profile.consultationDuration});
        break;
      case 'email':
        setEditData({...editData, email: profile.email});
        break;
      case 'phone':
        setEditData({...editData, phone: profile.phone || ''});
        break;
      case 'location':
        setEditData({...editData, location: { address: profile.location?.address || '', city: profile.location?.city || '' }});
        break;
      case 'password':
        setEditData({...editData, password: ''});
        break;
    }
    setEditingField(null);
  };



  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500">Failed to load profile</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-linear-to-br from-gray-50 via-white to-teal-50/30">
      {toast && <Toast message={toast.message} type={toast.type} />}

      <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
        <ProfileCard 
          profile={profile}
          editingField={editingField}
          editData={editData}
          setEditData={setEditData}
          onEdit={setEditingField}
          onSave={handleFieldSave}
          onCancel={handleFieldCancel}
          saving={fieldSaving}
        />

        <div className="space-y-4 sm:space-y-6">
          {profile.aboutUs?.en && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-linear-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
                  <span className="material-icons text-white text-sm">info</span>
                </div>
                About Me
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{profile.aboutUs.en}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <EducationSection education={profile.education} />
            <ContactInfo 
              profile={profile}
              editingField={editingField}
              editData={editData}
              setEditData={setEditData}
              onEdit={setEditingField}
              onSave={handleFieldSave}
              onCancel={handleFieldCancel}
              saving={fieldSaving}
            />
            <PersonalInfo 
              profile={profile}
              editingField={editingField}
              editData={editData}
              setEditData={setEditData}
              onEdit={setEditingField}
              onSave={handleFieldSave}
              onCancel={handleFieldCancel}
              saving={fieldSaving}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <Specializations specializations={profile.specializations} />
            <LanguagesSection languages={profile.languages} />
          </div>

          <WorkingHours 
            profile={profile}
            editData={editData}
            clinicHours={clinicHours}
            editingSchedule={editingSchedule}
            savingSchedule={savingSchedule}
            errorMessage={errorMessage}
            successMessage={successMessage}
            onEditSchedule={() => setEditingSchedule(true)}
            onCancelSchedule={() => {
              setEditData({...editData, availability: profile.availability || []});
              setEditingSchedule(false);
              setErrorMessage('');
              setSuccessMessage('');
            }}
            onSaveSchedule={handleSaveSchedule}
            onAddTimeSlot={(day) => setEditData(addTimeSlot(day, editData, clinicHours))}
            onRemoveTimeSlot={(day, index) => setEditData(removeTimeSlot(day, index, editData))}
            onUpdateTimeSlot={(day, index, field, value) => setEditData(updateTimeSlot(day, index, field, value, editData))}
          />
        </div>
      </div>
    </div>
  );
}
