'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Users,
  CalendarCheck,
  Clock,
  BedDouble,
  UserCheck,
  UserX,
  IndianRupee,
  AlertCircle,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';
import TopNavbar from '@/components/TopNavbar';
import { useFounder } from '@/lib/FounderContext';

export default function FounderOverviewPage() {
  const {
    doctors,
    patients,
    appointments,
    doctorLeaves,
    admissions,
    payments,
    services,
    incidents,
    auditLogs,
    dateRange,
  } = useFounder();

  // Metrics calculation
  const totalPatients = patients.length;
  const newPatientsToday = patients.filter(p => p.created_at.startsWith('2026-11-14')).length;
  
  const todayAppointments = appointments.filter(a => a.appointment_date === '2026-11-14');
  const completedAppointments = todayAppointments.filter(a => a.appointment_status === 'Completed').length;
  const pendingAppointments = todayAppointments.filter(a => a.appointment_status === 'Confirmed' || a.appointment_status === 'Pending').length;

  const currentAdmissions = admissions.filter(a => a.admission_status === 'Admitted').length;
  
  const activeLeaves = doctorLeaves.filter(l => l.status === 'approved');
  const availableDoctors = doctors.filter(d => d.is_available_today).length;
  const doctorsOnLeave = activeLeaves.length;

  const revenueToday = payments
    .filter(p => p.payment_date.startsWith('2026-11-14') && p.payment_status === 'Completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingPayments = appointments
    .filter(a => a.payment_status === 'Pending')
    .reduce((sum, a) => sum + a.consultation_fee, 0);

  const degradedServices = services.filter(s => s.status === 'Degraded' || s.status === 'Down');

  return (
    <div className="min-h-screen bg-[#fcfaff] pb-16">
      <TopNavbar
        title="Executive Control Centre"
        subtitle="Real-time hospital performance, clinical occupancy & infrastructure telemetry"
      />

      <div className="px-8 py-6 space-y-6 max-w-[1600px] mx-auto">
        {/* Banner Alert if any critical infrastructure or leave bottleneck */}
        {degradedServices.length > 0 && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                <AlertTriangle size={20} />
              </div>
              <div>
                <p className="text-sm font-bold">
                  Infrastructure Alert: {degradedServices.length} Service experiencing degraded performance
                </p>
                <p className="text-xs text-amber-700">
                  {degradedServices.map(s => s.service_name).join(', ')} — automatic telemetry monitoring is active.
                </p>
              </div>
            </div>
            <Link
              href="/founder/api-health"
              className="px-4 py-2 rounded-xl bg-amber-800 text-white text-xs font-semibold hover:bg-amber-900 transition-colors flex items-center gap-1.5"
            >
              Inspect Telemetry <ArrowUpRight size={14} />
            </Link>
          </div>
        )}

        {/* 10 Key Operational Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {/* 1. Total Patients */}
          <div className="p-4 rounded-2xl bg-white border border-purple-100/80 shadow-xs hover:border-purple-200 transition-all">
            <div className="flex items-center justify-between text-[#806b8c] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Patients</span>
              <div className="p-1.5 rounded-lg bg-purple-50 text-purple-700">
                <Users size={16} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#170526]">{totalPatients}</span>
              <span className="text-xs font-semibold text-emerald-600 flex items-center">
                +12% <TrendingUp size={12} className="ml-0.5" />
              </span>
            </div>
            <p className="text-[11px] text-[#806b8c] mt-1 font-medium">Directory size across all wards</p>
          </div>

          {/* 2. New Patients Today */}
          <div className="p-4 rounded-2xl bg-white border border-purple-100/80 shadow-xs hover:border-purple-200 transition-all">
            <div className="flex items-center justify-between text-[#806b8c] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">New Today</span>
              <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700">
                <UserCheck size={16} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#170526]">{newPatientsToday}</span>
              <span className="text-xs text-[#806b8c] font-medium">Registered OPD/IPD</span>
            </div>
            <p className="text-[11px] text-emerald-600 mt-1 font-semibold">Active onboarding</p>
          </div>

          {/* 3. Today's Appointments */}
          <div className="p-4 rounded-2xl bg-white border border-purple-100/80 shadow-xs hover:border-purple-200 transition-all">
            <div className="flex items-center justify-between text-[#806b8c] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Appointments</span>
              <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700">
                <CalendarCheck size={16} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#170526]">{todayAppointments.length}</span>
              <span className="text-xs text-blue-600 font-medium">Booked for today</span>
            </div>
            <p className="text-[11px] text-[#806b8c] mt-1 font-medium">{pendingAppointments} awaiting action</p>
          </div>

          {/* 4. Completed Appointments */}
          <div className="p-4 rounded-2xl bg-white border border-purple-100/80 shadow-xs hover:border-purple-200 transition-all">
            <div className="flex items-center justify-between text-[#806b8c] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Consulted</span>
              <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                <CheckCircle2 size={16} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-emerald-700">{completedAppointments}</span>
              <span className="text-xs text-emerald-600 font-semibold">Completed</span>
            </div>
            <p className="text-[11px] text-[#806b8c] mt-1 font-medium">Out of {todayAppointments.length} total</p>
          </div>

          {/* 5. Pending Appointments */}
          <div className="p-4 rounded-2xl bg-white border border-purple-100/80 shadow-xs hover:border-purple-200 transition-all">
            <div className="flex items-center justify-between text-[#806b8c] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Queue Pending</span>
              <div className="p-1.5 rounded-lg bg-amber-50 text-amber-700">
                <Clock size={16} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-amber-700">{pendingAppointments}</span>
              <span className="text-xs text-amber-600 font-medium">In Waiting / Checked-in</span>
            </div>
            <p className="text-[11px] text-[#806b8c] mt-1 font-medium">Reception desk triage active</p>
          </div>

          {/* 6. Current Admissions */}
          <div className="p-4 rounded-2xl bg-white border border-purple-100/80 shadow-xs hover:border-purple-200 transition-all">
            <div className="flex items-center justify-between text-[#806b8c] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Inpatients</span>
              <div className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
                <BedDouble size={16} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#170526]">{currentAdmissions}</span>
              <span className="text-xs text-teal-700 font-medium">Admitted</span>
            </div>
            <p className="text-[11px] text-[#806b8c] mt-1 font-medium">ICU & Deluxe Wards</p>
          </div>

          {/* 7. Available Doctors */}
          <div className="p-4 rounded-2xl bg-white border border-purple-100/80 shadow-xs hover:border-purple-200 transition-all">
            <div className="flex items-center justify-between text-[#806b8c] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Active Doctors</span>
              <div className="p-1.5 rounded-lg bg-purple-50 text-purple-700">
                <UserCheck size={16} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#170526]">{availableDoctors}</span>
              <span className="text-xs text-[#806b8c] font-medium">of {doctors.length} on duty</span>
            </div>
            <p className="text-[11px] text-emerald-600 mt-1 font-medium">OPD schedules operational</p>
          </div>

          {/* 8. Doctors on Leave */}
          <div className="p-4 rounded-2xl bg-white border border-purple-100/80 shadow-xs hover:border-purple-200 transition-all">
            <div className="flex items-center justify-between text-[#806b8c] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Staff on Leave</span>
              <div className="p-1.5 rounded-lg bg-rose-50 text-rose-700">
                <UserX size={16} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-rose-700">{doctorsOnLeave}</span>
              <span className="text-xs text-rose-600 font-medium">Approved Leaves</span>
            </div>
            <p className="text-[11px] text-[#806b8c] mt-1 font-medium">No auto-cancellation applied</p>
          </div>

          {/* 9. Revenue Collected Today */}
          <div className="p-4 rounded-2xl bg-white border border-purple-100/80 shadow-xs hover:border-purple-200 transition-all">
            <div className="flex items-center justify-between text-[#806b8c] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Revenue Today</span>
              <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                <IndianRupee size={16} />
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xs text-[#806b8c] font-medium">₹</span>
              <span className="text-2xl font-bold text-emerald-700">{revenueToday.toLocaleString('en-IN')}</span>
            </div>
            <p className="text-[11px] text-[#806b8c] mt-1 font-medium">Settled via UPI/Cash/Desk</p>
          </div>

          {/* 10. Outstanding Payments */}
          <div className="p-4 rounded-2xl bg-white border border-purple-100/80 shadow-xs hover:border-purple-200 transition-all">
            <div className="flex items-center justify-between text-[#806b8c] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Pending Dues</span>
              <div className="p-1.5 rounded-lg bg-purple-50 text-purple-700">
                <AlertCircle size={16} />
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xs text-[#806b8c] font-medium">₹</span>
              <span className="text-2xl font-bold text-[#170526]">{pendingPayments.toLocaleString('en-IN')}</span>
            </div>
            <p className="text-[11px] text-amber-600 mt-1 font-semibold">Triage pending at counter</p>
          </div>
        </div>

        {/* Operational Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Operations & Real-time Doctor Availability */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Doctors & Availability Card */}
            <div className="p-6 rounded-2xl bg-white border border-purple-100/80 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold text-[#170526]">Today&apos;s Clinical Faculty Schedule</h2>
                  <p className="text-xs text-[#806b8c]">Consultants on duty and operational OPD status</p>
                </div>
                <Link
                  href="/founder/doctors"
                  className="text-xs font-semibold text-purple-700 hover:text-purple-900 flex items-center gap-1 hover:underline"
                >
                  Manage Doctors <ChevronRight size={14} />
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-purple-50 text-[#806b8c] uppercase tracking-wider">
                      <th className="pb-3 font-semibold">Doctor</th>
                      <th className="pb-3 font-semibold">Department</th>
                      <th className="pb-3 font-semibold">OPD Timings</th>
                      <th className="pb-3 font-semibold">Fee</th>
                      <th className="pb-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-50">
                    {doctors.slice(0, 5).map((doc) => (
                      <tr key={doc.id} className="hover:bg-purple-50/30 transition-colors">
                        <td className="py-3 font-semibold text-[#170526] flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-xs">
                            {doc.name[4] || 'D'}
                          </div>
                          <span>{doc.name}</span>
                        </td>
                        <td className="py-3 text-[#3b284c] font-medium">{doc.department_name}</td>
                        <td className="py-3 text-[#806b8c] font-mono text-[11px]">{doc.opd_timings}</td>
                        <td className="py-3 font-semibold text-[#170526]">₹{doc.consultation_fee}</td>
                        <td className="py-3">
                          <span
                            className={`badge-status ${
                              doc.is_available_today ? 'badge-operational' : 'badge-down'
                            }`}
                          >
                            {doc.is_available_today ? 'Available' : 'On Leave'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Department Breakdown & Volume */}
            <div className="p-6 rounded-2xl bg-white border border-purple-100/80 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold text-[#170526]">Department-Wise Patient Distribution</h2>
                  <p className="text-xs text-[#806b8c]">Consultation volume split across specialities</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 border border-purple-100">
                  Live Aggregate
                </span>
              </div>

              <div className="space-y-3">
                {[
                  { dept: 'General Medicine & Diabetes', count: 18, pct: 36, color: 'bg-purple-600' },
                  { dept: 'Obstetrics & Gynaecology', count: 14, pct: 28, color: 'bg-indigo-600' },
                  { dept: 'Orthopaedics & Joint Replacement', count: 9, pct: 18, color: 'bg-emerald-600' },
                  { dept: 'Paediatrics & Neonatology', count: 6, pct: 12, color: 'bg-amber-600' },
                  { dept: 'General & Laparoscopic Surgery', count: 3, pct: 6, color: 'bg-rose-600' },
                ].map((item) => (
                  <div key={item.dept} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-[#170526] font-semibold">{item.dept}</span>
                      <span className="text-[#806b8c]">{item.count} patients ({item.pct}%)</span>
                    </div>
                    <div className="h-2 w-full bg-purple-50 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full transition-all duration-500`}
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right 1 Col: Live Audit Trail & Infrastructure Snapshot */}
          <div className="space-y-6">
            {/* Infrastructure Quick Status */}
            <div className="p-6 rounded-2xl bg-white border border-purple-100/80 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold text-[#170526] flex items-center gap-2">
                  <Activity size={18} className="text-purple-600" />
                  Infrastructure Health
                </h2>
                <Link
                  href="/founder/api-health"
                  className="text-xs font-semibold text-purple-700 hover:text-purple-900 flex items-center gap-0.5"
                >
                  Full View <ChevronRight size={14} />
                </Link>
              </div>

              <div className="space-y-3 mt-4">
                {services.slice(0, 4).map((srv) => (
                  <div
                    key={srv.id}
                    className="p-3 rounded-xl bg-purple-50/40 border border-purple-100/60 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-semibold text-[#170526] truncate max-w-[170px]">
                        {srv.service_name}
                      </p>
                      <p className="text-[10px] text-[#806b8c] font-mono mt-0.5">
                        Latency: {srv.response_time_ms}ms
                      </p>
                    </div>
                    <span
                      className={`badge-status ${
                        srv.status === 'Operational'
                          ? 'badge-operational'
                          : srv.status === 'Degraded'
                          ? 'badge-degraded'
                          : 'badge-down'
                      }`}
                    >
                      {srv.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Audit & System Activity Feed */}
            <div className="p-6 rounded-2xl bg-white border border-purple-100/80 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-[#170526] flex items-center gap-2">
                  <ShieldCheck size={18} className="text-purple-600" />
                  Executive Audit Feed
                </h2>
                <Link
                  href="/founder/activity"
                  className="text-xs font-semibold text-purple-700 hover:text-purple-900 flex items-center gap-0.5"
                >
                  Logs <ChevronRight size={14} />
                </Link>
              </div>

              <div className="space-y-3.5">
                {auditLogs.slice(0, 5).map((log) => (
                  <div key={log.id} className="relative pl-5 pb-3 border-l-2 border-purple-100 last:border-l-0">
                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-purple-500" />
                    <p className="text-xs font-semibold text-[#170526] tracking-tight">{log.action}</p>
                    <p className="text-[11px] text-[#806b8c] mt-0.5">
                      By <span className="font-medium text-[#3b284c]">{log.actor_name}</span> ({log.actor_role})
                    </p>
                    <span className="text-[10px] text-[#806b8c] font-mono block mt-1">
                      {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
