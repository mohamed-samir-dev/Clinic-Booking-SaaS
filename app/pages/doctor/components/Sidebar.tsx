'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/app/store/slices/authSlice';
import { useEffect, useState } from 'react';
import { useTheme } from '@/app/contexts/ThemeContext';
import { 
  LayoutDashboard, 
  Calendar, 
  UserPlus, 
  User,
  LogOut,
  Stethoscope,
  ChevronRight,
  Moon,
  Sun,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useTheme();
  const user = useSelector((state: { auth: { user: { name?: string | { en: string; ar: string }; clinicId?: string | { _id: string; id: string }; specialty?: { en: string; ar: string }; profileImage?: string } } }) => state.auth.user);
  const [clinicData, setClinicData] = useState({ name: { en: 'MediCare', ar: 'ميديكير' }, logo: '' });
  const [loading, setLoading] = useState(true);
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0);
  const [doctorImage, setDoctorImage] = useState('');

  useEffect(() => {
    const fetchClinicData = async () => {
      if (!user?.clinicId) {
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const clinicId = typeof user.clinicId === 'object' ? (user.clinicId as { _id?: string; id?: string })?._id || (user.clinicId as { _id?: string; id?: string })?.id : user.clinicId;
        
        if (!clinicId) {
          setLoading(false);
          return;
        }
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clinics/${clinicId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setClinicData({ name: data.name || { en: 'MediCare', ar: 'ميديكير' }, logo: data.logo || '' });
        }
      } catch (error) {
        console.error('Error fetching clinic data:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchPendingRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/appointments/doctor-stats`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const text = await response.text();
          try {
            const data = JSON.parse(text);
            setPendingRequestsCount(data.pendingRequests || 0);
          } catch {
            console.error('Invalid JSON response');
          }
        }
      } catch (error) {
        console.error('Error fetching pending requests:', error);
      }
    };

    const fetchDoctorProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/doctors/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setDoctorImage(data.photoUrl || '');
        }
      } catch (error) {
        console.error('Error fetching doctor profile:', error);
      }
    };

    fetchClinicData();
    fetchPendingRequests();
    fetchDoctorProfile();
  }, [user?.clinicId]);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/pages/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/pages/doctor' },
    { icon: Calendar, label: 'My Schedule', href: '/pages/doctor/schedule' },
    { icon: UserPlus, label: 'Patient Requests', href: '/pages/doctor/requests', badge: pendingRequestsCount },
    { icon: User, label: 'Profile', href: '/pages/doctor/profile' },
  ];

  const getInitials = () => {
    if (!user?.name) return 'DR';
    const name = typeof user.name === 'string' ? user.name : ((user.name as { en: string; ar: string }).en || (user.name as { en: string; ar: string }).ar || 'Doctor');
    const names = name.split(' ');
    return names.length > 1 ? `${names[0][0]}${names[1][0]}` : names[0][0];
  };

  if (!user) return null;

  return (
    <>
      {/* Overlay للشاشات الصغيرة */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 xl:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed xl:relative inset-y-0 left-0 z-50
        w-[85vw] max-w-[280px] xl:w-[280px] h-screen p-2 sm:p-3
        transform transition-all duration-300 ease-in-out
        xl:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'}
        ${theme === 'dark' 
          ? 'bg-linear-to-br from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-linear-to-br from-teal-50 via-cyan-50 to-emerald-50'
        }
      `}>
        <aside className={`h-full rounded-2xl shadow-xl flex flex-col overflow-hidden border transition-colors ${
          theme === 'dark'
            ? 'bg-gray-800 shadow-gray-900/50 border-gray-700'
            : 'bg-white shadow-teal-200/50 border-teal-100/50'
        }`}>
          {/* زر الإغلاق للشاشات الصغيرة */}
          <button
            onClick={onClose}
            className={`xl:hidden absolute top-3 right-3 z-10 p-1 rounded-lg shadow-md ${
              theme === 'dark' ? 'bg-gray-700/80' : 'bg-white/80'
            }`}
          >
            <X className={`w-4 h-4 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`} />
          </button>

          {/* Logo Header */}
          <div className="p-3 sm:p-4 bg-linear-to-br from-teal-500 via-teal-600 to-cyan-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-white/20 backdrop-blur-xl flex items-center justify-center border border-white/30 overflow-hidden">
                  {clinicData.logo ? (
                    <Image src={clinicData.logo} alt="Clinic Logo" width={48} height={48} className="w-full h-full object-cover" />
                  ) : (
                    <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2.5} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-sm sm:text-base font-bold text-white truncate">
                    {loading ? 'MediCare' : clinicData.name.en}
                  </h1>
                  <p className="text-[10px] sm:text-xs text-teal-100 font-medium">Doctor Dashboard</p>
                </div>
              </div>
            </div>
          </div>

          {/* Doctor Profile */}
          <div className={`px-2 sm:px-3 py-2.5 sm:py-3 border-b ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
          }`}>
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-linear-to-br from-teal-500 via-teal-600 to-cyan-600 flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-md shadow-teal-300/50 overflow-hidden">
                  {doctorImage ? (
                    <Image src={doctorImage} alt="Doctor" width={48} height={48} className="w-full h-full object-cover" />
                  ) : (
                    getInitials()
                  )}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`text-xs sm:text-sm font-bold truncate ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{typeof user?.name === 'string' ? user.name : ((user?.name as { en: string; ar: string })?.en || (user?.name as { en: string; ar: string })?.ar || 'Doctor')}</h3>
                <p className={`text-[10px] sm:text-xs truncate font-medium ${
                  theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
                }`}>{user?.specialty?.en || 'Specialist'}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 sm:px-3 py-3 sm:py-4 overflow-y-auto">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link href={item.href} onClick={onClose}>
                      <div className={`group flex items-center gap-2 sm:gap-3 px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-lg sm:rounded-xl transition-all duration-200 ${
                          isActive
                            ? 'bg-linear-to-r from-teal-500 via-teal-600 to-cyan-600 text-white shadow-md shadow-teal-300/50'
                            : theme === 'dark'
                              ? 'text-gray-300 hover:bg-gray-700'
                              : 'text-gray-600 hover:bg-linear-to-r hover:from-teal-50 hover:to-cyan-50'
                        }`}
                      >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                        <span className="flex-1 text-xs sm:text-sm font-bold">{item.label}</span>
                        {item.badge ? (
                          <span className={`text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-full ${
                            isActive ? 'bg-white/30 text-white' : 'bg-linear-to-r from-teal-500 to-cyan-600 text-white'
                          }`}>
                            {item.badge}
                          </span>
                        ) : (
                          <ChevronRight className={`w-3 h-3 sm:w-3.5 sm:h-3.5 transition-opacity ${
                            isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                          }`} />
                        )}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Bottom Actions */}
          <div className={`p-2 sm:p-3 space-y-1.5 sm:space-y-2 border-t ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
          }`}>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button 
                onClick={toggleTheme}
                className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  theme === 'dark'
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {theme === 'dark' ? (
                  <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.5} />
                ) : (
                  <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.5} />
                )}
                <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
              </button>
              <button className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                theme === 'dark'
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}>
                <span className="text-xs sm:text-sm font-bold">EN</span>
              </button>
            </div>
            <button
              onClick={handleLogout}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 w-full px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                theme === 'dark'
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.5} />
              <span>Logout</span>
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}
