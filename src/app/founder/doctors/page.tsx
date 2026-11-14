'use client';

import React, { useState } from 'react';
import {
  UserCheck,
  Search,
  Calendar,
  Phone,
  Clock,
  IndianRupee,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Briefcase,
} from 'lucide-react';
import TopNavbar from '@/components/TopNavbar';
import { useFounder } from '@/lib/FounderContext';

export default function FounderDoctorsPage() {
  const { doctors, appointments, doctorLeaves } = useFounder();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');

  const departments = Array.from(new Set(doctors.map((d) => d.department_name)));

  const filteredDoctors = doctors.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.degrees.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.department_name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = selectedDept === 'all' || d.department_name === selectedDept;

    return matchesSearch && matchesDept;
  });

  return (
    <div className="min-h-screen bg-[#fcfaff] pb-16">
      <TopNavbar
        title="Doctor & Clinical Faculty Management"
        subtitle="Consultant credentials, daily schedules, OPD consultation fees, and real-time load"
      />

      <div className="px-8 py-6 space-y-6 max-w-[1600px] mx-auto">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-xs">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" size={16} />
            <input
              type="text"
              placeholder="Search by doctor name, degree, or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50/40 border border-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-50/40 border border-slate-100 text-xs font-medium text-[#0E36B4] focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="all">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Doctor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doc) => {
            const docAppointmentsToday = appointments.filter(
              (a) => a.doctor_name === doc.name && a.appointment_date === '2026-11-14'
            );
            const isOnLeave = doctorLeaves.some(
              (l) => l.doctor_name === doc.name && l.status === 'approved'
            );

            return (
              <div
                key={doc.id}
                className="p-5 rounded-2xl bg-white border border-slate-100/80 shadow-xs hover:border-slate-200 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0E36B4] font-bold flex items-center justify-center text-sm border border-slate-200">
                        {doc.name.split(' ')[1]?.[0] || 'D'}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-[#0E36B4]">{doc.name}</h3>
                        <p className="text-[11px] text-[#245BFF] font-medium">{doc.degrees}</p>
                      </div>
                    </div>
                    <span
                      className={`badge-status ${
                        doc.is_available_today && !isOnLeave
                          ? 'badge-operational'
                          : 'badge-down'
                      }`}
                    >
                      {doc.is_available_today && !isOnLeave ? 'Available' : 'On Leave'}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50/30 border border-slate-100/50 space-y-1.5 text-xs">
                    <p className="text-[#1E293B] font-semibold flex items-center gap-2">
                      <Briefcase size={14} className="text-[#245BFF]" />
                      {doc.designation}
                    </p>
                    <p className="text-[#64748B] pl-5">{doc.department_name}</p>
                  </div>

                  <div className="mt-4 space-y-2 text-xs text-[#1E293B]">
                    <div className="flex items-center justify-between">
                      <span className="text-[#64748B] flex items-center gap-1.5">
                        <Clock size={13} /> OPD Timings:
                      </span>
                      <span className="font-mono font-medium">{doc.opd_timings}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[#64748B] flex items-center gap-1.5">
                        <IndianRupee size={13} /> Consultation Fee:
                      </span>
                      <span className="font-bold text-[#0E36B4]">₹{doc.consultation_fee}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[#64748B] flex items-center gap-1.5">
                        <Calendar size={13} /> Today&apos;s Bookings:
                      </span>
                      <span className="font-bold text-[#0E36B4]">
                        {docAppointmentsToday.length} Patients
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#64748B] font-mono">{doc.phone}</span>
                  <span className="text-[11px] font-semibold text-emerald-700">
                    Experience: {doc.experience || '10+ Years'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
