'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: '대시보드', href: '/admin', icon: '/icons/대시보드.png' },
  { name: '혜택 관리', href: '/admin/benefits', icon: '/icons/혜택3.png' },
  { name: '채용공고', href: '/admin/jobs', icon: '/icons/사람들2.png' },
  { name: '지원서 관리', href: '/admin/applications', icon: '/icons/신청서.png' },
  { name: '매장 관리', href: '/admin/stores', icon: '/icons/상점1.png' },
  { name: 'OG 설정', href: '/admin/og-settings', icon: '/icons/설정.png' },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-dark text-white flex flex-col">
      <div className="h-16 flex items-center justify-center border-b border-gray-700">
        <h1 className="text-xl font-black text-brand">세모폰 관리</h1>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? 'bg-brand text-dark font-bold' : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={20}
                  height={20}
                  className={`w-5 h-5 object-contain ${isActive ? 'brightness-0' : 'brightness-0 invert'}`}
                />
              </div>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
