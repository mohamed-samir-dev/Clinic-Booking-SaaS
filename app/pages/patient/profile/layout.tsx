import Sidebar from './components/Sidebar';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto h-[calc(100vh-73px)]">
        {children}
      </main>
    </div>
  );
}
