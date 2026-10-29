"use client";

import React, { useState } from "react";
import { AuditLogEntry, NotificationItem } from "@/types";
import {
  ShieldAlert,
  Bell,
  Clock,
  CheckCircle2,
  AlertTriangle,
  User,
  Activity
} from "lucide-react";

interface AuditNotificationsViewProps {
  auditLogs: AuditLogEntry[];
  notifications: NotificationItem[];
}

export const AuditNotificationsView: React.FC<AuditNotificationsViewProps> = ({
  auditLogs,
  notifications
}) => {
  const [activeTab, setActiveTab] = useState<"audit" | "notifications">("audit");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <ShieldAlert className="w-4 h-4 text-emerald-600" />
            Audit History & Notification Center
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Immutable Audit Trail & Operational Notifications
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Maintains permanent records of menu approvals, stock adjustments, purchase orders, and mid-service checkpoints.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            onClick={() => setActiveTab("audit")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
              activeTab === "audit" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600"
            }`}
          >
            Audit Trail ({auditLogs.length})
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
              activeTab === "notifications" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600"
            }`}
          >
            Notifications ({notifications.length})
          </button>
        </div>
      </div>

      {activeTab === "audit" && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-emerald-600" />
              Chronological System Audit Log
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">SHA-256 Validated</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-4">Timestamp</th>
                  <th className="py-2.5 px-4">Actor</th>
                  <th className="py-2.5 px-4">Role</th>
                  <th className="py-2.5 px-4">Action</th>
                  <th className="py-2.5 px-4">Entity Type</th>
                  <th className="py-2.5 px-4">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/80">
                    <td className="py-2.5 px-4 text-slate-400 whitespace-nowrap">
                      {log.timestamp.replace("T", " ").substring(0, 19)}
                    </td>
                    <td className="py-2.5 px-4 font-bold text-slate-800 font-sans">{log.user_name}</td>
                    <td className="py-2.5 px-4 text-slate-500 font-sans">{log.user_role}</td>
                    <td className="py-2.5 px-4">
                      <span className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded font-bold text-[10px]">
                        {log.action_type}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-slate-600 font-sans">{log.entity_type}</td>
                    <td className="py-2.5 px-4 text-slate-700 font-sans">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "notifications" && (
        <div className="space-y-3">
          {notifications.map((notif) => (
            <div key={notif.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-start justify-between gap-3 text-xs">
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  notif.urgency === "high" ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"
                }`}>
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{notif.title}</h4>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">{notif.message}</p>
                  <span className="text-[10px] text-slate-400 mt-1 block">{notif.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
