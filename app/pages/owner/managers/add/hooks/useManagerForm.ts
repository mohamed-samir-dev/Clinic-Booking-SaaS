import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ManagerFormData } from '../types';

export const useManagerForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<ManagerFormData>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    nationalId: '',
    address: '',
    clinicId: '',
    permissions: {
      manageDoctors: true,
      manageAppointments: true,
      viewReports: true,
      managePricesServices: true,
      managePayments: true,
    },
    isActive: true,
    requirePasswordChange: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const payload = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        nationalId: formData.nationalId,
        address: formData.address,
        clinicId: formData.clinicId,
        permissions: formData.permissions,
        isActive: formData.isActive,
        requirePasswordChange: formData.requirePasswordChange,
      };

      const response = await fetch('http://localhost:5000/api/owner/managers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.push('/pages/owner/managers');
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to create manager');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (data: Partial<ManagerFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return { formData, setFormData: updateFormData, loading, error, handleSubmit };
};
