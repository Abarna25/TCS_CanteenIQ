"use client";

import React, { useState } from "react";
import { MenuItem } from "@/types";
import {
  Trash2,
  DollarSign,
  AlertTriangle,
  Leaf,
  Layers,
  ArrowRight,
  TrendingDown,
  Info
} from "lucide-react";

interface WasteAnalyticsViewProps {
  menuItems: MenuItem[];
}

export const WasteAnalyticsView: React.FC<WasteAnalyticsViewProps> = ({ menuItems }) => {
  // Ingredient propagation sample trace
  const [selectedDishId, setSelectedDishId] = useState<string>("item_01");

  const propagatedDishes = [
    {
      id: "item_01",
      name: "Mediterranean Grilled Chicken Bowl",
      prepared: 75,
      sold: 58,
      unsoldSurplus: 17,
      safeRecovered: 15,
      actuallyDiscarded: 2,
      portionCost: 2.85,
      totalLoss: 5.70,
      rootCause: "Mild walk-in footfall slowdown in last 20 mins of service window.",
      remedy: "Trim initial batch by 5 portions and assign to 30m mid-service reserve buffer.",
      ingredientsWasted: [
        { name: "Boneless Chicken Breast", wastedQty: "0.36 kg", unitCost: "$7.20 / kg", loss: "$2.59", perishable: true },
        { name: "Golden Quinoa", wastedQty: "0.16 kg", unitCost: "$5.40 / kg", loss: "$0.86", perishable: false },
        { name: "Assorted Bell Peppers", wastedQty: "0.14 kg", unitCost: "$3.50 / kg", loss: "$0.49", perishable: true }
      ]
    },
    {
      id: "item_05",
      name: "Durum Penne Rosa with Spinach",
      prepared: 60,
      sold: 48,
      unsoldSurplus: 12,
      safeRecovered: 10,
      actuallyDiscarded: 2,
      portionCost: 1.90,
      totalLoss: 3.80,
      rootCause: "Holding timer approached maximum threshold (3.5 hours).",
      remedy: "Publish 50% surplus recovery discount offer 40 minutes before session closure.",
      ingredientsWasted: [
        { name: "Durum Penne Pasta", wastedQty: "0.28 kg", unitCost: "$2.30 / kg", loss: "$0.64", perishable: false },
        { name: "Baby Spinach Leaves", wastedQty: "0.14 kg", unitCost: "$3.20 / kg", loss: "$0.45", perishable: true },
        { name: "Vine-Ripe Tomatoes", wastedQty: "0.24 kg", unitCost: "$1.90 / kg", loss: "$0.46", perishable: true }
      ]
    }
  ];

  const activeDish = propagatedDishes.find(d => d.id === selectedDishId) || propagatedDishes[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <Trash2 className="w-4 h-4 text-emerald-600" />
            Novelty Feature 3: Ingredient-Level Waste Propagation
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Food Waste Decomposition & Monetary Loss Accounting
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Traces leftover dishes backward into recipes, raw ingredients, and procurement to diagnose root causes and prevent repeat overproduction.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <Leaf className="w-4 h-4 text-emerald-600" />
            88.5% Surplus Safely Recovered
          </span>
        </div>
      </div>

      {/* 3 Metric Cards: Distinguishing Unsold Surplus vs Discarded Food */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Unsold Hotline Surplus</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">29 portions</div>
          <p className="text-[11px] text-slate-500 mt-1">Total portions remaining on hotline at service end</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-emerald-200 bg-emerald-50/40">
          <span className="text-xs text-emerald-800 font-medium uppercase tracking-wider">Safe Surplus Recovered</span>
          <div className="text-2xl font-bold text-emerald-900 mt-1">25 portions</div>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1">Sold at 50% discount via Student Flash Offers</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-red-200 bg-red-50/40">
          <span className="text-xs text-red-800 font-medium uppercase tracking-wider">Food Actually Discarded</span>
          <div className="text-2xl font-bold text-red-900 mt-1">4 portions</div>
          <p className="text-[11px] text-red-700 font-semibold mt-1">Actual direct financial loss: <strong>$9.50</strong></p>
        </div>
      </div>

      {/* Interactive Propagation Inspector */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Deconstruct Leftover Dish into Raw Ingredients</h3>
            <p className="text-xs text-slate-500">Select an item to view backward bill-of-materials trace</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Select Dish:</span>
            <select
              value={selectedDishId}
              onChange={(e) => setSelectedDishId(e.target.value)}
              className="px-3 py-1.5 text-xs font-semibold bg-slate-100 border border-slate-300 rounded-lg focus:outline-hidden"
            >
              <option value="item_01">Mediterranean Grilled Chicken Bowl</option>
              <option value="item_05">Durum Penne Rosa with Spinach</option>
            </select>
          </div>
        </div>

        {/* Trace Summary Card */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div>
            <span className="text-slate-400 font-semibold text-[10px] uppercase">Prepared</span>
            <p className="font-bold text-slate-900 text-base">{activeDish.prepared} portions</p>
          </div>
          <div>
            <span className="text-slate-400 font-semibold text-[10px] uppercase">Sold</span>
            <p className="font-bold text-slate-900 text-base">{activeDish.sold} portions</p>
          </div>
          <div>
            <span className="text-slate-400 font-semibold text-[10px] uppercase">Actually Discarded</span>
            <p className="font-bold text-red-700 text-base">{activeDish.actuallyDiscarded} portions</p>
          </div>
          <div>
            <span className="text-slate-400 font-semibold text-[10px] uppercase">Net Monetary Loss</span>
            <p className="font-bold text-red-700 text-base">${activeDish.totalLoss.toFixed(2)}</p>
          </div>
        </div>

        {/* Ingredient Breakdown Table */}
        <div>
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
            Raw Ingredient Quantities Lost in {activeDish.actuallyDiscarded} Discarded Portions
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[10px] border-y border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Ingredient</th>
                  <th className="py-2.5 px-3">Classification</th>
                  <th className="py-2.5 px-3 text-right">Wasted Quantity</th>
                  <th className="py-2.5 px-3 text-right">Supplier Unit Cost</th>
                  <th className="py-2.5 px-3 text-right">Financial Loss</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {activeDish.ingredientsWasted.map((ing, i) => (
                  <tr key={i} className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{ing.name}</td>
                    <td className="py-2.5 px-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                        ing.perishable ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-600"
                      }`}>
                        {ing.perishable ? "High Perishable" : "Dry / Stable"}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-medium text-slate-800">{ing.wastedQty}</td>
                    <td className="py-2.5 px-3 text-right text-slate-500">{ing.unitCost}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-red-700">{ing.loss}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Root Cause Diagnosis & Actionable Remedy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-950 space-y-1">
            <span className="font-bold flex items-center gap-1.5 text-amber-900">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              Root Cause Diagnosis:
            </span>
            <p className="leading-relaxed">{activeDish.rootCause}</p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-950 space-y-1">
            <span className="font-bold flex items-center gap-1.5 text-emerald-900">
              <Leaf className="w-3.5 h-3.5 text-emerald-600" />
              Prescriptive Production Remedy:
            </span>
            <p className="leading-relaxed">{activeDish.remedy}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
