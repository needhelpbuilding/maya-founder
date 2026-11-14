'use client';

import React from 'react';
import {
  BedDouble,
  Users,
  CheckCircle2,
  Clock,
  Building2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import TopNavbar from '@/components/TopNavbar';
import { useFounder } from '@/lib/FounderContext';

export default function FounderAdmissionsPage() {
  const { admissions } = useFounder();

  const currentlyAdmitted = admissions.filter((a) => a.admission_status === 'Admitted');
  const discharged = admissions.filter((a) => a.admission_status === 'Discharged');

  // Authoritative bed numbers configured at Maya Hospital
  const TOTAL_CONFIGURED_BEDS = 50;
  const occupiedBeds = currentlyAdmitted.length;
  const availableBeds = Math.max(0, TOTAL_CONFIGURED_BEDS - occupiedBeds);
  const occupancyRate = Math.round((occupiedBeds / TOTAL_CONFIGURED_BEDS) * 100);

  return (
    <div className="min-h-screen bg-[#fcfaff] pb-16">
      <TopNavbar
        title="Inpatient Admissions & Ward Census"
        subtitle="Real-time hospital bed occupancy, admitted patients, and discharge workflow"
      />

      <div className="px-8 py-6 space-y-6 max-w-[1600px] mx-auto">
        {/* Occupancy Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-xs">
            <span className="text-xs font-semibold text-[#806b8c] uppercase tracking-wider">
              Currently Admitted
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-bold text-[#170526]">{occupiedBeds}</span>
              <span className="text-xs text-purple-700 font-semibold">Patients</span>
            </div>
            <p className="text-[11px] text-[#806b8c] mt-1">Under round-the-clock clinical care</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-xs">
            <span className="text-xs font-semibold text-[#806b8c] uppercase tracking-wider">
              Available Beds
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-bold text-emerald-700">{availableBeds}</span>
              <span className="text-xs text-emerald-600 font-semibold">Ready for Admission</span>
            </div>
            <p className="text-[11px] text-[#806b8c] mt-1">Sterilized & staffed</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-xs">
            <span className="text-xs font-semibold text-[#806b8c] uppercase tracking-wider">
              Bed Occupancy Rate
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-bold text-[#170526]">{occupancyRate}%</span>
              <span className="text-xs text-[#806b8c] font-medium">Capacity Utilized</span>
            </div>
            <div className="w-full bg-purple-50 h-2 rounded-full overflow-hidden mt-2">
              <div
                className="h-full bg-purple-600 rounded-full"
                style={{ width: `${occupancyRate}%` }}
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-xs">
            <span className="text-xs font-semibold text-[#806b8c] uppercase tracking-wider">
              Discharged Today
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-bold text-teal-700">{discharged.length}</span>
              <span className="text-xs text-teal-600 font-semibold">Patients</span>
            </div>
            <p className="text-[11px] text-[#806b8c] mt-1">Discharge summary issued</p>
          </div>
        </div>

        {/* Admitted Inpatients Table */}
        <div className="p-6 rounded-2xl bg-white border border-purple-100 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-[#170526]">Active Inpatient Registry</h2>
              <p className="text-xs text-[#806b8c]">Currently occupied beds and attending medical consultants</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 border border-purple-100">
              Live Census
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-purple-100 text-[#806b8c] uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Adm #</th>
                  <th className="pb-3 font-semibold">Patient Name</th>
                  <th className="pb-3 font-semibold">Ward / Room</th>
                  <th className="pb-3 font-semibold">Attending Doctor</th>
                  <th className="pb-3 font-semibold">Department</th>
                  <th className="pb-3 font-semibold">Admission Date</th>
                  <th className="pb-3 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-50">
                {admissions.map((adm) => (
                  <tr key={adm.id} className="hover:bg-purple-50/20 transition-colors">
                    <td className="py-3.5 font-mono font-bold text-purple-900">
                      {adm.admission_number}
                    </td>
                    <td className="py-3.5">
                      <p className="font-bold text-[#170526]">{adm.patient_name}</p>
                      <p className="text-[11px] text-[#806b8c] font-mono">{adm.patient_phone}</p>
                    </td>
                    <td className="py-3.5 font-semibold text-[#170526]">
                      {adm.ward_or_room}
                    </td>
                    <td className="py-3.5 text-[#3b284c] font-medium">
                      {adm.attending_doctor_name}
                    </td>
                    <td className="py-3.5 text-[#806b8c]">
                      {adm.department_name}
                    </td>
                    <td className="py-3.5 font-mono text-[#806b8c]">
                      {new Date(adm.admission_date).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 text-right">
                      <span
                        className={`badge-status ${
                          adm.admission_status === 'Admitted'
                            ? 'badge-operational'
                            : 'badge-degraded'
                        }`}
                      >
                        {adm.admission_status}
                      </span>
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
