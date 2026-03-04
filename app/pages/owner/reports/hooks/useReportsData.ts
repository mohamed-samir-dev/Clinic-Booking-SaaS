import { useState, useEffect } from 'react';

export interface Manager {
  _id: string;
  id?: string;
  name: { en?: string; ar?: string } | string;
  email: string;
  phone: string;
  clinicId?: { _id: string; name: { en?: string; ar?: string } };
  clinicName?: string;
  isActive: boolean;
  status?: string;
  createdAt: string;
  assignedDate?: string;
}

export interface Clinic {
  _id: string;
  id?: string;
  name: { en?: string; ar?: string } | string;
  location: { en?: string; ar?: string } | string;
  manager?: { en?: string; ar?: string } | string | null;
  managerId?: string | null;
  doctors?: number;
  patients?: number;
  appointments?: number;
  revenue?: number;
  monthlyRevenue?: number;
  isActive: boolean;
  status?: string;
}

interface ManagerApiResponse {
  _id: string;
  name: { en?: string; ar?: string } | string;
  email: string;
  phone: string;
  clinicId?: { _id: string; name: { en?: string; ar?: string } };
  isActive: boolean;
  createdAt: string;
}

interface ClinicApiResponse {
  _id: string;
  name: { en?: string; ar?: string } | string;
  address?: { en?: string; ar?: string };
  isActive: boolean;
  monthlyRevenue?: number;
  doctors?: number;
  patients?: number;
  appointments?: number;
}

export const useReportsData = () => {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        const [managersRes, clinicsRes] = await Promise.all([
          fetch('http://localhost:5000/api/owner/managers', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch('http://localhost:5000/api/owner/clinics', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const managersData = await managersRes.json();
        const clinicsData = await clinicsRes.json();

        // Transform managers data
        const transformedManagers = managersData.map((m: ManagerApiResponse) => ({
          ...m,
          id: m._id,
          clinicName: m.clinicId?.name || '',
          status: m.isActive ? 'active' : 'inactive',
          assignedDate: m.createdAt,
        }));

        // Transform clinics data (exclude parent clinic)
        const PARENT_CLINIC_ID = '69a5a379e12ec0951afb560e';
        const transformedClinics = clinicsData
          .filter((c: ClinicApiResponse) => c._id !== PARENT_CLINIC_ID)
          .map((c: ClinicApiResponse) => ({
            ...c,
            id: c._id,
            location: c.address?.en || c.address?.ar || '',
            revenue: c.monthlyRevenue || 0,
            status: c.isActive ? 'active' : 'inactive',
            doctors: c.doctors || 0,
            patients: c.patients || 0,
            appointments: c.appointments || 0,
          }));

        setManagers(transformedManagers);
        setClinics(transformedClinics);
      } catch (error) {
        console.error('Error fetching reports data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { managers, clinics, loading };
};
