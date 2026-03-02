'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Bell, LogOut } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface OwnerData {
  name: string;
  profileImage: string | null;
}

export default function Navbar() {
  const [ownerData, setOwnerData] = useState<OwnerData>({ name: '', profileImage: null });
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/owner/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setOwnerData(data);
        }
      } catch (error) {
      }
    };

    fetchOwnerData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/pages/login');
  };

  return (
    <nav className="bg-gray-800 h-16 fixed top-0 right-0 left-64 z-10">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-300 hover:bg-gray-700 rounded-lg">
            <Bell size={22} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-gray-700 relative" ref={dropdownRef}>
            <div className="text-right">
              <p className="text-sm font-semibold text-white">{ownerData.name || 'Loading...'}</p>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden hover:ring-2 hover:ring-teal-500 transition-all"
            >
              {ownerData.profileImage ? (
                <Image
                  src={ownerData.profileImage}
                  alt={ownerData.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-teal-600 text-white font-semibold">
                  {ownerData.name.charAt(0).toUpperCase()}
                </div>
              )}
            </button>
            {showDropdown && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-1">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
