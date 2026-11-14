'use client';

import React, { useState } from 'react';
import {
  CalendarDays,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  FileSpreadsheet,
  IndianRupee,
  User,
} from 'lucide-react';
import TopNavbar from '@/components/TopNavbar';
import { useFounder } from '@/lib/FounderContext';

export default function FounderAppointmentsPage() {
  const { appointments } = useFounder();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');

  const filteredAppointments = appointments.filter((a) => {
    const matchesSearch =
      a.booking_ref.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.patient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.doctor_name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || a.appointment_status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || a.payment_status === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  return (
    <div className="min-h-screen bg-[#fcfaff] pb-16">
      <TopNavbar
        title="Appointment Oversight & Clinical Booking Logs"
        subtitle="Live monitoring of hospital OPD flow, completed consultations, and cancellations"
        actionButton={
          <button
            onClick={() => alert('Exporting appointments register (CSV)...')}
            className="px-4 py-2 rounded-xl bg-[#245BFF] hover:bg-[#0E36B4] text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <FileSpreadsheet size={14} />
            Export Register CSV
          </button>
        }
      />

      <div className="px-8 py-6 space-y-6 max-w-[1600px] mx-auto">
        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-xs">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" size={16} />
            <input
              type="text"
              placeholder="Search by Booking Ref (e.g. APT-9482), Patient or Doctor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50/40 border border-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-50/40 border border-slate-100 text-xs font-medium text-[#0E36B4] focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="all">All Appointment Statuses</option>
              <option value="Completed">Completed</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Checked In">Checked In</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-50/40 border border-slate-100 text-xs font-medium text-[#0E36B4] focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="all">All Payment Statuses</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Appointment Register Table */}
        <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[#64748B] uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Ref #</th>
                  <th className="pb-3 font-semibold">Patient</th>
                  <th className="pb-3 font-semibold">Attending Doctor</th>
                  <th className="pb-3 font-semibold">Date & Slot</th>
                  <th className="pb-3 font-semibold">Fee & Payment</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Booked At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAppointments.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50/20 transition-colors">
                    <td className="py-3.5 font-mono font-bold text-[#0E36B4]">
                      {a.booking_ref}
                    </td>
                    <td className="py-3.5">
                      <p className="font-bold text-[#0E36B4]">{a.patient_name}</p>
                      <p className="text-[11px] text-[#64748B] font-mono">{a.patient_phone}</p>
                    </td>
                    <td className="py-3.5">
                      <p className="font-semibold text-[#0E36B4]">{a.doctor_name}</p>
                      <p className="text-[11px] text-[#245BFF]">{a.department_name}</p>
                    </td>
                    <td className="py-3.5">
                      <p className="font-medium text-[#0E36B4]">{a.appointment_date}</p>
                      <p className="text-[11px] text-[#64748B] font-mono">{a.time_slot}</p>
                    </td>
                    <td className="py-3.5">
                      <p className="font-bold text-[#0E36B4]">₹{a.consultation_fee}</p>
                      <span
                        className={`inline-block px-1.5 py-0.2 rounded text-[10px] font-semibold ${
                          a.payment_status === 'Paid'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {a.payment_status} ({a.payment_method || 'Desk'})
                      </span>
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`badge-status ${
                          a.appointment_status === 'Completed'
                            ? 'badge-operational'
                            : a.appointment_status === 'Cancelled'
                            ? 'badge-down'
                            : 'badge-degraded'
                        }`}
                      >
                        {a.appointment_status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right text-[11px] text-[#64748B] font-mono">
                      {new Date(a.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
