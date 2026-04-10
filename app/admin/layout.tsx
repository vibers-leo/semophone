'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Settings,
  LogOut,
  Menu,
} from 'lucide-react';
import { AuthProvider } from '@/contexts/AuthContext';

const MENU_ITEMS = [
  { id: 'dashboard', label: '대시보드', icon: LayoutDashboard },
  { id: 'inquiries', label: '문의관리', icon: MessageSquare },
  { id: 'applications', label: '지원서관리', icon: FileText },
  { id: 'settings', label: '사이트설정', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login' || pathname === '/admin/forgot-password';
  const [user, setUser] = useState<{ email: string; name: string | null } | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (isLoginPage) { setLoading(false); return; }
    fetch('/api/auth/me')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.user) {
          setUser({ email: data.user.email, name: data.user.name });
        } else {
          router.push('/admin/login');
        }
      })
      .catch(() => router.push('/admin/login'))
      .finally(() => setLoading(false));
  }, [isLoginPage, router]);

  if (isLoginPage) return <AuthProvider>{children}</AuthProvider>;
  if (loading) return <div className="flex h-screen items-center justify-center"><div className="w-6 h-6 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin" /></div>;

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <aside className={`fixed inset-y-0 left-0 z-40 w-56 bg-white border-r border-gray-100 flex flex-col transition-transform duration-200
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:z-auto`}>
        <div className="p-5 border-b border-gray-100 flex items-center gap-2">
          <Image src="/landing/세모폰_logo_header.png" alt="세모폰" width={28} height={28} className="object-contain" />
          <span className="font-bold text-sm text-gray-800">세모폰 어드민</span>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          {MENU_ITEMS.map(({ id, label, icon: Icon }) => {
            const isActive = (id === 'dashboard' && !new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '').get('tab'))
              || new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '').get('tab') === id;
            return (
              <Link
                key={id}
                href={id === 'dashboard' ? '/admin' : `/admin?tab=${id}`}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors
                  ${isActive ? 'bg-gray-100 text-gray-900 font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-gray-100">
          <div className="px-3 py-2 text-xs text-gray-400 truncate">{user?.email}</div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors w-full"
          >
            <LogOut size={16} />
            로그아웃
          </button>
        </div>
      </aside>

      <div className="fixed top-0 left-0 right-0 h-12 bg-white border-b border-gray-100 flex items-center px-4 gap-3 z-20 md:hidden">
        <button onClick={() => setMobileOpen(true)} className="text-gray-600">
          <Menu size={20} />
        </button>
        <span className="font-bold text-sm text-gray-800">세모폰 어드민</span>
      </div>

      <main className="flex-1 overflow-y-auto pt-12 md:pt-0">
        {children}
      </main>
    </div>
  );
}
