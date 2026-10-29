"use client";

import React from "react";
import { UserRole, Canteen } from "@/types";
import {
  Bell,
  RefreshCw,
  Building,
  Calendar,
  Clock,
  Sparkles,
  UserCheck
} from "lucide-react";

interface HeaderProps {
  currentRole: UserRole;
  onChangeRole: (role: UserRole) => void;
  canteens: Canteen[];
  selectedCanteenId: string;
  onSelectCanteen: (canteenId: string) => void;
  selectedSession: string;
  onSelectSession: (session: string) => void;
  targetDate: string;
  notificationsCount: number;
  onOpenNotifications: () => void;
  onResetDemo: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onChangeRole,
  canteens,
  selectedCanteenId,
  onSelectCanteen,
  selectedSession,
  onSelectSession,
  targetDate,
  notificationsCount,
  onOpenNotifications,
  onResetDemo
}) => {
  const roles: UserRole[] = [
    "Administrator",
    "Canteen Manager",
    "Kitchen Staff",
    "Student",
    "Procurement Staff"
  ];

  const sessions = ["Breakfast", "Lunch", "Snacks", "Dinner"];

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-3 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-20 shadow-xs">
      {/* Canteen & Operational Session Controls */}
      <div className="flex items-center gap-3">
        {/* Canteen Selector */}
        <div className="flex items-center gap-2 bg-slate-100/80 px-3 py-1.5 rounded-lg border border-slate-200">
          <Building className="w-4 h-4 text-emerald-600" />
          <select
            value={selectedCanteenId}
            onChange={(e) => onSelectCanteen(e.target.value)}
            className="bg-transparent text-xs font-semibold text-slate-800 focus:outline-hidden cursor-pointer"
          >
            {canteens.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Meal Session Selector */}
        <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-lg border border-slate-200">
          <Clock className="w-3.5 h-3.5 text-slate-500 ml-1.5 mr-0.5" />
          {sessions.map(s => (
            <button
              key={s}
              onClick={() => onSelectSession(s)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition ${
                selectedSession === s
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Target Date Pill */}
        <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200/60">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-medium text-slate-700">{targetDate}</span>
          <span className="text-[10px] text-emerald-600 font-semibold uppercase bg-emerald-50 px-1 py-0.5 rounded">Active Plan</span>
        </div>
      </div>

      {/* Quick Role Switcher Pills (Evaluation Essential) */}
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-1 bg-emerald-50/70 border border-emerald-200/60 p-1 rounded-lg">
          <div className="flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold text-emerald-800">
            <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden xl:inline">Role:</span>
          </div>
          {roles.map(r => (
            <button
              key={r}
              onClick={() => onChangeRole(r)}
              className={`px-2 py-1 text-xs font-medium rounded-md transition ${
                currentRole === r
                  ? "bg-emerald-700 text-white shadow-xs font-semibold"
                  : "text-slate-600 hover:bg-white hover:text-slate-900"
              }`}
            >
              {r === "Canteen Manager" ? "Manager" : r === "Procurement Staff" ? "Procurement" : r === "Kitchen Staff" ? "Kitchen" : r}
            </button>
          ))}
        </div>

        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition"
          title="Audit & Notifications"
        >
          <Bell className="w-4 h-4" />
          {notificationsCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
          )}
        </button>

        {/* Reset Demo State Button */}
        <button
          onClick={() => {
            if (confirm("Reset application data to initial demo state?")) {
              onResetDemo();
            }
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition"
          title="Reset Demo Data"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden sm:inline">Reset Demo</span>
        </button>
      </div>
    </header>
  );
};
