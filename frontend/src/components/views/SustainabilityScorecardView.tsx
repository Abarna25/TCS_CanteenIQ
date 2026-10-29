"use client";

import React from "react";
import { SustainabilityScorecard } from "@/types";
import {
  Leaf,
  TrendingDown,
  Droplets,
  Award,
  CheckCircle2,
  AlertCircle,
  BarChart2,
  FileSpreadsheet
} from "lucide-react";

interface SustainabilityScorecardViewProps {
  scorecard: SustainabilityScorecard;
}

export const SustainabilityScorecardView: React.FC<SustainabilityScorecardViewProps> = ({
  scorecard
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <Leaf className="w-4 h-4 text-emerald-600" />
            Canteen Sustainability Scorecard & Impact Metrics
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Campus Food-Waste Prevention & Environmental Scorecard
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Tracks waste per meal served against the institutional sustainability standard (≤ 0.045 kg/meal).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <Award className="w-4 h-4 text-emerald-700" />
            Composite ESG Score: 92.4 / 100
          </span>
        </div>
      </div>

      {/* 4 Primary Formula-Driven Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Waste Per Meal */}
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <div className="flex justify-between items-center text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Waste Per Meal</span>
            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
              Goal Met
            </span>
          </div>
          <div className="text-2xl font-extrabold text-emerald-700">
            {scorecard.waste_per_meal_kg} <span className="text-xs font-normal text-slate-500">kg / meal</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-2">
            Target: <strong>≤ {scorecard.target_waste_per_meal_kg} kg</strong> (Formula: Discarded kg / Meals Served)
          </div>
        </div>

        {/* Metric 2: Forecast WAPE */}
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <div className="flex justify-between items-center text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Forecast Error (WAPE)</span>
            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
              Excellent
            </span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">
            {scorecard.forecast_wape}%
          </div>
          <div className="text-[11px] text-slate-500 mt-2">
            Formula: <code>Σ|Actual - Forecast| / Σ|Actual| × 100</code>
          </div>
        </div>

        {/* Metric 3: Safe Surplus Recovered */}
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <div className="flex justify-between items-center text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Surplus Recovery</span>
            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
              High
            </span>
          </div>
          <div className="text-2xl font-extrabold text-emerald-700">
            {scorecard.surplus_recovery_pct}%
          </div>
          <div className="text-[11px] text-slate-500 mt-2">
            Redistributed via verified 50% flash recovery offers
          </div>
        </div>

        {/* Metric 4: Stockout Rate */}
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <div className="flex justify-between items-center text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Stockout Rate</span>
            <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
              Protected
            </span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">
            {scorecard.stockout_rate_pct}%
          </div>
          <div className="text-[11px] text-slate-500 mt-2">
            Only 2 stockout events across 96 meal instances
          </div>
        </div>
      </div>

      {/* Environmental Savings Spotlight */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 text-white p-6 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">Avoided Carbon Footprint</span>
            <div className="text-3xl font-extrabold text-white mt-1">
              {scorecard.co2_emissions_avoided_kg} <span className="text-sm font-normal text-emerald-200">kg CO₂e</span>
            </div>
            <p className="text-xs text-emerald-200/80 mt-1 max-w-sm">
              Equivalent to taking 1,180 km of passenger car travel off campus roads this month.
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-emerald-300">
            <Leaf className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-teal-800 to-teal-900 text-white p-6 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider">Virtual Water Conserved</span>
            <div className="text-3xl font-extrabold text-white mt-1">
              {scorecard.water_saved_liters.toLocaleString()} <span className="text-sm font-normal text-teal-200">Liters</span>
            </div>
            <p className="text-xs text-teal-200/80 mt-1 max-w-sm">
              Agricultural embedded water saved by preventing upstream grain and dairy surplus.
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-teal-300">
            <Droplets className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Monthly Trend Evaluation */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-sm text-slate-900">6-Month Campus Food Waste Trend</h3>
            <p className="text-xs text-slate-500">Historical performance since deployment of CanteenIQ optimization flywheel</p>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
            -42.5% Waste Reduction Overall
          </span>
        </div>

        <div className="grid grid-cols-6 gap-2 text-center text-xs">
          {[
            { month: "May", waste: "0.068 kg", score: 72 },
            { month: "Jun", waste: "0.061 kg", score: 76 },
            { month: "Jul", waste: "0.054 kg", score: 81 },
            { month: "Aug", waste: "0.048 kg", score: 85 },
            { month: "Sep", waste: "0.042 kg", score: 89 },
            { month: "Oct (Now)", waste: "0.038 kg", score: 92 }
          ].map((m, idx) => (
            <div key={idx} className={`p-3 rounded-xl border ${idx === 5 ? "bg-emerald-50 border-emerald-300" : "bg-slate-50 border-slate-100"}`}>
              <span className="text-[10px] text-slate-400 font-bold uppercase">{m.month}</span>
              <p className="font-bold text-slate-800 text-sm mt-1">{m.waste}</p>
              <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">ESG {m.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
