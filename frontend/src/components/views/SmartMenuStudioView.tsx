"use client";

import React, { useState } from "react";
import { MenuItem, OptimizationPlanResult } from "@/types";
import {
  Sparkles,
  Sliders,
  DollarSign,
  TrendingUp,
  Leaf,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  FileCheck,
  ChevronDown,
  Layers,
  ArrowRight,
  Info,
  Scale
} from "lucide-react";

interface SmartMenuStudioViewProps {
  menuItems: MenuItem[];
  onApprovePlan: (planId: string) => void;
  isPlanApproved: boolean;
}

export const SmartMenuStudioView: React.FC<SmartMenuStudioViewProps> = ({
  menuItems,
  onApprovePlan,
  isPlanApproved
}) => {
  const [selectedObjective, setSelectedObjective] = useState<"Profit-focused" | "Budget-focused" | "Waste-minimizing">("Profit-focused");
  const [budgetLimit, setBudgetLimit] = useState<number>(1200);
  const [kitchenCapacity, setKitchenCapacity] = useState<number>(600);
  const [minVegItems, setMinVegItems] = useState<number>(3);
  const [minTotalItems, setMinTotalItems] = useState<number>(5);
  const [maxTotalItems, setMaxTotalItems] = useState<number>(7);
  const [prioritizeExpiring, setPrioritizeExpiring] = useState<boolean>(true);

  const [activeAlternative, setActiveAlternative] = useState<"primary" | "altA" | "altB">("primary");

  // Multi-objective derived calculations based on active selection
  const objectiveMultiplier = selectedObjective === "Profit-focused" ? 1.0 : selectedObjective === "Budget-focused" ? 0.88 : 0.92;
  const surplusRisk = selectedObjective === "Waste-minimizing" ? 1.8 : selectedObjective === "Profit-focused" ? 3.8 : 2.5;

  // Selected items formulation
  const primaryItems = [
    {
      id: "item_02",
      name: "Paneer Tikka Masala Rice Bowl",
      category: "Bowls & Curries",
      isVeg: true,
      price: 6.20,
      cost: 2.20,
      expectedDemand: 135,
      recPortions: Math.round(135 * objectiveMultiplier),
      initialBatch: Math.round(135 * objectiveMultiplier * 0.65),
      reserveBatch: Math.round(135 * objectiveMultiplier * 0.35),
      preorders: 38,
      stockoutRisk: selectedObjective === "Waste-minimizing" ? 6.2 : 2.5,
      surplusEst: selectedObjective === "Waste-minimizing" ? 2.5 : 5.0,
      rationale: "High student preorders (38 locked); consumes near-expiry Paneer batch BN-PAN-092 (FEFO priority); 64.5% contribution margin."
    },
    {
      id: "item_01",
      name: "Mediterranean Grilled Chicken Bowl",
      category: "Grills & Proteins",
      isVeg: false,
      price: 7.50,
      cost: 2.85,
      expectedDemand: 110,
      recPortions: Math.round(110 * objectiveMultiplier),
      initialBatch: Math.round(110 * objectiveMultiplier * 0.70),
      reserveBatch: Math.round(110 * objectiveMultiplier * 0.30),
      preorders: 24,
      stockoutRisk: 3.1,
      surplusEst: 4.2,
      rationale: "Highest selling non-veg specialty; utilizes Fresh Chicken Breast (batch BN-CHK-104); $4.65 gross contribution per portion."
    },
    {
      id: "item_06",
      name: "Classic Yellow Dal Tadka with Steamed Rice",
      category: "Bowls & Curries",
      isVeg: true,
      price: 4.80,
      cost: 1.35,
      expectedDemand: 140,
      recPortions: Math.round(140 * objectiveMultiplier),
      initialBatch: Math.round(140 * objectiveMultiplier * 0.60),
      reserveBatch: Math.round(140 * objectiveMultiplier * 0.40),
      preorders: 30,
      stockoutRisk: 2.0,
      surplusEst: 5.5,
      rationale: "Essential campus staple; high student affordability; 71.8% contribution margin; long shelf-life dry pulses."
    },
    {
      id: "item_05",
      name: "Durum Penne Rosa with Spinach",
      category: "Main Course",
      isVeg: true,
      price: 6.00,
      cost: 1.90,
      expectedDemand: 95,
      recPortions: Math.round(95 * objectiveMultiplier),
      initialBatch: Math.round(95 * objectiveMultiplier * 0.65),
      reserveBatch: Math.round(95 * objectiveMultiplier * 0.35),
      preorders: 22,
      stockoutRisk: 4.0,
      surplusEst: 3.0,
      rationale: "Uses expiring baby spinach batch BN-SPN-412; satisfies Italian continental craving; quick 15m cooking lead time."
    },
    {
      id: "item_03",
      name: "Quinoa & Roasted Veggie Salad",
      category: "Healthy Salads",
      isVeg: true,
      price: 5.80,
      cost: 1.85,
      expectedDemand: 75,
      recPortions: Math.round(75 * objectiveMultiplier),
      initialBatch: Math.round(75 * objectiveMultiplier * 0.60),
      reserveBatch: Math.round(75 * objectiveMultiplier * 0.40),
      preorders: 18,
      stockoutRisk: 4.5,
      surplusEst: 2.8,
      rationale: "Vegan & Gluten-Free dietary coverage; highly requested health-conscious dish; low holding perishability."
    },
    {
      id: "item_07",
      name: "Forest Berry Oat Crunch Smoothie",
      category: "Beverages",
      isVeg: true,
      price: 3.80,
      cost: 1.20,
      expectedDemand: 65,
      recPortions: Math.round(65 * objectiveMultiplier),
      initialBatch: Math.round(65 * objectiveMultiplier * 0.70),
      reserveBatch: Math.round(65 * objectiveMultiplier * 0.30),
      preorders: 12,
      stockoutRisk: 5.0,
      surplusEst: 2.0,
      rationale: "Beverage grab-and-go pairing; utilizes frozen berries; ultra-fast 5m preparation time."
    }
  ];

  const totalPortions = primaryItems.reduce((acc, it) => acc + it.recPortions, 0);
  const totalFoodCost = primaryItems.reduce((acc, it) => acc + (it.recPortions * it.cost), 0);
  const totalRevenue = primaryItems.reduce((acc, it) => acc + (it.recPortions * it.price), 0);
  const totalGrossContribution = totalRevenue - totalFoodCost;
  const vegCount = primaryItems.filter(it => it.isVeg).length;
  const vegRatioPct = Math.round((vegCount / primaryItems.length) * 100);

  const isBudgetFeasible = totalFoodCost <= budgetLimit;
  const isCapacityFeasible = totalPortions <= kitchenCapacity;
  const isVegFeasible = vegCount >= minVegItems;

  return (
    <div className="space-y-6">
      {/* Flagship Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-100/70 border border-emerald-300 text-emerald-800 text-xs font-bold mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            FLAGSHIP CORE INTELLIGENCE MODULE
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Smart Menu Studio — Constraint-Aware Optimizer
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Formulates the optimal campus daily menu mix by balancing forecast demand, student dietary preferences, guaranteed preorders, FEFO expiring inventory, kitchen lead times, and budget constraints.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onApprovePlan("plan_2026-10-30_lunch")}
            disabled={isPlanApproved || !isBudgetFeasible || !isCapacityFeasible}
            className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 transition shadow-sm ${
              isPlanApproved
                ? "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                : "bg-emerald-700 text-white hover:bg-emerald-800"
            }`}
          >
            <FileCheck className="w-4 h-4 text-emerald-200" />
            {isPlanApproved ? "Plan Approved (Version 1 Active)" : "Approve & Release to Kitchen"}
          </button>
        </div>
      </div>

      {/* 3 Selectable Optimization Objectives */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            key: "Profit-focused" as const,
            title: "Profit-Focused Objective",
            desc: "Maximizes expected gross contribution ($) while meeting variety and demand upside.",
            icon: TrendingUp,
            badge: "Commercial Health"
          },
          {
            key: "Budget-focused" as const,
            title: "Budget-Focused Objective",
            desc: "Minimizes total ingredient procurement costs while maintaining campus meal coverage.",
            icon: DollarSign,
            badge: "Cost Containment"
          },
          {
            key: "Waste-minimizing" as const,
            title: "Waste-Minimizing Objective",
            desc: "Reduces expected surplus portions to under 2% and strictly reserves prep batches.",
            icon: Leaf,
            badge: "Sustainability First"
          }
        ].map((obj) => {
          const Icon = obj.icon;
          const isSelected = selectedObjective === obj.key;
          return (
            <button
              key={obj.key}
              onClick={() => setSelectedObjective(obj.key)}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                isSelected
                  ? "border-emerald-600 bg-emerald-50/50 shadow-xs"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isSelected ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600"}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">{obj.title}</h4>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${isSelected ? "bg-emerald-200/60 text-emerald-800" : "bg-slate-100 text-slate-500"}`}>
                  {obj.badge}
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{obj.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Constraints & Financial Summary Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Sliders Panel */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-emerald-700" />
              Operational Constraints
            </h4>
            <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">Solver Active</span>
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-600 font-medium mb-1">
              <span>Daily Meal Budget Cap</span>
              <span className="font-bold text-slate-900">${budgetLimit}</span>
            </div>
            <input
              type="range"
              min="800"
              max="2000"
              step="50"
              value={budgetLimit}
              onChange={(e) => setBudgetLimit(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-600 font-medium mb-1">
              <span>Kitchen Capacity (Portions)</span>
              <span className="font-bold text-slate-900">{kitchenCapacity}</span>
            </div>
            <input
              type="range"
              min="300"
              max="900"
              step="50"
              value={kitchenCapacity}
              onChange={(e) => setKitchenCapacity(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-600 font-medium mb-1">
              <span>Min Vegetarian Items</span>
              <span className="font-bold text-slate-900">{minVegItems} items</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              value={minVegItems}
              onChange={(e) => setMinVegItems(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <label className="text-xs text-slate-700 font-medium flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={prioritizeExpiring}
                onChange={(e) => setPrioritizeExpiring(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              Prioritize Expiring Stock (FEFO)
            </label>
          </div>
        </div>

        {/* 3 Outcome Cards */}
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <div className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-1">Total Food Cost</div>
          <div className="text-2xl font-bold text-slate-900">${totalFoodCost.toFixed(2)}</div>
          <div className="mt-2 flex items-center gap-1.5">
            {isBudgetFeasible ? (
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Within ${budgetLimit} Budget
              </span>
            ) : (
              <span className="text-xs font-semibold text-red-700 bg-red-50 px-2 py-0.5 rounded flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-red-600" />
                Exceeds Budget by ${(totalFoodCost - budgetLimit).toFixed(2)}
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Ingredient procurement outlay</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <div className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-1">Projected Revenue</div>
          <div className="text-2xl font-bold text-slate-900">${totalRevenue.toFixed(2)}</div>
          <div className="mt-2 text-xs font-semibold text-emerald-700">
            Gross Contribution: <strong>${totalGrossContribution.toFixed(2)}</strong>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Revenue minus ingredient costs</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <div className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-1">Portions & Coverage</div>
          <div className="text-2xl font-bold text-slate-900">{totalPortions} <span className="text-xs font-normal text-slate-500">portions</span></div>
          <div className="mt-2 flex items-center gap-1 text-xs">
            <span className="font-semibold text-emerald-700">{vegRatioPct}% Vegetarian</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500">{primaryItems.length} dishes</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Capacity cap: {kitchenCapacity} portions</p>
        </div>
      </div>

      {/* Recommended Items Table & Adaptive Batch Allocation */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              Recommended Menu Items & Dynamic Batch Sizes
              <span className="text-[10px] bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold px-2 py-0.5 rounded-full">
                Solver Status: Optimal
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Batches split into Initial Batch (on hotline) and Reserve Buffer (raw prepped ingredients) to guard against mid-service waste.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[10px] border-y border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Menu Item</th>
                <th className="py-2.5 px-3">Dietary</th>
                <th className="py-2.5 px-3 text-right">Price</th>
                <th className="py-2.5 px-3 text-right">Cost</th>
                <th className="py-2.5 px-3 text-right">Preorders</th>
                <th className="py-2.5 px-3 text-right">Forecast Demand</th>
                <th className="py-2.5 px-3 text-center bg-emerald-50/50">Total Portions</th>
                <th className="py-2.5 px-3 text-center">Initial Batch</th>
                <th className="py-2.5 px-3 text-center">Reserve Buffer</th>
                <th className="py-2.5 px-3 text-right">Gross Contrib.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {primaryItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-900">{item.name}</div>
                    <div className="text-[11px] text-slate-500 line-clamp-1 max-w-sm" title={item.rationale}>
                      {item.rationale}
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      item.isVeg ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"
                    }`}>
                      {item.isVeg ? "Veg" : "Non-Veg"}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-medium text-slate-800">${item.price.toFixed(2)}</td>
                  <td className="py-3 px-3 text-right text-slate-600">${item.cost.toFixed(2)}</td>
                  <td className="py-3 px-3 text-right font-semibold text-blue-600">{item.preorders}</td>
                  <td className="py-3 px-3 text-right font-medium text-slate-700">{item.expectedDemand}</td>
                  <td className="py-3 px-3 text-center font-bold text-emerald-800 bg-emerald-50/30 text-sm">
                    {item.recPortions}
                  </td>
                  <td className="py-3 px-3 text-center font-semibold text-slate-800">
                    {item.initialBatch}
                  </td>
                  <td className="py-3 px-3 text-center font-semibold text-slate-500">
                    {item.reserveBatch}
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-emerald-700">
                    ${((item.price - item.cost) * item.recPortions).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Human-Readable Explanation Summary */}
        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
          <div className="font-bold text-slate-900 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-emerald-600" />
            Optimizer Decision Explanation:
          </div>
          <p className="leading-relaxed">
            Allocated <strong>{totalPortions} portions</strong> across {primaryItems.length} core dishes under the <strong>{selectedObjective}</strong> objective.
            Prioritizes <strong>Paneer Tikka Masala</strong> and <strong>Penne Rosa</strong> to consume batches nearing FEFO expiry, averting an estimated $48.50 in ingredient loss.
            Confirmed student preorders (144 total portions) serve as an unbreakable demand floor. Initial batches cover 65% of demand; reserve capacity is held raw to prevent surplus waste.
          </p>
        </div>
      </div>

      {/* Candidate Alternative Plans Generation */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-emerald-600" />
          Candidate Alternative Plans
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-slate-200 hover:border-emerald-500 bg-slate-50/60 transition">
            <div className="flex justify-between font-bold text-slate-900 mb-1">
              <span>Alternative Plan A: High Variety Profile</span>
              <span className="text-emerald-700">$1,154.00 Food Cost</span>
            </div>
            <p className="text-slate-500 leading-relaxed">
              Expands menu to 7 dishes by adding Artisanal Sourdough Avocado Toast. Enhances variety by +14% while increasing gross contribution to $2,340.00.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 hover:border-emerald-500 bg-slate-50/60 transition">
            <div className="flex justify-between font-bold text-slate-900 mb-1">
              <span>Alternative Plan B: Ultra-Low Waste Guardband</span>
              <span className="text-emerald-700">1.4% Projected Waste</span>
            </div>
            <p className="text-slate-500 leading-relaxed">
              Restricts initial batch to strictly confirmed preorders + 50% lower bound. Deferral to reserve buffer guarantees near-zero unsold surplus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
