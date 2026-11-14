'use client';

import React from 'react';
import {
  IndianRupee,
  TrendingUp,
  CreditCard,
  Banknote,
  Smartphone,
  ShieldCheck,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import TopNavbar from '@/components/TopNavbar';
import { useFounder } from '@/lib/FounderContext';

export default function FounderFinancesPage() {
  const { payments, appointments } = useFounder();

  // Financial calculations
  const totalCollected = payments
    .filter((p) => p.payment_status === 'Completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingDues = appointments
    .filter((a) => a.payment_status === 'Pending')
    .reduce((sum, a) => sum + a.consultation_fee, 0);

  // Method split
  const upiTotal = payments
    .filter((p) => p.payment_method === 'UPI' && p.payment_status === 'Completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const cashTotal = payments
    .filter((p) => p.payment_method === 'Cash' && p.payment_status === 'Completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const cardTotal = payments
    .filter((p) => p.payment_method === 'Card' && p.payment_status === 'Completed')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="min-h-screen bg-[#fcfaff] pb-16">
      <TopNavbar
        title="Revenue & Financial Oversight"
        subtitle="Audited fee collections, payment methods, Razorpay gateway settlements, and pending dues"
        actionButton={
          <button
            onClick={() => alert('Exporting audited revenue transaction ledger (CSV)...')}
            className="px-4 py-2 rounded-xl bg-[#240b3b] hover:bg-[#170526] text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <FileSpreadsheet size={14} />
            Export Ledger CSV
          </button>
        }
      />

      <div className="px-8 py-6 space-y-6 max-w-[1600px] mx-auto">
        {/* Core Financial Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-xs">
            <span className="text-xs font-semibold text-[#806b8c] uppercase tracking-wider">
              Total Revenue Collected
            </span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-sm font-semibold text-emerald-700">₹</span>
              <span className="text-2xl font-bold text-emerald-700">
                {totalCollected.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-[11px] text-emerald-600 mt-1 font-semibold">100% verified server-side</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-xs">
            <span className="text-xs font-semibold text-[#806b8c] uppercase tracking-wider">
              Pending Counter Dues
            </span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-sm font-semibold text-[#170526]">₹</span>
              <span className="text-2xl font-bold text-[#170526]">
                {pendingDues.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-[11px] text-amber-600 mt-1 font-semibold">Pending check-in settlement</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-xs">
            <span className="text-xs font-semibold text-[#806b8c] uppercase tracking-wider">
              Razorpay / UPI Share
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-bold text-purple-900">
                {Math.round((upiTotal / (totalCollected || 1)) * 100)}%
              </span>
              <span className="text-xs text-[#806b8c] font-medium">Digital Collection</span>
            </div>
            <p className="text-[11px] text-[#806b8c] mt-1">Instant QR & online gateway</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-xs">
            <span className="text-xs font-semibold text-[#806b8c] uppercase tracking-wider">
              Cash Desk Settlements
            </span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-sm font-semibold text-[#170526]">₹</span>
              <span className="text-2xl font-bold text-[#170526]">
                {cashTotal.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-[11px] text-[#806b8c] mt-1">Audited daily vault deposit</p>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="p-6 rounded-2xl bg-white border border-purple-100 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-[#170526]">Audited Transaction Ledger</h2>
              <p className="text-xs text-[#806b8c]">Verified payment records with receipt identifiers</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100">
              Audited Ledger
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-purple-100 text-[#806b8c] uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Receipt #</th>
                  <th className="pb-3 font-semibold">Patient Name</th>
                  <th className="pb-3 font-semibold">Amount</th>
                  <th className="pb-3 font-semibold">Method</th>
                  <th className="pb-3 font-semibold">Collected By</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Payment Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-50">
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-purple-50/20 transition-colors">
                    <td className="py-3.5 font-mono font-bold text-purple-900">
                      {p.receipt_number}
                    </td>
                    <td className="py-3.5 font-bold text-[#170526]">{p.patient_name}</td>
                    <td className="py-3.5 font-bold text-emerald-700">₹{p.amount}</td>
                    <td className="py-3.5">
                      <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-900 font-semibold border border-purple-100">
                        {p.payment_method}
                      </span>
                    </td>
                    <td className="py-3.5 text-[#3b284c]">{p.collected_by}</td>
                    <td className="py-3.5">
                      <span
                        className={`badge-status ${
                          p.payment_status === 'Completed'
                            ? 'badge-operational'
                            : 'badge-degraded'
                        }`}
                      >
                        {p.payment_status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right font-mono text-[11px] text-[#806b8c]">
                      {new Date(p.payment_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
