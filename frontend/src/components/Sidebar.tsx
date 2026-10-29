"use client";

import React from "react";
import { UserRole } from "@/types";
import {
  LayoutDashboard,
  Compass,
  Sparkles,
  TrendingUp,
  ChefHat,
  Boxes,
  BookOpen,
  Truck,
  Receipt,
  Trash2,
  UtensilsCrossed,
  Clock,
  Sliders,
  Leaf,
  Building2,
  UploadCloud,
  FileSpreadsheet,
  ShieldAlert,
  Camera,
  LogOut,
  ChevronRight
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: any;
  roles: string[];
  badge?: string;
  count?: number;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface SidebarProps {
  currentRole: UserRole;
  currentScreen: string;
  onSelectScreen: (screenId: string) => void;
  notificationsCount: number;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRole,
  currentScreen,
  onSelectScreen,
  notificationsCount,
  onLogout
}) => {
  const navSections: NavSection[] = [
    {
      title: "Core Operations",
      items: [
        { id: "dashboard", label: "My Dashboard", icon: LayoutDashboard, roles: ["Administrator", "Canteen Manager", "Kitchen Staff", "Student", "Procurement Staff"] },
        { id: "command-center", label: "Command Center", icon: Compass, roles: ["Administrator", "Canteen Manager"] },
        { id: "smart-menu", label: "Smart Menu Studio", icon: Sparkles, roles: ["Administrator", "Canteen Manager"], badge: "Flagship" },
        { id: "forecasting", label: "Demand Forecasting", icon: TrendingUp, roles: ["Administrator", "Canteen Manager"] },
        { id: "kitchen-board", label: "Production Board", icon: ChefHat, roles: ["Administrator", "Canteen Manager", "Kitchen Staff"], badge: "Live" },
        { id: "pos-sales", label: "POS & Sales Entry", icon: Receipt, roles: ["Administrator", "Canteen Manager", "Kitchen Staff"] }
      ]
    },
    {
      title: "Supply & Inventory",
      items: [
        { id: "inventory", label: "Inventory & FEFO", icon: Boxes, roles: ["Administrator", "Canteen Manager", "Kitchen Staff", "Procurement Staff"] },
        { id: "recipes", label: "Recipe Engineering", icon: BookOpen, roles: ["Administrator", "Canteen Manager", "Kitchen Staff"] },
        { id: "procurement", label: "Procurement & POs", icon: Truck, roles: ["Administrator", "Canteen Manager", "Procurement Staff"] }
      ]
    },
    {
      title: "Student Experience",
      items: [
        { id: "student-portal", label: "Food Portal & Menu", icon: UtensilsCrossed, roles: ["Administrator", "Canteen Manager", "Student"] },
        { id: "student-preorders", label: "Preorders & Reviews", icon: Clock, roles: ["Administrator", "Canteen Manager", "Student"] }
      ]
    },
    {
      title: "Intelligence & Impact",
      items: [
        { id: "what-if", label: "What-If Simulator", icon: Sliders, roles: ["Administrator", "Canteen Manager"] },
        { id: "waste-analytics", label: "Waste Propagation", icon: Trash2, roles: ["Administrator", "Canteen Manager", "Kitchen Staff"] },
        { id: "vision-waste", label: "Vision Plate Waste", icon: Camera, roles: ["Administrator", "Canteen Manager", "Kitchen Staff"], badge: "AI" },
        { id: "sustainability", label: "Sustainability Card", icon: Leaf, roles: ["Administrator", "Canteen Manager", "Kitchen Staff", "Procurement Staff", "Student"] },
        { id: "multi-canteen", label: "Canteen Benchmark", icon: Building2, roles: ["Administrator", "Canteen Manager"] }
      ]
    },
    {
      title: "Management & System",
      items: [
        { id: "data-import", label: "Data Quality & Import", icon: UploadCloud, roles: ["Administrator", "Canteen Manager"] },
        { id: "reports", label: "Reports & CSV Export", icon: FileSpreadsheet, roles: ["Administrator", "Canteen Manager", "Procurement Staff"] },
        { id: "audit-notifications", label: "Audit & Notifications", icon: ShieldAlert, roles: ["Administrator", "Canteen Manager"], count: notificationsCount },
        { id: "admin-settings", label: "Administration", icon: Building2, roles: ["Administrator"] }
      ]
    }
  ];

  return (
    <aside className="w-64 bg-[#06241a] text-slate-200 flex flex-col h-screen border-r border-[#0d3b2c] flex-shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#0d3b2c] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-900/40">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-white tracking-tight flex items-center gap-1.5">
              Canteen<span className="text-emerald-400">IQ</span>
            </h1>
            <p className="text-[10px] text-emerald-300/70 uppercase tracking-widest font-semibold">TCS Campus Ed.</p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navSections.map((sec, idx) => {
          const visibleItems = sec.items.filter(item => item.roles.includes(currentRole));
          if (visibleItems.length === 0) return null;

          return (
            <div key={idx} className="space-y-1">
              <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-emerald-400/60 mb-1.5">
                {sec.title}
              </p>
              {visibleItems.map(item => {
                const Icon = item.icon;
                const isActive = currentScreen === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectScreen(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? "bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 shadow-sm"
                        : "text-slate-300 hover:bg-[#0a3526] hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? "text-emerald-400" : "text-slate-400"}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold uppercase ${
                        item.badge === "Flagship" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-amber-500/20 text-amber-300"
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    {item.count !== undefined && item.count > 0 && (
                      <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* User Session Footer */}
      <div className="p-3 border-t border-[#0d3b2c] bg-[#041a13]">
        <div className="flex items-center justify-between px-2 py-1.5">
          <div className="truncate">
            <p className="text-xs font-semibold text-white truncate">{currentRole}</p>
            <p className="text-[11px] text-emerald-400/80 truncate">Active Session</p>
          </div>
          <button
            onClick={onLogout}
            title="Switch User / Logout"
            className="p-1.5 rounded-md hover:bg-red-500/20 text-slate-400 hover:text-red-300 transition"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
