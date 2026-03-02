import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ManagerFormData } from '../../../add/types';

export const useEditManager = () => {
  const router = useRouter();
  const params = useParams();
  const managerId = params.id as string;

  const [formData, setFormData] = useState<Partial<ManagerFormData>>({
    fullName: '',
    email: '',
    phone: '',
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
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fetchLoading, setFetchLoading] = useState(true);

  const fetchManager = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/owner/managers/${managerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setFormData({
          fullName: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          nationalId: data.nationalId || '',
          address: data.address || '',
          clinicId: data.clinicId?._id || data.clinicId || '',
          permissions: data.permissions || {
            manageDoctors: true,
            manageAppointments: true,
            viewReports: true,
            managePricesServices: true,
            managePayments: true,
          },
          isActive: data.isActive !== undefined ? data.isActive : true,
        });
      }
    } catch (error) {
      console.error('Error fetching manager:', error);
    } finally {
      setFetchLoading(false);
    }
  }, [managerId]);

  useEffect(() => {
    fetchManager();
  }, [fetchManager]);

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
        nationalId: formData.nationalId,
        address: formData.address,
        clinicId: formData.clinicId,
        permissions: formData.permissions,
        isActive: formData.isActive,
      };

      const response = await fetch(`http://localhost:5000/api/owner/managers/${managerId}`, {
        method: 'PUT',
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
        setError(data.message || 'Failed to update manager');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { formData, setFormData, loading, error, handleSubmit, fetchLoading };
};
