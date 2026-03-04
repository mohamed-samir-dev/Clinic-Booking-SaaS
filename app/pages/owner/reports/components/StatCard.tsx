'use client';

import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  href?: string;
}

export const StatCard = ({ title, value, icon: Icon, color, href }: StatCardProps) => {
  const displayValue = value ?? 0;
  
  const content = (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 hover:border-teal-500 transition-all cursor-pointer">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-2">{title}</p>
          <p className="text-3xl font-bold text-white">{displayValue}</p>
        </div>
        <div className={`w-14 h-14 rounded-lg ${color} flex items-center justify-center`}>
          <Icon size={28} className="text-white" />
        </div>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
};
