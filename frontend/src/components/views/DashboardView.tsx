"use client";

import React from "react";
import { UserRole, MenuItem, StudentPreorder, SurplusOfferRecord } from "@/types";
import {
  TrendingUp,
  Sparkles,
  ChefHat,
  Boxes,
  Leaf,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Receipt,
  Heart,
  Tag
} from "lucide-react";

interface DashboardViewProps {
  currentRole: UserRole;
  onNavigate: (screen: string) => void;
  menuItems: MenuItem[];
  preorders: StudentPreorder[];
  surplusOffers: SurplusOfferRecord[];
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentRole,
  onNavigate,
  menuItems,
  preorders,
  surplusOffers
}) => {
  return (
    <div className="space-y-6">
      {/* Welcome Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Persona Overview: {currentRole}
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            {currentRole === "Administrator" && "Campus Canteen Administrative Dashboard"}
            {currentRole === "Canteen Manager" && "Canteen Manager Operational Overview"}
            {currentRole === "Kitchen Staff" && "Kitchen Shift Production & Batch Station"}
            {currentRole === "Student" && "Campus Dining & Preorder Hub"}
            {currentRole === "Procurement Staff" && "Supply Chain & Inventory Procurement Desk"}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Real-time synchronization active across all 5 operational roles on the shared campus database.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {currentRole === "Canteen Manager" && (
            <button
              onClick={() => onNavigate("smart-menu")}
              className="px-4 py-2 bg-emerald-700 text-white font-semibold text-xs rounded-lg hover:bg-emerald-800 transition shadow-sm flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              Smart Menu Studio
            </button>
          )}
          {currentRole === "Kitchen Staff" && (
            <button
              onClick={() => onNavigate("kitchen-board")}
              className="px-4 py-2 bg-emerald-700 text-white font-semibold text-xs rounded-lg hover:bg-emerald-800 transition shadow-sm flex items-center gap-1.5"
            >
              <ChefHat className="w-4 h-4 text-emerald-200" />
              Open Production Sheet
            </button>
          )}
          {currentRole === "Student" && (
            <button
              onClick={() => onNavigate("student-portal")}
              className="px-4 py-2 bg-emerald-700 text-white font-semibold text-xs rounded-lg hover:bg-emerald-800 transition shadow-sm flex items-center gap-1.5"
            >
              <Receipt className="w-4 h-4 text-emerald-200" />
              Browse Menu & Order
            </button>
          )}
          {currentRole === "Procurement Staff" && (
            <button
              onClick={() => onNavigate("procurement")}
              className="px-4 py-2 bg-emerald-700 text-white font-semibold text-xs rounded-lg hover:bg-emerald-800 transition shadow-sm flex items-center gap-1.5"
            >
              <Boxes className="w-4 h-4 text-emerald-200" />
              Generate Purchase Orders
            </button>
          )}
          {currentRole === "Administrator" && (
            <button
              onClick={() => onNavigate("multi-canteen")}
              className="px-4 py-2 bg-emerald-700 text-white font-semibold text-xs rounded-lg hover:bg-emerald-800 transition shadow-sm flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-200" />
              Multi-Canteen Benchmarking
            </button>
          )}
        </div>
      </div>

      {/* Role-Specific Metric Cards */}
      {currentRole === "Canteen Manager" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500 font-medium">Forecast WAPE</span>
            <div className="text-2xl font-bold text-slate-900 mt-1">8.4%</div>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">28.4% better than 4-wk baseline</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500 font-medium">Gross Margin (Projected)</span>
            <div className="text-2xl font-bold text-emerald-700 mt-1">67.2%</div>
            <p className="text-[11px] text-slate-500 mt-1">$2,190 Rev / $718 Food Cost</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500 font-medium">Preorders Recorded</span>
            <div className="text-2xl font-bold text-slate-900 mt-1">{preorders.length}</div>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">Guaranteed demand locked in</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500 font-medium">FEFO Inventory Priority</span>
            <div className="text-2xl font-bold text-amber-600 mt-1">3 Batches</div>
            <p className="text-[11px] text-slate-500 mt-1">Incorporated in current recipe plan</p>
          </div>
        </div>
      )}

      {currentRole === "Kitchen Staff" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500 font-medium">Initial Batch Status</span>
            <div className="text-2xl font-bold text-emerald-700 mt-1">340 portions</div>
            <p className="text-[11px] text-slate-500 mt-1">65% of daily target prepared</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500 font-medium">Reserve Ingredients</span>
            <div className="text-2xl font-bold text-blue-700 mt-1">180 portions</div>
            <p className="text-[11px] text-slate-500 mt-1">Prepped raw, awaiting checkpoint velocity</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500 font-medium">Holding Temp Compliance</span>
            <div className="text-2xl font-bold text-emerald-600 mt-1">64.5°C</div>
            <p className="text-[11px] text-slate-500 mt-1">Well above 60°C food safety floor</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500 font-medium">Mid-Service Checkpoint</span>
            <div className="text-2xl font-bold text-slate-800 mt-1">Due 12:45 PM</div>
            <p className="text-[11px] text-amber-600 font-semibold mt-1">Velocity evaluation incoming</p>
          </div>
        </div>
      )}

      {currentRole === "Student" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500 font-medium">My Active Preorders</span>
            <div className="text-2xl font-bold text-emerald-700 mt-1">{preorders.length}</div>
            <p className="text-[11px] text-slate-500 mt-1">Ready for pickup at Lunch service</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500 font-medium">Active 50% Surplus Offers</span>
            <div className="text-2xl font-bold text-amber-600 mt-1">{surplusOffers.filter(o => o.status === "Active").length}</div>
            <p className="text-[11px] text-slate-500 mt-1">Verified safe hot food at discounted price</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500 font-medium">Campus Food Waste Saved</span>
            <div className="text-2xl font-bold text-emerald-600 mt-1">482 kg CO₂e</div>
            <p className="text-[11px] text-slate-500 mt-1">Through smart batching and student preorders</p>
          </div>
        </div>
      )}

      {currentRole === "Procurement Staff" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500 font-medium">Stock Shortage Alerts</span>
            <div className="text-2xl font-bold text-red-600 mt-1">0 Critical</div>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">All recipe requirements fulfilled</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500 font-medium">Pending Purchase Orders</span>
            <div className="text-2xl font-bold text-slate-900 mt-1">2 POs</div>
            <p className="text-[11px] text-slate-500 mt-1">Apex Agro & Continental Grains</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500 font-medium">FEFO Batches in Stock</span>
            <div className="text-2xl font-bold text-amber-600 mt-1">4 Batches</div>
            <p className="text-[11px] text-slate-500 mt-1">Sorted by expiry date ascending</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500 font-medium">Supplier On-Time Rate</span>
            <div className="text-2xl font-bold text-emerald-700 mt-1">96.8%</div>
            <p className="text-[11px] text-slate-500 mt-1">Lead time compliance across 3 suppliers</p>
          </div>
        </div>
      )}

      {currentRole === "Administrator" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500 font-medium">Campus Canteens</span>
            <div className="text-2xl font-bold text-slate-900 mt-1">2 Active</div>
            <p className="text-[11px] text-slate-500 mt-1">Main Food Court & Innovation Wing Bistro</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500 font-medium">Average Waste / Meal</span>
            <div className="text-2xl font-bold text-emerald-700 mt-1">0.038 kg</div>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">Target is ≤ 0.045 kg (Passed)</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500 font-medium">Budget Adherence</span>
            <div className="text-2xl font-bold text-slate-900 mt-1">94.2%</div>
            <p className="text-[11px] text-slate-500 mt-1">Within institutional cap ($2,400 daily)</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500 font-medium">Audit Trail Status</span>
            <div className="text-2xl font-bold text-emerald-600 mt-1">Verified</div>
            <p className="text-[11px] text-slate-500 mt-1">Immutable log of approvals & stock delta</p>
          </div>
        </div>
      )}

      {/* Quick Access Matrix for Current Role */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-3">Recommended Actions for {currentRole}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={() => onNavigate(currentRole === "Student" ? "student-portal" : "command-center")}
            className="p-4 text-left rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 transition flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-bold text-slate-900">
                {currentRole === "Student" ? "View Today's Hot Menu" : "Manager Command Center"}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {currentRole === "Student" ? "Browse ingredients and verified allergens" : "Review demand predictions & batch plans"}
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => onNavigate(currentRole === "Student" ? "student-preorders" : "kitchen-board")}
            className="p-4 text-left rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 transition flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-bold text-slate-900">
                {currentRole === "Student" ? "Preorder Status & Star Rating" : "Live Kitchen Production Board"}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {currentRole === "Student" ? "Track order fulfillment & leave dish feedback" : "Check batches, checkpoints & stockout reporting"}
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => onNavigate("sustainability")}
            className="p-4 text-left rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 transition flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-bold text-slate-900">Canteen Sustainability Scorecard</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Track waste per meal, emissions saved & targets</p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
