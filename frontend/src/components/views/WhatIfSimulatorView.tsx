"use client";

import React, { useState } from "react";
import { MenuItem } from "@/types";
import {
  Sliders,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  DollarSign,
  ArrowRight,
  Flame,
  Layers
} from "lucide-react";

interface WhatIfSimulatorViewProps {
  menuItems: MenuItem[];
  onApplyScenarioToLivePlan: (scenarioTitle: string) => void;
}

export const WhatIfSimulatorView: React.FC<WhatIfSimulatorViewProps> = ({
  menuItems,
  onApplyScenarioToLivePlan
}) => {
  const [attendanceDeltaPct, setAttendanceDeltaPct] = useState<number>(-10);
  const [inflationDeltaPct, setInflationDeltaPct] = useState<number>(15);
  const [initialBatchRatio, setInitialBatchRatio] = useState<number>(65);
  const [disableItem, setDisableItem] = useState<boolean>(false);
  const [appliedMsg, setAppliedMsg] = useState<string | null>(null);

  // Baseline metrics
  const basePortions = 540;
  const baseCost = 1068.50;
  const baseRevenue = 3280.00;
  const baseGrossMargin = baseRevenue - baseCost;
  const baseSurplus = 21.0;

  // Counterfactual recalculation
  const attendanceFactor = 1.0 + (attendanceDeltaPct / 100);
  const costFactor = 1.0 + (inflationDeltaPct / 100);

  const disabledPenalty = disableItem ? 0.85 : 1.0;

  const simPortions = Math.round(basePortions * attendanceFactor * disabledPenalty);
  const simCost = Math.round((simPortions / basePortions) * baseCost * costFactor * 100) / 100;
  const simRevenue = Math.round((simPortions / basePortions) * baseRevenue * 100) / 100;
  const simGrossMargin = Math.round((simRevenue - simCost) * 100) / 100;

  const simSurplus = attendanceDeltaPct < 0
    ? Math.round(baseSurplus * 1.35 * (100 / initialBatchRatio) * 0.6)
    : Math.round(baseSurplus * 0.9);

  const deltaPortions = simPortions - basePortions;
  const deltaCost = simCost - baseCost;
  const deltaMargin = simGrossMargin - baseGrossMargin;

  const handleApply = () => {
    const title = `Scenario: Att ${attendanceDeltaPct > 0 ? "+" : ""}${attendanceDeltaPct}%, Cost +${inflationDeltaPct}%`;
    onApplyScenarioToLivePlan(title);
    setAppliedMsg(`Scenario '${title}' successfully applied as Version 2 of today's Production Plan!`);
    setTimeout(() => setAppliedMsg(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <Sliders className="w-4 h-4 text-emerald-600" />
            Novelty Feature 5: Explainable What-If Scenario Lab
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Stress-Test Canteen Plans Against Operational Shocks
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Simulate attendance fluctuations, supply chain inflation, or dish unavailability without touching live production sheets until approved.
          </p>
        </div>

        <button
          onClick={handleApply}
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg transition shadow-xs flex items-center gap-1.5"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-200" />
          Apply Scenario to New Plan Version
        </button>
      </div>

      {appliedMsg && (
        <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          {appliedMsg}
        </div>
      )}

      {/* Interactive Controls & Scenario Dials */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Flame className="w-4 h-4 text-purple-600" />
          Configure Stress Parameters
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Slider 1: Attendance Shift */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
              <span>Campus Footfall / Attendance:</span>
              <span className={`font-bold ${attendanceDeltaPct < 0 ? "text-amber-600" : "text-emerald-700"}`}>
                {attendanceDeltaPct > 0 ? "+" : ""}{attendanceDeltaPct}%
              </span>
            </div>
            <input
              type="range"
              min="-30"
              max="30"
              step="5"
              value={attendanceDeltaPct}
              onChange={(e) => setAttendanceDeltaPct(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>-30% (Heavy Rain / Strike)</span>
              <span>Baseline (0%)</span>
              <span>+30% (Campus Event)</span>
            </div>
          </div>

          {/* Slider 2: Ingredient Price Inflation */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
              <span>Ingredient Price Inflation:</span>
              <span className="font-bold text-red-600">+{inflationDeltaPct}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              step="5"
              value={inflationDeltaPct}
              onChange={(e) => setInflationDeltaPct(Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>0% Stable</span>
              <span>+15% Moderate</span>
              <span>+30% Severe Shock</span>
            </div>
          </div>

          {/* Slider 3: Initial Batch vs Reserve Split */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
              <span>Initial Batch Ratio:</span>
              <span className="font-bold text-blue-700">{initialBatchRatio}% Initial</span>
            </div>
            <input
              type="range"
              min="50"
              max="85"
              step="5"
              value={initialBatchRatio}
              onChange={(e) => setInitialBatchRatio(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>50% High Reserve</span>
              <span>65% Balanced</span>
              <span>85% High Rush</span>
            </div>
          </div>
        </div>

        {/* Toggle Shock: Supply Chain Shortage */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <label className="text-xs text-slate-800 font-medium flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={disableItem}
              onChange={(e) => setDisableItem(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500"
            />
            Simulate Supply Shock: Paneer unavailable from dairy supplier (Trigger Auto-Substitution)
          </label>

          <button
            onClick={() => {
              setAttendanceDeltaPct(0);
              setInflationDeltaPct(0);
              setInitialBatchRatio(65);
              setDisableItem(false);
            }}
            className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset to Baseline
          </button>
        </div>
      </div>

      {/* Side-by-Side Comparison Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Baseline Plan */}
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wider pb-2 border-b border-slate-100">
            <span>Approved Baseline Plan</span>
            <span>Version 1</span>
          </div>
          <div className="mt-3 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Total Portions:</span>
              <span className="font-bold text-slate-900">{basePortions}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Food Procurement Cost:</span>
              <span className="font-bold text-slate-900">${baseCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Projected Revenue:</span>
              <span className="font-bold text-slate-900">${baseRevenue.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Gross Margin:</span>
              <span className="font-bold text-emerald-700">${baseGrossMargin.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Expected Surplus:</span>
              <span className="font-bold text-slate-700">{baseSurplus} portions</span>
            </div>
          </div>
        </div>

        {/* Counterfactual Simulated Plan */}
        <div className="bg-white p-5 rounded-xl border-2 border-purple-500/60 bg-purple-50/20 shadow-xs">
          <div className="flex justify-between text-xs font-bold text-purple-950 uppercase tracking-wider pb-2 border-b border-purple-100">
            <span>Simulated Scenario Plan</span>
            <span className="text-purple-700">Dynamic Calc</span>
          </div>
          <div className="mt-3 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-600">Simulated Portions:</span>
              <span className="font-extrabold text-slate-900">{simPortions}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Food Procurement Cost:</span>
              <span className="font-extrabold text-slate-900">${simCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Projected Revenue:</span>
              <span className="font-extrabold text-slate-900">${simRevenue.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Gross Margin:</span>
              <span className="font-extrabold text-purple-900">${simGrossMargin.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Expected Surplus:</span>
              <span className="font-extrabold text-slate-800">{simSurplus} portions</span>
            </div>
          </div>
        </div>

        {/* Absolute & Percentage Variance Deltas */}
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wider pb-2 border-b border-slate-100">
            <span>Variance & Deltas</span>
            <span>Impact</span>
          </div>
          <div className="mt-3 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Portion Adjustment:</span>
              <span className={`font-bold ${deltaPortions < 0 ? "text-amber-600" : "text-emerald-700"}`}>
                {deltaPortions > 0 ? "+" : ""}{deltaPortions} portions
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Cost Delta:</span>
              <span className={`font-bold ${deltaCost > 0 ? "text-red-600" : "text-emerald-700"}`}>
                {deltaCost > 0 ? "+" : ""}${deltaCost.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Margin Delta:</span>
              <span className={`font-bold ${deltaMargin < 0 ? "text-red-600" : "text-emerald-700"}`}>
                {deltaMargin > 0 ? "+" : ""}${deltaMargin.toFixed(2)}
              </span>
            </div>
            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 leading-tight">
              {attendanceDeltaPct < 0 ? (
                <span className="text-emerald-700 font-semibold">
                  Prevented ~${Math.abs(deltaCost * 0.45).toFixed(2)} in discarded food by automatically trimming initial batches.
                </span>
              ) : (
                <span className="text-purple-700 font-semibold">
                  Captured additional student footfall while protecting gross margin.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
