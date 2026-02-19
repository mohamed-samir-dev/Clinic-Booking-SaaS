'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Doctor } from '../../../types';
import DoctorProfileCard from './components/DoctorProfileCard';
import DoctorTabs from './components/DoctorTabs';
import LoadingSpinner from './components/LoadingSpinner';

export default function DoctorProfilePage() {
  const params = useParams();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/doctors/${params.id}`);
        if (!response.ok) {
          setDoctor(null);
          return;
        }
        const data = await response.json();
        setDoctor(data.doctor || data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchDoctor();
    }
  }, [params.id]);

  if (loading) return <LoadingSpinner />;
  if (!doctor) return <div className="min-h-screen flex items-center justify-center">Doctor not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 space-y-6">
        <DoctorProfileCard doctor={doctor} />
        <DoctorTabs doctor={doctor} />
      </div>
    </div>
  );
}
