'use client';

import React from 'react';
import {
  Settings,
  Shield,
  Building2,
  Lock,
  UserCheck,
  Bell,
  Save,
} from 'lucide-react';
import TopNavbar from '@/components/TopNavbar';
import { useFounder } from '@/lib/FounderContext';

export default function SettingsPage() {
  const { founder } = useFounder();

  return (
    <div className="min-h-screen bg-[#fcfaff] pb-16">
      <TopNavbar
        title="Settings & Role-Based Access Governance"
        subtitle="Manage hospital organization profile, administrative roles, and Supabase RLS security policies"
      />

      <div className="px-8 py-6 space-y-6 max-w-[1200px] mx-auto">
        {/* Hospital Identity */}
        <div className="p-6 rounded-2xl bg-white border border-purple-100 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-[#170526] flex items-center gap-2">
            <Building2 size={18} className="text-purple-600" />
            Hospital Organization Profile
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[#806b8c] font-semibold mb-1">Hospital Legal Name</label>
              <input
                type="text"
                readOnly
                defaultValue="Maya Hospital & Multi Speciality Centre"
                className="w-full p-2.5 rounded-xl bg-purple-50/40 border border-purple-100 font-medium text-[#170526]"
              />
            </div>
            <div>
              <label className="block text-[#806b8c] font-semibold mb-1">Registration / Accreditation</label>
              <input
                type="text"
                readOnly
                defaultValue="NABH Accredited & UP Health Dept Certified"
                className="w-full p-2.5 rounded-xl bg-purple-50/40 border border-purple-100 font-medium text-[#170526]"
              />
            </div>
            <div>
              <label className="block text-[#806b8c] font-semibold mb-1">Emergency 24x7 Helpline</label>
              <input
                type="text"
                readOnly
                defaultValue="+91 9839752108 / +91 9161103325"
                className="w-full p-2.5 rounded-xl bg-purple-50/40 border border-purple-100 font-medium text-[#170526]"
              />
            </div>
            <div>
              <label className="block text-[#806b8c] font-semibold mb-1">Primary Operating Campus</label>
              <input
                type="text"
                readOnly
                defaultValue="Maya Hospital, Bilandpur, Gorakhpur, Uttar Pradesh 273001"
                className="w-full p-2.5 rounded-xl bg-purple-50/40 border border-purple-100 font-medium text-[#170526]"
              />
            </div>
          </div>
        </div>

        {/* Security & Access */}
        <div className="p-6 rounded-2xl bg-white border border-purple-100 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-[#170526] flex items-center gap-2">
            <Shield size={18} className="text-purple-600" />
            Founder Credentials & Access Control
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[#806b8c] font-semibold mb-1">Signed-in Founder</label>
              <input
                type="text"
                readOnly
                defaultValue={founder?.name || 'Dr. Suyash Sharma'}
                className="w-full p-2.5 rounded-xl bg-purple-50/40 border border-purple-100 font-bold text-[#170526]"
              />
            </div>
            <div>
              <label className="block text-[#806b8c] font-semibold mb-1">Role Authorization</label>
              <input
                type="text"
                readOnly
                defaultValue="Chief Executive Officer / Hospital Founder (Full Access)"
                className="w-full p-2.5 rounded-xl bg-purple-50/40 border border-purple-100 font-bold text-purple-900"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-3 mt-4">
            <Shield size={18} className="text-emerald-700 flex-shrink-0" />
            <span>
              <strong>Row Level Security Active:</strong> All operational mutations and executive decisions are
              automatically validated against database-level RLS policies. Client bypass is strictly prevented.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
