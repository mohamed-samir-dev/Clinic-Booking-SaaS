'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function OwnerPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/pages/owner/dashboard');
  }, [router]);

  return null;
}
