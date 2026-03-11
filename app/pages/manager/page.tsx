'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ManagerPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/pages/manager/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400"></div>
    </div>
  );
}
