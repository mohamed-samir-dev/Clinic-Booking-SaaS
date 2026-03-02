import { User } from 'lucide-react';

interface FormHeaderProps {
  title: string;
  subtitle: string;
}

export const FormHeader = ({ title, subtitle }: FormHeaderProps) => (
  <div className="bg-linear-to-r from-teal-600 to-cyan-600 p-6 text-white">
    <div className="flex items-center gap-4">
      <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
        <User size={28} />
      </div>
      <div>
        <h1 className="text-2xl font-bold mb-1">{title}</h1>
        <p className="text-teal-50">{subtitle}</p>
      </div>
    </div>
  </div>
);
