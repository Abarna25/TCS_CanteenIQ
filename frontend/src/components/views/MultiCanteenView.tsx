"use client";

import React from "react";
import { SustainabilityScorecard } from "@/types";
import {
  Building2,
  TrendingUp,
  Leaf,
  Scale,
  Award,
  ArrowRight,
  ShieldCheck
} from "lucide-react";

interface MultiCanteenViewProps {
  scorecards: Record<string, SustainabilityScorecard>;
}

export const MultiCanteenView: React.FC<MultiCanteenViewProps> = ({ scorecards }) => {
  const canteensList = Object.values(scorecards);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <Building2 className="w-4 h-4 text-emerald-600" />
            Institutional Multi-Canteen Benchmarking
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Cross-Canteen Operational Comparison & Sustainability Audit
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Standardizes metrics across campus locations (Tech Tower Food Court vs Innovation Wing Bistro).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            Tenant Isolation: TCS Innovation Campus (2 Canteens)
          </span>
        </div>
      </div>

      {/* Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {canteensList.map((canteen) => (
          <div key={canteen.canteen_id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">{canteen.canteen_name}</h3>
                <span className="text-xs text-slate-400">Reporting Window: {canteen.reporting_period}</span>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Score: {canteen.composite_sustainability_score} / 100
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 text-[10px] uppercase font-semibold">Waste Per Meal</span>
                <p className="text-lg font-bold text-slate-900 mt-0.5">{canteen.waste_per_meal_kg} kg</p>
                <span className="text-[10px] text-emerald-600 font-medium">Target: ≤ 0.045 kg</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 text-[10px] uppercase font-semibold">Forecast Error (WAPE)</span>
                <p className="text-lg font-bold text-slate-900 mt-0.5">{canteen.forecast_wape}%</p>
                <span className="text-[10px] text-emerald-600 font-medium">ML Driven</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 text-[10px] uppercase font-semibold">Food Cost Per Meal</span>
                <p className="text-lg font-bold text-slate-900 mt-0.5">${canteen.food_cost_per_meal.toFixed(2)}</p>
                <span className="text-[10px] text-slate-500 font-medium">Raw Ingredients</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 text-[10px] uppercase font-semibold">Surplus Recovery</span>
                <p className="text-lg font-bold text-slate-900 mt-0.5">{canteen.surplus_recovery_pct}%</p>
                <span className="text-[10px] text-emerald-600 font-medium">Flash Offers</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Student Satisfaction: <strong>{canteen.student_satisfaction_score} / 5.0</strong></span>
              <span className="font-semibold text-emerald-700">{canteen.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Normalization & Data Definition Statement */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 leading-relaxed">
        <strong>Data Comparability Standard:</strong> Metrics are normalized across operating capacity (Main Food Court: 1,200 portions/day; Innovation Wing Bistro: 600 portions/day). Only compatible time windows and verified scale weights are included in comparative rankings.
      </div>
    </div>
  );
};
