import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DoctorProfile, ClinicWorkingHours, EditData } from '../types';

interface RootState {
  auth: {
    user: { id?: string } | null;
    token: string | null;
  };
}

export const useDoctorProfile = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [profile, setProfile] = useState<DoctorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [clinicHours, setClinicHours] = useState<ClinicWorkingHours>({});

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;
      
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/doctors/profile`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!response.ok) throw new Error('Failed to fetch profile');
        
        const data = await response.json();
        setProfile(data);

        if (data.clinicId) {
          const clinicId = typeof data.clinicId === 'string' ? data.clinicId : data.clinicId._id;
          const clinicRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clinics/${clinicId}`);
          if (clinicRes.ok) {
            const clinicData = await clinicRes.json();
            setClinicHours(clinicData.workingHours || {});
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  return { profile, setProfile, loading, clinicHours, token };
};

export const useProfileEdit = (profile: DoctorProfile | null) => {
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState<EditData>({
    firstName: '',
    lastName: '',
    email: '',
    fees: 0,
    consultationDuration: 20,
    phone: '',
    location: { address: '', city: '' },
    password: '',
    availability: []
  });

  useEffect(() => {
    if (profile) {
      setEditData({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        fees: profile.fees,
        consultationDuration: profile.consultationDuration,
        phone: profile.phone || '',
        location: { address: profile.location?.address || '', city: profile.location?.city || '' },
        password: '',
        availability: profile.availability || []
      });
    }
  }, [profile]);

  return { editMode, setEditMode, editData, setEditData };
};
