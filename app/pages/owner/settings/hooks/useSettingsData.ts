import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { ClinicData, OwnerData } from '../types';

export const useSettingsData = () => {
  const [loading, setLoading] = useState(true);
  const [clinicData, setClinicData] = useState<ClinicData>({
    name: { en: '', ar: '' },
    email: '',
    phone: '',
    address: { en: '', ar: '', city: '', country: '' },
    website: '',
  });
  const [ownerData, setOwnerData] = useState<OwnerData>({
    name: '',
    email: '',
    phone: '',
  });

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const [clinicRes, ownerRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/owner/main-clinic`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/owner/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (clinicRes.ok) {
        const clinic = await clinicRes.json();
        setClinicData({
          name: clinic.name || { en: '', ar: '' },
          email: clinic.email || '',
          phone: clinic.phone || '',
          address: clinic.address || { en: '', ar: '', city: '', country: '' },
          website: clinic.website || '',
        });
      }

      if (ownerRes.ok) {
        const owner = await ownerRes.json();
        setOwnerData({
          name: owner.name || '',
          email: owner.email || '',
          phone: owner.phone || '',
        });
      }
    } catch {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { loading, clinicData, setClinicData, ownerData, setOwnerData, fetchData };
};
