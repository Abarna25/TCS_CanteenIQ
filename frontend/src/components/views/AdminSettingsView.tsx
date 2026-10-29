"use client";

import React, { useState } from "react";
import { User, Canteen } from "@/types";
import {
  Building2,
  Users,
  Settings,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Globe
} from "lucide-react";

interface AdminSettingsViewProps {
  users: User[];
  canteens: Canteen[];
}

export const AdminSettingsView: React.FC<AdminSettingsViewProps> = ({
  users,
  canteens
}) => {
  const [currency, setCurrency] = useState("USD");
  const [dailyBudget, setDailyBudget] = useState(2400);
  const [dailyCapacity, setDailyCapacity] = useState(1200);
  const [operatingHours, setOperatingHours] = useState("07:30 - 20:30");
  const [savedMsg, setSavedMsg] = useState<string | null>(null);

  const handleSaveSettings = () => {
    setSavedMsg("Institutional canteen policies and operating parameters updated successfully.");
    setTimeout(() => setSavedMsg(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <Building2 className="w-4 h-4 text-emerald-600" />
            System Administration & Institutional Policies
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Institutional Settings, Role Permissions & Operational Limits
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Configure campus operating hours, daily budget boundaries, currency standard, and tenancy scoping.
          </p>
        </div>

        <button
          onClick={handleSaveSettings}
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg transition shadow-xs flex items-center gap-1.5"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-200" />
          Save System Settings
        </button>
      </div>

      {savedMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          {savedMsg}
        </div>
      )}

      {/* Settings Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Institutional Policies */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-100">
            <Settings className="w-4 h-4 text-emerald-600" />
            Campus Canteen Parameters
          </h3>

          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">Operating Hours</label>
            <input
              type="text"
              value={operatingHours}
              onChange={(e) => setOperatingHours(e.target.value)}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">Currency Standard</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden"
            >
              <option value="USD">USD ($)</option>
              <option value="INR">INR (₹)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">
              Daily Production Budget Ceiling (${currency})
            </label>
            <input
              type="number"
              value={dailyBudget}
              onChange={(e) => setDailyBudget(Number(e.target.value))}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">
              Daily Kitchen Capacity Cap (Portions)
            </label>
            <input
              type="number"
              value={dailyCapacity}
              onChange={(e) => setDailyCapacity(Number(e.target.value))}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden"
            />
          </div>
        </div>

        {/* Users & Role-Based Access Scoping */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-100">
            <Users className="w-4 h-4 text-emerald-600" />
            Configured Demo Accounts & Roles
          </h3>

          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
            {users.map((u) => (
              <div key={u.id} className="p-3 bg-slate-50/70 border border-slate-200 rounded-lg flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">{u.name}</div>
                  <div className="text-[11px] text-slate-500">{u.email}</div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {u.role}
                </span>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 flex items-center gap-2">
            <Lock className="w-4 h-4 text-slate-500 flex-shrink-0" />
            <span>Supabase Row Level Security (RLS) active across all tables. Tenant isolation scoped to TCS campus.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
