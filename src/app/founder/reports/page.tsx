'use client';

import React from 'react';
import {
  FileText,
  Download,
  Calendar,
  Clock,
  CheckCircle2,
  FileSpreadsheet,
} from 'lucide-react';
import TopNavbar from '@/components/TopNavbar';

export default function ReportsPage() {
  const reports = [
    {
      title: 'Daily Hospital Operational Summary',
      description: 'End-of-day summary of OPD consultations, inpatient census, and revenue collected.',
      period: 'Daily (automated 11:59 PM)',
      format: 'PDF & CSV',
    },
    {
      title: 'Doctor Faculty Availability & Leave Analysis',
      description: 'Audit of consultant leaves, affected appointment volume, and rescheduling turnaround.',
      period: 'Weekly',
      format: 'CSV',
    },
    {
      title: 'Monthly Financial Audit & Revenue Ledger',
      description: 'Breakdown of collections across UPI, Cash desk, and Razorpay payment gateway.',
      period: 'Monthly',
      format: 'PDF & Excel',
    },
    {
      title: 'Infrastructure Telemetry & SLA Report',
      description: 'API health uptime percentage, endpoint latency metrics, and incident resolution times.',
      period: 'Monthly SLA',
      format: 'PDF',
    },
  ];

  return (
    <div className="min-h-screen bg-[#fcfaff] pb-16">
      <TopNavbar
        title="Executive Reports & Data Exports"
        subtitle="Downloadable operational, clinical, and financial governance summaries for hospital leadership"
      />

      <div className="px-8 py-6 space-y-6 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map((r) => (
            <div
              key={r.title}
              className="p-5 rounded-2xl bg-white border border-purple-100 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2.5 text-purple-700 mb-2">
                  <FileText size={18} />
                  <span className="text-xs font-bold uppercase tracking-wider">{r.format}</span>
                </div>
                <h3 className="font-bold text-sm text-[#170526]">{r.title}</h3>
                <p className="text-xs text-[#806b8c] mt-1.5">{r.description}</p>
                <p className="text-[11px] text-purple-900 font-medium mt-3">
                  Frequency: {r.period}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-purple-50 flex items-center justify-between">
                <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 size={12} /> Ready for generation
                </span>
                <button
                  onClick={() => alert(`Generating ${r.title}...`)}
                  className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download size={13} /> Export Report
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
