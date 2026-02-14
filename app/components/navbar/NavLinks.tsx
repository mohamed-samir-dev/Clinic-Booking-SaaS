import Link from 'next/link';
import { NAV_ITEMS } from './constants';

interface NavLinksProps {
  pathname: string;
}

export default function NavLinks({ pathname }: NavLinksProps) {
  return (
    <div className="hidden xl:flex items-center gap-2">
      {NAV_ITEMS.map((item) => {
        const href = item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`;
        const isActive = pathname === href;
        return (
          <Link
            key={item}
            href={href}
            className={`px-5 py-2 rounded-lg transition-all font-medium ${
              isActive ? 'text-teal-600' : 'text-gray-700 hover:text-teal-700'
            }`}
          >
            {item}
          </Link>
        );
      })}
    </div>
  );
}
