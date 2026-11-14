'use client';

import React from 'react';
import {
  Cpu,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  RefreshCw,
  ExternalLink,
  Lock,
} from 'lucide-react';
import TopNavbar from '@/components/TopNavbar';
import { useFounder } from '@/lib/FounderContext';

export default function IntegrationsPage() {
  const { integrations } = useFounder();

  return (
    <div className="min-h-screen bg-[#fcfaff] pb-16">
      <TopNavbar
        title="Integrations & External Gateway Management"
        subtitle="Manage secure external interfaces: Payment Gateways, WhatsApp Cloud, Database, and Analytics"
      />

      <div className="px-8 py-6 space-y-6 max-w-[1600px] mx-auto">
        {/* Security Rule Warning */}
        <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/60 text-[#1E293B] text-xs flex items-center gap-3">
          <Lock size={18} className="text-[#245BFF] flex-shrink-0" />
          <span>
            <strong>Zero-Trust Credential Security:</strong> In accordance with healthcare compliance and security
            policies, private API keys, webhook signing secrets, and database service role passwords are never
            exposed in client bundles. Only masked connection health and sync telemetry are rendered here.
          </span>
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-white border border-slate-100 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-slate-50 text-[#245BFF]">
                      <Cpu size={18} />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#0E36B4]">{item.integration_name}</h3>
                      <p className="text-[11px] text-[#64748B] font-mono">{item.integration_type}</p>
                    </div>
                  </div>
                  <span
                    className={`badge-status ${
                      item.connection_status === 'Connected'
                        ? 'badge-operational'
                        : item.connection_status === 'Degraded'
                        ? 'badge-degraded'
                        : 'badge-not-connected'
                    }`}
                  >
                    {item.connection_status}
                  </span>
                </div>

                <div className="space-y-2 mt-4 text-xs text-[#1E293B]">
                  <div className="flex justify-between items-center">
                    <span className="text-[#64748B]">Environment:</span>
                    <span className="font-semibold text-[#0E36B4] uppercase text-[10px] bg-slate-50 px-2 py-0.5 rounded">
                      {item.environment}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[#64748B]">Last Synchronized:</span>
                    <span className="font-mono text-[11px]">
                      {item.last_sync_at ? new Date(item.last_sync_at).toLocaleTimeString() : 'N/A'}
                    </span>
                  </div>

                  {item.last_error_message && (
                    <div className="p-2.5 rounded-lg bg-amber-50/80 border border-amber-200 text-amber-900 text-[11px] mt-2">
                      <p className="font-bold">Incident:</p>
                      <p>{item.last_error_message}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[#64748B] text-[11px]">Credential: Encrypted in KMS</span>
                <button
                  onClick={() => alert(`Synchronizing ${item.integration_name}...`)}
                  className="text-[#245BFF] font-semibold hover:text-[#0E36B4] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Test Sync <RefreshCw size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
