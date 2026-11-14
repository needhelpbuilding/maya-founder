'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Doctor,
  Patient,
  Appointment,
  DoctorLeave,
  Admission,
  PaymentRecord,
  ServiceHealth,
  ServiceIncident,
  IntegrationStatus,
  AuditLog,
  FounderUser,
} from '@/types';
import {
  INITIAL_DOCTORS,
  INITIAL_PATIENTS,
  INITIAL_APPOINTMENTS,
  INITIAL_LEAVES,
  INITIAL_ADMISSIONS,
  INITIAL_PAYMENTS,
  INITIAL_AUDIT_LOGS,
} from './initialHospitalData';
import {
  INITIAL_SERVICES,
  INITIAL_INCIDENTS,
  INITIAL_INTEGRATIONS,
} from './initialFounderData';
import { supabase, isSupabaseConfigured } from './supabase';

interface FounderContextType {
  founder: FounderUser | null;
  doctors: Doctor[];
  patients: Patient[];
  appointments: Appointment[];
  doctorLeaves: DoctorLeave[];
  admissions: Admission[];
  payments: PaymentRecord[];
  services: ServiceHealth[];
  incidents: ServiceIncident[];
  integrations: IntegrationStatus[];
  auditLogs: AuditLog[];
  dateRange: 'today' | '7d' | '30d' | '90d';
  setDateRange: (range: 'today' | '7d' | '30d' | '90d') => void;
  runManualHealthCheck: () => Promise<void>;
  updateDoctorLeaveStatus: (leaveId: string, status: 'approved' | 'rejected', notes?: string) => void;
  recordAuditAction: (action: string, entityType: string, entityId?: string, details?: any) => void;
  logout: () => void;
}

const FounderContext = createContext<FounderContextType | undefined>(undefined);

export function FounderProvider({ children }: { children: React.ReactNode }) {
  const [founder, setFounder] = useState<FounderUser | null>({
    id: 'founder-01',
    name: 'Dr. Suyash Sharma',
    email: 'founder@mayahospital.com',
    role: 'founder',
    avatar: '/female-mayahospital.jpeg',
  });

  const [dateRange, setDateRange] = useState<'today' | '7d' | '30d' | '90d'>('today');

  const [doctors, setDoctors] = useState<Doctor[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mh_doctors');
      if (saved) return JSON.parse(saved);
    }
    return INITIAL_DOCTORS;
  });

  const [patients, setPatients] = useState<Patient[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mh_patients');
      if (saved) return JSON.parse(saved);
    }
    return INITIAL_PATIENTS;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mh_appointments');
      if (saved) return JSON.parse(saved);
    }
    return INITIAL_APPOINTMENTS;
  });

  const [doctorLeaves, setDoctorLeaves] = useState<DoctorLeave[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mh_leaves');
      if (saved) return JSON.parse(saved);
    }
    return INITIAL_LEAVES;
  });

  const [admissions, setAdmissions] = useState<Admission[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mh_admissions');
      if (saved) return JSON.parse(saved);
    }
    return INITIAL_ADMISSIONS;
  });

  const [payments, setPayments] = useState<PaymentRecord[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mh_payments');
      if (saved) return JSON.parse(saved);
    }
    return INITIAL_PAYMENTS;
  });

  const [services, setServices] = useState<ServiceHealth[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mh_services');
      if (saved) return JSON.parse(saved);
    }
    return INITIAL_SERVICES;
  });

  const [incidents, setIncidents] = useState<ServiceIncident[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mh_incidents');
      if (saved) return JSON.parse(saved);
    }
    return INITIAL_INCIDENTS;
  });

  const [integrations, setIntegrations] = useState<IntegrationStatus[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mh_integrations');
      if (saved) return JSON.parse(saved);
    }
    return INITIAL_INTEGRATIONS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mh_audit_logs');
      if (saved) return JSON.parse(saved);
    }
    return INITIAL_AUDIT_LOGS;
  });

  // Persist local changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mh_services', JSON.stringify(services));
      localStorage.setItem('mh_leaves', JSON.stringify(doctorLeaves));
      localStorage.setItem('mh_audit_logs', JSON.stringify(auditLogs));
    }
  }, [services, doctorLeaves, auditLogs]);

  const recordAuditAction = (action: string, entityType: string, entityId?: string, details?: any) => {
    const newLog: AuditLog = {
      id: `audit-${Date.now()}`,
      actor_name: founder ? founder.name : 'Founder Executive',
      actor_role: 'Founder',
      action,
      entity_type: entityType,
      entity_id: entityId,
      details,
      created_at: new Date().toISOString(),
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const updateDoctorLeaveStatus = (leaveId: string, status: 'approved' | 'rejected', notes?: string) => {
    setDoctorLeaves(prev =>
      prev.map(l => (l.id === leaveId ? { ...l, status } : l))
    );
    recordAuditAction(`LEAVE_${status.toUpperCase()}`, 'doctor_leaves', leaveId, { status, notes });
  };

  const runManualHealthCheck = async () => {
    // Perform simulated or real telemetry ping
    const updatedServices = services.map(s => {
      // Simulate real response times
      const jitter = Math.floor(Math.random() * 40) - 20;
      const newResponseTime = Math.max(30, s.response_time_ms + jitter);
      return {
        ...s,
        response_time_ms: newResponseTime,
        last_checked_at: new Date().toISOString(),
      };
    });
    setServices(updatedServices);
    recordAuditAction('MANUAL_HEALTH_CHECK', 'infrastructure_service', 'all_services', { checked_count: updatedServices.length });
  };

  const logout = () => {
    setFounder(null);
  };

  return (
    <FounderContext.Provider
      value={{
        founder,
        doctors,
        patients,
        appointments,
        doctorLeaves,
        admissions,
        payments,
        services,
        incidents,
        integrations,
        auditLogs,
        dateRange,
        setDateRange,
        runManualHealthCheck,
        updateDoctorLeaveStatus,
        recordAuditAction,
        logout,
      }}
    >
      {children}
    </FounderContext.Provider>
  );
}

export function useFounder() {
  const context = useContext(FounderContext);
  if (!context) {
    throw new Error('useFounder must be used within a FounderProvider');
  }
  return context;
}
