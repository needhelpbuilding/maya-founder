'use client';

import React from 'react';
import { Search, Bell, Shield, Calendar, RefreshCw } from 'lucide-react';
import { useFounder } from '@/lib/FounderContext';

interface TopNavbarProps {
  title: string;
  subtitle?: string;
  actionButton?: React.ReactNode;
}

export default function TopNavbar({ title, subtitle, actionButton }: TopNavbarProps) {
  const { dateRange, setDateRange, runManualHealthCheck, services } = useFounder();

  const degradedServices = services.filter(s => s.status === 'Degraded' || s.status === 'Down');

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-8 py-4 bg-white border-b border-orange-100 shadow-xs">
      {/* Title & Context */}
      <div>
        <h1 className="text-xl font-bold text-[#245BFF] tracking-tight">{title}</h1>
        {subtitle && (
          <p className="text-xs text-slate-500 font-medium mt-0.5">{subtitle}</p>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Date Filter selector */}
        <div className="flex items-center p-1 rounded-xl bg-orange-50/70 border border-orange-200/80 text-xs font-semibold text-slate-800">
          <button
            onClick={() => setDateRange('today')}
            className={`px-3 py-1 rounded-lg transition-all ${
              dateRange === 'today'
                ? 'bg-white text-[#245BFF] shadow-xs font-bold'
                : 'text-slate-600 hover:text-[#245BFF]'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setDateRange('7d')}
            className={`px-3 py-1 rounded-lg transition-all ${
              dateRange === '7d'
                ? 'bg-white text-[#245BFF] shadow-xs font-bold'
                : 'text-slate-600 hover:text-[#245BFF]'
            }`}
          >
            7D
          </button>
          <button
            onClick={() => setDateRange('30d')}
            className={`px-3 py-1 rounded-lg transition-all ${
              dateRange === '30d'
                ? 'bg-white text-[#245BFF] shadow-xs font-bold'
                : 'text-slate-600 hover:text-[#245BFF]'
            }`}
          >
            30D
          </button>
          <button
            onClick={() => setDateRange('90d')}
            className={`px-3 py-1 rounded-lg transition-all ${
              dateRange === '90d'
                ? 'bg-white text-[#245BFF] shadow-xs font-bold'
                : 'text-slate-600 hover:text-[#245BFF]'
            }`}
          >
            90D
          </button>
        </div>

        {/* Global Operational Status Pill */}
        <div
          className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 text-xs font-medium ${
            degradedServices.length > 0
              ? 'bg-amber-50 text-amber-800 border-amber-200'
              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              degradedServices.length > 0 ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'
            }`}
          />
          <span>
            {degradedServices.length > 0
              ? `${degradedServices.length} Service Degraded`
              : 'All Systems Operational'}
          </span>
        </div>

        {/* Action Button if provided */}
        {actionButton}
      </div>
    </header>
  );
}
