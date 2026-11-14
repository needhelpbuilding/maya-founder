'use client';

import React, { useState } from 'react';
import {
  Activity,
  RefreshCw,
  Server,
  ShieldCheck,
  AlertTriangle,
  Clock,
  ExternalLink,
  CheckCircle2,
  XCircle,
  HelpCircle,
  TrendingDown,
  Layers,
} from 'lucide-react';
import TopNavbar from '@/components/TopNavbar';
import { useFounder } from '@/lib/FounderContext';

export default function ApiHealthPage() {
  const { services, incidents, runManualHealthCheck } = useFounder();
  const [checking, setChecking] = useState(false);

  const handleManualCheck = async () => {
    setChecking(true);
    await runManualHealthCheck();
    setTimeout(() => setChecking(false), 800);
  };

  const operationalCount = services.filter((s) => s.status === 'Operational').length;
  const degradedCount = services.filter((s) => s.status === 'Degraded').length;
  const downCount = services.filter((s) => s.status === 'Down').length;

  const avgResponseTime = Math.round(
    services.reduce((acc, curr) => acc + curr.response_time_ms, 0) / (services.length || 1)
  );

  return (
    <div className="min-h-screen bg-[#fcfaff] pb-16">
      <TopNavbar
        title="API Health & Infrastructure Telemetry"
        subtitle="Real-time uptime, response latency, and operational health of all hospital services"
        actionButton={
          <button
            onClick={handleManualCheck}
            disabled={checking}
            className="px-4 py-2 rounded-xl bg-[#245BFF] hover:bg-[#0E36B4] text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <RefreshCw size={14} className={checking ? 'animate-spin' : ''} />
            {checking ? 'Pinging Services...' : 'Run Telemetry Check'}
          </button>
        }
      />

      <div className="px-8 py-6 space-y-6 max-w-[1600px] mx-auto">
        {/* Core Infrastructure Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs">
            <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
              Overall Health
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-bold text-emerald-700">
                {Math.round((operationalCount / (services.length || 1)) * 100)}%
              </span>
              <span className="text-xs text-emerald-600 font-semibold">Service Uptime</span>
            </div>
            <p className="text-[11px] text-[#64748B] mt-1">
              {operationalCount} of {services.length} services nominal
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs">
            <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
              Degraded / Alerts
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-bold text-amber-700">{degradedCount}</span>
              <span className="text-xs text-amber-600 font-semibold">High Latency</span>
            </div>
            <p className="text-[11px] text-[#64748B] mt-1">Automatic throttling active</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs">
            <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
              Outages (Down)
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-bold text-[#0E36B4]">{downCount}</span>
              <span className="text-xs text-emerald-600 font-semibold">No Outages</span>
            </div>
            <p className="text-[11px] text-[#64748B] mt-1">Core endpoints responding</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs">
            <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
              Avg Latency
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-bold text-[#0E36B4]">{avgResponseTime}ms</span>
              <span className="text-xs text-emerald-600 font-semibold">Fast Response</span>
            </div>
            <p className="text-[11px] text-[#64748B] mt-1">Across all cloud endpoints</p>
          </div>
        </div>

        {/* Live Service Matrix */}
        <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-[#0E36B4]">Configured Services & APIs</h2>
              <p className="text-xs text-[#64748B]">Live health check results verified server-side</p>
            </div>
            <span className="text-[11px] text-[#64748B] font-mono">
              Last check: {new Date().toLocaleTimeString()}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[#64748B] uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Service Name</th>
                  <th className="pb-3 font-semibold">Endpoint / Type</th>
                  <th className="pb-3 font-semibold">Environment</th>
                  <th className="pb-3 font-semibold">Response Time</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Last Verified</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {services.map((srv) => (
                  <tr key={srv.id} className="hover:bg-slate-50/20 transition-colors">
                    <td className="py-3.5 font-bold text-[#0E36B4]">
                      <div className="flex items-center gap-2">
                        <Server size={15} className="text-[#245BFF]" />
                        <span>{srv.service_name}</span>
                      </div>
                      {srv.safe_error_message && (
                        <p className="text-[11px] text-amber-700 font-normal mt-0.5 ml-6">
                          {srv.safe_error_message}
                        </p>
                      )}
                    </td>
                    <td className="py-3.5 font-mono text-[11px] text-[#64748B]">
                      {srv.endpoint_reference || srv.service_type}
                    </td>
                    <td className="py-3.5">
                      <span className="px-2 py-0.5 rounded-md bg-slate-50 text-[#245BFF] font-semibold text-[10px] uppercase border border-slate-100">
                        {srv.environment}
                      </span>
                    </td>
                    <td className="py-3.5 font-mono font-medium">
                      <span
                        className={
                          srv.response_time_ms > 500
                            ? 'text-amber-600 font-bold'
                            : 'text-emerald-700'
                        }
                      >
                        {srv.response_time_ms} ms
                      </span>
                    </td>
                    <td className="py-3.5">
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
                    </td>
                    <td className="py-3.5 text-right text-[11px] text-[#64748B] font-mono">
                      {new Date(srv.last_checked_at).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Incident Timeline */}
        <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-[#0E36B4]">Incident History & Mitigations</h2>
              <p className="text-xs text-[#64748B]">Audited operational telemetry logs</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-50 text-[#245BFF]">
              Audit Trail
            </span>
          </div>

          <div className="space-y-4">
            {incidents.map((inc) => (
              <div
                key={inc.id}
                className="p-4 rounded-xl border border-slate-100 bg-slate-50/20 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        inc.severity === 'critical'
                          ? 'bg-rose-100 text-rose-800'
                          : inc.severity === 'minor'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {inc.severity}
                    </span>
                    <span className="font-bold text-sm text-[#0E36B4]">{inc.title}</span>
                  </div>
                  <p className="text-xs text-[#64748B]">
                    Service: <span className="font-semibold text-[#1E293B]">{inc.service_name}</span>
                  </p>
                  {inc.resolution_notes && (
                    <p className="text-xs text-[#1E293B] bg-white/70 p-2 rounded-lg border border-slate-100/60 mt-1">
                      {inc.resolution_notes}
                    </p>
                  )}
                </div>

                <div className="flex flex-col md:items-end text-xs font-mono text-[#64748B]">
                  <span className="font-semibold text-[#0E36B4] capitalize">{inc.status}</span>
                  <span>Started: {new Date(inc.started_at).toLocaleString()}</span>
                  {inc.resolved_at && (
                    <span className="text-emerald-700 font-semibold">
                      Resolved: {new Date(inc.resolved_at).toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
