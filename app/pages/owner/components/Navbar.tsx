'use client';
import { useState, useEffect } from 'react';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface OwnerData {
  name: string;
  profileImage: string | null;
}

export default function Navbar() {
  const [ownerData, setOwnerData] = useState<OwnerData>({ name: '', profileImage: null });
  const router = useRouter();

  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/owner/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setOwnerData(data);
        }
      } catch {}
    };
    fetchOwnerData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/pages/login');
  };

  return (
    <nav className="bg-gray-800 h-16 fixed top-0 right-0 left-64 z-10">
      <div className="h-full px-6 flex items-center justify-end">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-semibold text-white">{ownerData.name || 'Loading...'}</p>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
              {ownerData.profileImage ? (
                <Image src={ownerData.profileImage} alt={ownerData.name} width={40} height={40} className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-teal-600 text-white font-semibold">
                  {ownerData.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>
          <button onClick={handleLogout} className="p-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors" title="Logout">
            <LogOut size={22} />
          </button>
        </div>
      </div>
    </nav>
  );
}
