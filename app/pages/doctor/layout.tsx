import Sidebar from './components/Sidebar';

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-linear-to-br from-teal-50 via-cyan-50 to-emerald-50 overflow-hidden">
      <Sidebar />
      <main className="flex-1 h-screen overflow-y-auto p-4">
        <div className="h-full bg-white rounded-3xl shadow-2xl shadow-teal-200/50 border border-teal-100/50 overflow-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
