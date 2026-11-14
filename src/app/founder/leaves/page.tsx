'use client';

import React, { useState } from 'react';
import {
  CalendarOff,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  UserCheck,
  Calendar,
  AlertTriangle,
} from 'lucide-react';
import TopNavbar from '@/components/TopNavbar';
import { useFounder } from '@/lib/FounderContext';

export default function FounderLeavesPage() {
  const { doctorLeaves, updateDoctorLeaveStatus, appointments } = useFounder();
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const filteredLeaves = doctorLeaves.filter((l) =>
    filter === 'all' ? true : l.status === filter
  );

  return (
    <div className="min-h-screen bg-[#fcfaff] pb-16">
      <TopNavbar
        title="Staff Leaves & Availability Governance"
        subtitle="Review faculty leave requests, affected appointments, and operational coverage"
      />

      <div className="px-8 py-6 space-y-6 max-w-[1600px] mx-auto">
        {/* Core Policy Notice */}
        <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/60 text-[#1E293B] text-xs flex items-center gap-3">
          <AlertCircle size={18} className="text-[#245BFF] flex-shrink-0" />
          <span>
            <strong>Operational Rule:</strong> Approved doctor leaves do not automatically cancel or reassign
            appointments. Affected patients are immediately flagged on the Reception Desk dashboard for warm,
            personalized rescheduling or consultation reassignment.
          </span>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          {(['all', 'pending', 'approved', 'rejected'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                filter === tab
                  ? 'bg-[#245BFF] text-white shadow-xs'
                  : 'bg-white text-[#64748B] border border-slate-100 hover:text-[#0E36B4]'
              }`}
            >
              {tab} Requests
            </button>
          ))}
        </div>

        {/* Leave Requests Cards */}
        <div className="space-y-4">
          {filteredLeaves.map((leave) => {
            const affectedList = appointments.filter(
              (a) =>
                a.doctor_name === leave.doctor_name &&
                a.appointment_date >= leave.start_date &&
                a.appointment_date <= leave.end_date
            );

            return (
              <div
                key={leave.id}
                className="p-5 rounded-2xl bg-white border border-slate-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        leave.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : leave.status === 'rejected'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {leave.status}
                    </span>
                    <h3 className="font-bold text-sm text-[#0E36B4]">{leave.doctor_name}</h3>
                    <span className="text-xs text-[#64748B]">• {leave.department_name}</span>
                  </div>

                  <p className="text-xs text-[#1E293B]">
                    <span className="font-semibold">Reason:</span> {leave.reason} ({leave.leave_type})
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#64748B] font-medium pt-1">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} />
                      Duration: {leave.start_date} to {leave.end_date}
                    </span>
                    <span className="flex items-center gap-1.5 text-amber-700 font-semibold">
                      <AlertTriangle size={13} />
                      Affected Appointments: {affectedList.length} Patient(s)
                    </span>
                  </div>
                </div>

                {/* Actions for Founder */}
                {leave.status === 'pending' && (
                  <div className="flex items-center gap-2.5 flex-shrink-0">
                    <button
                      onClick={() => updateDoctorLeaveStatus(leave.id, 'approved')}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                    >
                      <CheckCircle2 size={14} /> Approve Leave
                    </button>
                    <button
                      onClick={() => updateDoctorLeaveStatus(leave.id, 'rejected')}
                      className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <XCircle size={14} /> Reject
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
