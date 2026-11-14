'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  CalendarDays,
  BedDouble,
  Building2,
  CalendarOff,
  IndianRupee,
  TrendingUp,
  Globe,
  Sliders,
  Activity,
  Server,
  Cpu,
  ShieldCheck,
  FileText,
  Settings,
  Lock,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import { useFounder } from '@/lib/FounderContext';

interface NavGroup {
  label: string;
  items: {
    title: string;
    href: string;
    icon: React.ElementType;
    badge?: string;
  }[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: 'OVERVIEW',
    items: [
      {
        title: 'Executive Dashboard',
        href: '/founder/overview',
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: 'HOSPITAL OPERATIONS',
    items: [
      {
        title: 'Patient Directory',
        href: '/founder/patients',
        icon: Users,
      },
      {
        title: 'Doctors & Staff',
        href: '/founder/doctors',
        icon: UserCheck,
      },
      {
        title: 'Appointments',
        href: '/founder/appointments',
        icon: CalendarDays,
      },
      {
        title: 'Admissions & Inpatients',
        href: '/founder/admissions',
        icon: BedDouble,
      },
      {
        title: 'Leaves & Availability',
        href: '/founder/leaves',
        icon: CalendarOff,
      },
    ],
  },
  {
    label: 'FINANCIALS',
    items: [
      {
        title: 'Revenue & Payments',
        href: '/founder/finances',
        icon: IndianRupee,
      },
    ],
  },
  {
    label: 'DIGITAL PRESENCE',
    items: [
      {
        title: 'Website Analytics',
        href: '/founder/website-analytics',
        icon: Globe,
      },
    ],
  },
  {
    label: 'INFRASTRUCTURE',
    items: [
      {
        title: 'API & Service Health',
        href: '/founder/api-health',
        icon: Activity,
      },
      {
        title: 'Integrations Management',
        href: '/founder/integrations',
        icon: Cpu,
      },
      {
        title: 'System Activity & Logs',
        href: '/founder/activity',
        icon: ShieldCheck,
      },
    ],
  },
  {
    label: 'GOVERNANCE & CONTROLS',
    items: [
      {
        title: 'Executive Reports',
        href: '/founder/reports',
        icon: FileText,
      },
      {
        title: 'Settings & Security',
        href: '/founder/settings',
        icon: Settings,
      },
    ],
  },
];

export default function FounderSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { founder, logout } = useFounder();

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out flex flex-col justify-between border-r border-[#1A45C8] bg-[#245BFF] text-white ${
        collapsed ? 'w-20' : 'w-72'
      }`}
    >
      {/* Top Header / Brand Logo */}
      <div className="flex flex-col border-b border-[#1A45C8]">
        <div className="flex items-center justify-between p-4 px-5">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="relative w-10 h-10 flex-shrink-0 rounded-xl bg-white p-1 border border-white/20 shadow-xs flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Maya Hospital"
                width={36}
                height={36}
                className="object-contain"
                priority
              />
            </div>
            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-sm text-white tracking-tight leading-tight truncate">
                  MAYA HOSPITAL
                </span>
                <span className="text-[11px] font-semibold text-orange-200 uppercase tracking-widest leading-none mt-1">
                  Founder Control Centre
                </span>
              </div>
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg text-white hover:text-white hover:bg-[#1A45C8] transition-colors"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Live System Beacon */}
        {!collapsed && (
          <div className="mx-4 mb-3 px-3 py-2 rounded-lg bg-[#1A45C8] border border-[#1437A3] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-white font-medium text-[11px]">Core Systems Normal</span>
            </div>
            <Link
              href="/founder/api-health"
              className="text-[11px] text-orange-200 hover:text-white font-medium hover:underline flex items-center gap-1"
            >
              Telemetry <ExternalLink size={10} />
            </Link>
          </div>
        )}
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {NAV_GROUPS.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-1">
            {!collapsed && (
              <h3 className="px-3 text-[10px] font-bold tracking-wider text-orange-200 uppercase">
                {group.label}
              </h3>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-xs transition-all duration-150 ${
                      isActive
                        ? 'bg-[#FF8A00] text-white font-semibold shadow-xs'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                    title={collapsed ? item.title : undefined}
                  >
                    <Icon
                      size={18}
                      className={`flex-shrink-0 transition-colors ${
                        isActive ? 'text-white' : 'text-orange-200 group-hover:text-white'
                      }`}
                    />
                    {!collapsed && (
                      <span className="truncate flex-1 tracking-tight text-[13px]">
                        {item.title}
                      </span>
                    )}
                    {!collapsed && item.badge && (
                      <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-white/20 text-white border border-white/30">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Founder Profile & Exit */}
      <div className="p-3 border-t border-[#1A45C8] bg-[#1A45C8]">
        <div className="flex items-center justify-between p-2 rounded-xl bg-white/10 border border-white/10">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/30 bg-[#245BFF] flex-shrink-0">
              <Image
                src={founder?.avatar || '/female-mayahospital.jpeg'}
                alt="Founder"
                fill
                className="object-cover"
              />
            </div>
            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-white truncate leading-tight">
                  {founder?.name || 'Hospital Founder'}
                </span>
                <span className="text-[10px] text-orange-200 uppercase tracking-wider leading-tight">
                  Chief Executive / Owner
                </span>
              </div>
            )}
          </div>
          {!collapsed && (
            <button
              onClick={logout}
              className="p-1.5 rounded-lg text-white/80 hover:text-rose-300 hover:bg-rose-950/30 transition-colors"
              title="Sign Out"
            >
              <LogOut size={16} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
