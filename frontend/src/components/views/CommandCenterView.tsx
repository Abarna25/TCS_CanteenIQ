"use client";

import React from "react";
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Sparkles,
  ChefHat,
  ArrowRight,
  Boxes,
  Leaf,
  Clock,
  ShieldCheck,
  Flame,
  FileCheck
} from "lucide-react";

interface CommandCenterViewProps {
  onNavigate: (screen: string) => void;
  activePlanApproved: boolean;
  onApprovePlan: () => void;
}

export const CommandCenterView: React.FC<CommandCenterViewProps> = ({
  onNavigate,
  activePlanApproved,
  onApprovePlan
}) => {
  return (
    <div className="space-y-6">
      {/* Top Banner / Operational Briefing */}
      <div className="bg-gradient-to-r from-[#064e3b] via-[#065f46] to-[#047857] text-white p-6 rounded-2xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live Manager Command Center • Lunch Meal Session
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Main Food Court Operations</h2>
          <p className="text-emerald-100/80 text-xs mt-1 max-w-xl leading-relaxed">
            AI Demand Engine predicts <strong>540 total portions</strong> across 6 optimized items. Attendance is normal (940 expected). 3 student preorders locked in.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {!activePlanApproved ? (
            <button
              onClick={onApprovePlan}
              className="px-4 py-2 bg-emerald-400 text-emerald-950 font-bold text-xs rounded-lg hover:bg-emerald-300 transition shadow-sm flex items-center gap-1.5"
            >
              <FileCheck className="w-4 h-4" />
              Approve Production Plan (v1)
            </button>
          ) : (
            <div className="px-3.5 py-1.5 bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs font-bold rounded-lg flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Plan Approved & Locked (Kitchen Active)
            </div>
          )}

          <button
            onClick={() => onNavigate("smart-menu")}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-medium text-xs rounded-lg border border-white/20 transition flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            Smart Menu Studio
          </button>
        </div>
      </div>

      {/* 4 Core Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Expected Demand</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">540</span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">+4.8% vs Mon</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Confidence: <strong>91.4% (Low Uncertainty)</strong>
          </p>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Recommended Prep</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <ChefHat className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">520</span>
            <span className="text-xs text-slate-500 font-medium">portions</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Initial: <strong>340</strong> | Reserve Buffer: <strong>180</strong>
          </p>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Projected Food Cost</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Boxes className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">$1,068.50</span>
            <span className="text-xs font-medium text-emerald-600">Within Budget</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Daily Budget Cap: <strong>$1,200.00</strong> ($131.50 buffer)
          </p>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Predicted Waste Risk</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Leaf className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">3.8%</span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">-1.9% vs Baseline</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Est. Surplus: <strong>~19 portions</strong> (50% flash recovery eligible)
          </p>
        </div>
      </div>

      {/* Two-Column Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recommended Menu Items Overview (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Today's Optimized Menu Plan</h3>
              <p className="text-xs text-slate-500">Formulated under Profit-focused objective with FEFO inventory priority</p>
            </div>
            <button
              onClick={() => onNavigate("smart-menu")}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              Modify Constraints & Run Optimizer <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[10px] border-y border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Item Name</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3 text-right">Selling Price</th>
                  <th className="py-2.5 px-3 text-right">Cost / Port</th>
                  <th className="py-2.5 px-3 text-center">Batching (Init / Res)</th>
                  <th className="py-2.5 px-3 text-right">Contrib. Margin</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { name: "Paneer Tikka Masala Rice Bowl", cat: "Bowls & Curries", price: 6.20, cost: 2.20, init: 88, res: 47, isVeg: true, margin: "64.5%", fefo: true },
                  { name: "Mediterranean Grilled Chicken Bowl", cat: "Grills & Proteins", price: 7.50, cost: 2.85, init: 75, res: 40, isVeg: false, margin: "62.0%", fefo: true },
                  { name: "Classic Yellow Dal Tadka with Rice", cat: "Bowls & Curries", price: 4.80, cost: 1.35, init: 90, res: 50, isVeg: true, margin: "71.8%", fefo: false },
                  { name: "Durum Penne Rosa with Spinach", cat: "Main Course", price: 6.00, cost: 1.90, init: 60, res: 35, isVeg: true, margin: "68.3%", fefo: true },
                  { name: "Quinoa & Roasted Veggie Salad", cat: "Healthy Salads", price: 5.80, cost: 1.85, init: 50, res: 25, isVeg: true, margin: "68.1%", fefo: false },
                  { name: "Forest Berry Oat Crunch Smoothie", cat: "Beverages", price: 3.80, cost: 1.20, init: 40, res: 20, isVeg: true, margin: "68.4%", fefo: false }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/80 transition">
                    <td className="py-2.5 px-3 font-semibold text-slate-800 flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${row.isVeg ? "bg-emerald-500" : "bg-red-500"}`} />
                      {row.name}
                      {row.fefo && (
                        <span className="text-[9px] bg-amber-50 text-amber-700 border border-amber-200 px-1 py-0.2 rounded font-semibold">
                          FEFO
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">{row.cat}</td>
                    <td className="py-2.5 px-3 text-right font-medium text-slate-800">${row.price.toFixed(2)}</td>
                    <td className="py-2.5 px-3 text-right text-slate-600">${row.cost.toFixed(2)}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="font-bold text-emerald-800">{row.init}</span>
                      <span className="text-slate-400 mx-1">/</span>
                      <span className="text-slate-600">{row.res}</span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-emerald-700">{row.margin}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">
                        Optimized
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Inventory FEFO Alerts & Kitchen Live Status */}
        <div className="space-y-4">
          {/* FEFO Alerts Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-amber-700">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <h3 className="font-bold text-xs uppercase tracking-wider">FEFO Expiry Watchlist</h3>
              </div>
              <button
                onClick={() => onNavigate("inventory")}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                View Stock →
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-amber-50/70 border border-amber-200/80 rounded-lg">
                <div className="flex justify-between font-semibold text-amber-900">
                  <span>Fresh Paneer (Batch 092)</span>
                  <span className="text-red-600">Expires in 2 days</span>
                </div>
                <p className="text-[11px] text-amber-800/80 mt-0.5">14.0 kg in stock. Allocated 100% to Lunch & Dinner curry bowls.</p>
              </div>
              <div className="p-2.5 bg-amber-50/70 border border-amber-200/80 rounded-lg">
                <div className="flex justify-between font-semibold text-amber-900">
                  <span>Baby Spinach Leaves</span>
                  <span className="text-red-600">Expires in 2 days</span>
                </div>
                <p className="text-[11px] text-amber-800/80 mt-0.5">10.0 kg in stock. Allocated to Penne Rosa and Salad bar.</p>
              </div>
            </div>
          </div>

          {/* Quick Actions Shortcuts */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Operational Navigation</h4>
            
            <button
              onClick={() => onNavigate("kitchen-board")}
              className="w-full flex items-center justify-between p-2.5 rounded-lg border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/30 text-xs text-left font-medium text-slate-800 transition"
            >
              <div className="flex items-center gap-2">
                <ChefHat className="w-4 h-4 text-emerald-600" />
                <span>Kitchen Production Board (Batch Monitoring)</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => onNavigate("what-if")}
              className="w-full flex items-center justify-between p-2.5 rounded-lg border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/30 text-xs text-left font-medium text-slate-800 transition"
            >
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-purple-600" />
                <span>What-If Scenario Simulator (+/-10% Attendance)</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => onNavigate("sustainability")}
              className="w-full flex items-center justify-between p-2.5 rounded-lg border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/30 text-xs text-left font-medium text-slate-800 transition"
            >
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-emerald-600" />
                <span>Canteen Sustainability Scorecard</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
