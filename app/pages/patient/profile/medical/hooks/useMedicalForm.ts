import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/app/store/hooks';
import { setCredentials } from '@/app/store/slices/authSlice';
import { useLanguage } from '@/app/contexts/LanguageContext';
import messages from '@/messages/en.json';
import messagesAr from '@/messages/ar.json';
import { MedicalFormData, Medication } from '../types';

export const useMedicalForm = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const { locale } = useLanguage();
  const t = locale === 'ar' ? messagesAr.patient.medical : messages.patient.medical;
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const [formData, setFormData] = useState<MedicalFormData>({
    bloodType: user?.bloodType || '',
    height: user?.height?.toString() || '',
    weight: user?.weight?.toString() || '',
    allergies: user?.allergies || [],
    chronicConditions: user?.chronicConditions || [],
    chronicConditionsOther: user?.chronicConditionsOther || '',
    currentMedications: user?.currentMedications || [],
    notesForDoctor: user?.notesForDoctor || ''
  });

  const [newAllergy, setNewAllergy] = useState('');
  const [newMedication, setNewMedication] = useState<Medication>({
    name: '',
    dosage: '',
    frequency: '',
    notes: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        bloodType: user.bloodType || '',
        height: user.height?.toString() || '',
        weight: user.weight?.toString() || '',
        allergies: user.allergies || [],
        chronicConditions: user.chronicConditions || [],
        chronicConditionsOther: user.chronicConditionsOther || '',
        currentMedications: user.currentMedications || [],
        notesForDoctor: user.notesForDoctor || ''
      });
    }
  }, [user]);

  const handleAddAllergy = () => {
    if (newAllergy.trim()) {
      setFormData({
        ...formData,
        allergies: [...formData.allergies, newAllergy.trim()]
      });
      setNewAllergy('');
    }
  };

  const handleRemoveAllergy = (index: number) => {
    setFormData({
      ...formData,
      allergies: formData.allergies.filter((_, i) => i !== index)
    });
  };

  const handleAddMedication = () => {
    if (newMedication.name.trim()) {
      setFormData({
        ...formData,
        currentMedications: [...formData.currentMedications, newMedication]
      });
      setNewMedication({ name: '', dosage: '', frequency: '', notes: '' });
    }
  };

  const handleRemoveMedication = (index: number) => {
    setFormData({
      ...formData,
      currentMedications: formData.currentMedications.filter((_, i) => i !== index)
    });
  };

  const handleChronicConditionToggle = (condition: string) => {
    const conditions = formData.chronicConditions;
    if (conditions.includes(condition)) {
      setFormData({
        ...formData,
        chronicConditions: conditions.filter(c => c !== condition)
      });
    } else {
      setFormData({
        ...formData,
        chronicConditions: [...conditions, condition]
      });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/patients/medical-info`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        const updatedUser = { 
          name: user?.name || '', 
          email: user?.email || '', 
          ...user, 
          ...formData,
          height: formData.height ? Number(formData.height) : undefined,
          weight: formData.weight ? Number(formData.weight) : undefined,
          role: user?.role || 'patient' 
        };
        dispatch(setCredentials({ user: updatedUser, token: token! }));
        setSuccessMessage(t.messages.updateSuccess);
        setErrorMessage('');
        setShowSuccess(true);
        setEditingSection(null);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        setErrorMessage(data.message || t.messages.updateError);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch {
      setErrorMessage(t.messages.updateError);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    editingSection,
    setEditingSection,
    loading,
    showSuccess,
    successMessage,
    errorMessage,
    newAllergy,
    setNewAllergy,
    newMedication,
    setNewMedication,
    handleAddAllergy,
    handleRemoveAllergy,
    handleAddMedication,
    handleRemoveMedication,
    handleChronicConditionToggle,
    handleSubmit
  };
};
