'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  Search,
  Filter,
  FileSpreadsheet,
  Clock,
  User,
  AlertTriangle,
} from 'lucide-react';
import TopNavbar from '@/components/TopNavbar';
import { useFounder } from '@/lib/FounderContext';

export default function SystemActivityPage() {
  const { auditLogs } = useFounder();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = auditLogs.filter((log) => {
    return (
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.actor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entity_type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-[#fcfaff] pb-16">
      <TopNavbar
        title="System Activity & Executive Audit Trail"
        subtitle="Append-only regulatory audit log recording operational interventions, status updates, and administrative actions"
        actionButton={
          <button
            onClick={() => alert('Exporting signed audit trail (CSV)...')}
            className="px-4 py-2 rounded-xl bg-[#240b3b] hover:bg-[#170526] text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <FileSpreadsheet size={14} />
            Export Audit Trail
          </button>
        }
      />

      <div className="px-8 py-6 space-y-6 max-w-[1600px] mx-auto">
        {/* Search */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-purple-100 shadow-xs">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#806b8c]" size={16} />
            <input
              type="text"
              placeholder="Search audit trail by actor, action type, or entity..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-purple-50/40 border border-purple-100 text-xs focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <span className="text-xs text-[#806b8c] font-medium">
            Total Records: <strong>{filteredLogs.length}</strong>
          </span>
        </div>

        {/* Audit Log Table */}
        <div className="p-6 rounded-2xl bg-white border border-purple-100 shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-purple-100 text-[#806b8c] uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Timestamp</th>
                  <th className="pb-3 font-semibold">Actor</th>
                  <th className="pb-3 font-semibold">Role</th>
                  <th className="pb-3 font-semibold">Action</th>
                  <th className="pb-3 font-semibold">Resource / Entity</th>
                  <th className="pb-3 font-semibold">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-50">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-purple-50/20 transition-colors">
                    <td className="py-3.5 font-mono text-[11px] text-[#806b8c]">
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                    <td className="py-3.5 font-bold text-[#170526]">{log.actor_name}</td>
                    <td className="py-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-50 text-purple-800 border border-purple-100">
                        {log.actor_role}
                      </span>
                    </td>
                    <td className="py-3.5 font-semibold text-purple-900">{log.action}</td>
                    <td className="py-3.5 font-mono text-[11px] text-[#3b284c]">{log.entity_type}</td>
                    <td className="py-3.5 text-[#806b8c] max-w-xs truncate">
                      {log.details ? JSON.stringify(log.details) : 'N/A'}
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
