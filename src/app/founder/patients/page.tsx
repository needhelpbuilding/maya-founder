'use client';

import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  ShieldAlert,
  UserCheck,
  Calendar,
  Phone,
  FileSpreadsheet,
  ArrowUpDown,
  Building,
} from 'lucide-react';
import TopNavbar from '@/components/TopNavbar';
import { useFounder } from '@/lib/FounderContext';

export default function FounderPatientsPage() {
  const { patients, admissions, appointments } = useFounder();
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('all');

  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.patient_id_display.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.phone.includes(searchTerm);

    const matchesGender = genderFilter === 'all' || p.gender === genderFilter;

    return matchesSearch && matchesGender;
  });

  return (
    <div className="min-h-screen bg-[#fcfaff] pb-16">
      <TopNavbar
        title="Patient Directory & Demographics"
        subtitle="High-level demographic registry, visit metrics, and admission status"
        actionButton={
          <button
            onClick={() => alert('Exporting authorized patient census report (CSV)...')}
            className="px-4 py-2 rounded-xl bg-[#240b3b] hover:bg-[#170526] text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <FileSpreadsheet size={14} />
            Export Census CSV
          </button>
        }
      />

      <div className="px-8 py-6 space-y-6 max-w-[1600px] mx-auto">
        {/* Compliance & Privacy Alert */}
        <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200/60 text-[#3b284c] text-xs flex items-center gap-3">
          <ShieldAlert size={18} className="text-purple-700 flex-shrink-0" />
          <span>
            <strong>Data Privacy & Clinical Guardrail:</strong> Executive oversight view displays patient
            demographics, visit history, and admission status. Detailed clinical diagnosis notes and sensitive
            prescriptions remain restricted to attending physicians under Supabase RLS.
          </span>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-purple-100 shadow-xs">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#806b8c]" size={16} />
            <input
              type="text"
              placeholder="Search by name, ID (e.g. MH-2026-0042), or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-purple-50/40 border border-purple-100 text-xs focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-1.5 text-xs text-[#806b8c]">
              <Filter size={14} />
              <span>Gender:</span>
            </div>
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-purple-50/40 border border-purple-100 text-xs font-medium text-[#170526] focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="all">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Patient Table */}
        <div className="p-6 rounded-2xl bg-white border border-purple-100 shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-purple-100 text-[#806b8c] uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Patient ID</th>
                  <th className="pb-3 font-semibold">Full Name</th>
                  <th className="pb-3 font-semibold">Age / Gender</th>
                  <th className="pb-3 font-semibold">Contact</th>
                  <th className="pb-3 font-semibold">Total Visits</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Registered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-50">
                {filteredPatients.map((p) => {
                  const isAdmitted = admissions.some(
                    (a) => a.patient_id === p.id && a.admission_status === 'Admitted'
                  );

                  return (
                    <tr key={p.id} className="hover:bg-purple-50/20 transition-colors">
                      <td className="py-3.5 font-mono font-bold text-purple-900">
                        {p.patient_id_display}
                      </td>
                      <td className="py-3.5 font-bold text-[#170526]">
                        {p.full_name}
                        {p.blood_group && (
                          <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] bg-rose-50 text-rose-700 font-semibold border border-rose-100">
                            {p.blood_group}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 text-[#3b284c]">
                        {p.age} yrs • {p.gender}
                      </td>
                      <td className="py-3.5 font-mono text-[#806b8c]">{p.phone}</td>
                      <td className="py-3.5 font-semibold text-[#170526]">
                        {p.total_visits} visits
                      </td>
                      <td className="py-3.5">
                        <span
                          className={`badge-status ${
                            isAdmitted ? 'badge-degraded' : 'badge-operational'
                          }`}
                        >
                          {isAdmitted ? 'Inpatient (Admitted)' : 'Outpatient (OPD)'}
                        </span>
                      </td>
                      <td className="py-3.5 text-right text-[11px] text-[#806b8c]">
                        {new Date(p.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
