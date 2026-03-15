'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Doctor } from '../../../types';
import DoctorProfileCard from './components/DoctorProfileCard';
import DoctorTabs from './components/DoctorTabs';
import LoadingSpinner from './components/LoadingSpinner';
import { useTheme } from '../../../contexts/ThemeContext';

export default function DoctorProfilePage() {
  const params = useParams();
  const { theme } = useTheme();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/doctors/${params.id}`);
        if (!response.ok) {
          setDoctor(null);
          return;
        }
        const data = await response.json();
        setDoctor(data.doctor || data);
      } catch {
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchDoctor();
    }
  }, [params.id]);

  if (loading) return <LoadingSpinner />;
  if (!doctor) return <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>Doctor not found</div>;

  return (
    <div className={`min-h-screen py-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="w-full px-4 space-y-6">
        <DoctorProfileCard doctor={doctor} />
        <DoctorTabs doctor={doctor} />
      </div>
    </div>
  );
}
