'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Settings, 
  PanelLeftClose, 
  PanelLeftOpen, 
  LogOut,
  Globe,
  Menu
} from 'lucide-react';

export default function BackOfficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Home Page', href: '/back-office' },
    { icon: Menu, label: 'Header Menu', href: '/back-office/header-menu' },
    { icon: LayoutDashboard, label: 'Footer', href: '/back-office/footer' },
    { icon: Globe, label: 'Lihat Website', href: '/' },
    { icon: Settings, label: 'Pengaturan', href: '#' },
  ];

  return (
    <div className="min-h-screen bg-brand-white flex font-sans text-brand-charcoal">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarCollapsed ? 'w-20' : 'w-64'
        } bg-brand-sage border-r border-brand-sage transition-all duration-300 flex flex-col`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/20">
          {!isSidebarCollapsed && (
            <span className="font-serif font-bold text-xl tracking-tight text-white">
              SHAZ <span className="text-white/80 font-sans font-normal italic">Admin</span>
            </span>
          )}
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-2 rounded-lg hover:bg-white/10 text-white/80 transition-colors mx-auto"
          >
            {isSidebarCollapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-brand-forest text-white font-medium shadow-sm' 
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
                title={isSidebarCollapsed ? item.label : undefined}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!isSidebarCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/20">
          <button className="flex items-center gap-3 px-3 py-3 rounded-lg text-white/90 hover:bg-red-500 hover:text-white transition-colors w-full">
            <LogOut className="w-5 h-5 shrink-0" />
            {!isSidebarCollapsed && <span>Keluar</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-white border-b border-brand-beige flex items-center justify-between px-8 shadow-sm z-10">
          <h2 className="text-lg font-serif font-medium text-brand-charcoal">
            Pengaturan Konten
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-brand-charcoal">Admin User</p>
                <p className="text-xs text-brand-charcoal/60">admin@shazaestheticbali.com</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-brand-forest text-white flex items-center justify-center font-bold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 overflow-auto">
          {children}
        </main>

        {/* Footer */}
        <footer className="py-4 px-8 border-t border-brand-beige bg-white text-center sm:text-left text-sm text-brand-charcoal/50">
          &copy; {new Date().getFullYear()} SHAZ Aesthetic Clinic. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
