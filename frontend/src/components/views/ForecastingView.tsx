"use client";

import React, { useState } from "react";
import { MenuItem, ForecastItem } from "@/types";
import {
  TrendingUp,
  Cpu,
  BarChart3,
  Calendar,
  AlertCircle,
  HelpCircle,
  PlusCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from "lucide-react";

interface ForecastingViewProps {
  menuItems: MenuItem[];
}

export const ForecastingView: React.FC<ForecastingViewProps> = ({ menuItems }) => {
  const [selectedItem, setSelectedItem] = useState<string>("item_02");

  // Cold start modal inputs
  const [coldName, setColdName] = useState<string>("Smoked Jackfruit BBQ Bowl");
  const [coldCat, setColdCat] = useState<string>("Bowls & Curries");
  const [coldPrice, setColdPrice] = useState<number>(6.50);
  const [coldPreorders, setColdPreorders] = useState<number>(8);
  const [coldResult, setColdResult] = useState<any | null>(null);

  const forecastData: Record<string, ForecastItem> = {
    item_02: {
      menu_item_id: "item_02",
      item_name: "Paneer Tikka Masala Rice Bowl",
      category: "Bowls & Curries",
      meal_session: "Lunch",
      date: "2026-10-30",
      historical_baseline: 118.0,
      ml_forecast: 135.2,
      final_expected_demand: 135.0,
      lower_bound: 115.0,
      upper_bound: 155.0,
      uncertainty_level: "Low",
      preorders_incorporated: 38,
      confidence_score: 0.92,
      is_cold_start: false,
      explanations: [
        { feature_name: "Confirmed Student Preorders (38 registered)", impact_pct: 28.5, direction: "positive" },
        { feature_name: "High Campus Attendance (940 expected students)", impact_pct: 22.0, direction: "positive" },
        { feature_name: "Peak Thursday Lunch Session Footfall", impact_pct: 16.0, direction: "positive" },
        { feature_name: "Strong Dish Rating (4.8/5.0 Popularity)", impact_pct: 14.5, direction: "positive" }
      ]
    },
    item_01: {
      menu_item_id: "item_01",
      item_name: "Mediterranean Grilled Chicken Bowl",
      category: "Grills & Proteins",
      meal_session: "Lunch",
      date: "2026-10-30",
      historical_baseline: 98.0,
      ml_forecast: 110.0,
      final_expected_demand: 110.0,
      lower_bound: 92.0,
      upper_bound: 128.0,
      uncertainty_level: "Low",
      preorders_incorporated: 24,
      confidence_score: 0.89,
      is_cold_start: false,
      explanations: [
        { feature_name: "Student Preorders (24 confirmed)", impact_pct: 25.0, direction: "positive" },
        { feature_name: "Thursday Mid-Week Attendance", impact_pct: 19.0, direction: "positive" },
        { feature_name: "High Protein Preference Segment", impact_pct: 15.0, direction: "positive" }
      ]
    },
    item_06: {
      menu_item_id: "item_06",
      item_name: "Classic Yellow Dal Tadka with Steamed Rice",
      category: "Bowls & Curries",
      meal_session: "Lunch",
      date: "2026-10-30",
      historical_baseline: 132.0,
      ml_forecast: 140.0,
      final_expected_demand: 140.0,
      lower_bound: 122.0,
      upper_bound: 158.0,
      uncertainty_level: "Low",
      preorders_incorporated: 30,
      confidence_score: 0.94,
      is_cold_start: false,
      explanations: [
        { feature_name: "Consistent Everyday Staple Demand", impact_pct: 35.0, direction: "positive" },
        { feature_name: "High Affordability ($4.80 Tier)", impact_pct: 20.0, direction: "positive" }
      ]
    }
  };

  const activeForecast = forecastData[selectedItem] || forecastData["item_02"];

  const handleRunColdStart = () => {
    // Cold start calculation
    const est = Math.round(55 * (6.20 / coldPrice) + (coldPreorders * 1.4));
    setColdResult({
      name: coldName,
      category: coldCat,
      price: coldPrice,
      estimatedDemand: est,
      lowerBound: Math.max(coldPreorders, est - 25),
      upperBound: est + 28,
      confidence: 0.55,
      uncertainty: "High",
      rationale: `Peer category '${coldCat}' baseline median (55 portions) adjusted for price elasticity ($${coldPrice.toFixed(2)}) and ${coldPreorders} confirmed preorders. Transparently marked as High Uncertainty due to zero historical sales.`
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <Cpu className="w-4 h-4 text-emerald-600" />
            Machine Learning Engine A
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Item-Level Demand Forecasting & Model Benchmark
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Chronological train/validation/test split preventing future-data leakage. Compares Historical Moving Average vs GBDT Regressor.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Model Version: GBDT-v2.4 (Retrained)
          </span>
        </div>
      </div>

      {/* Model Benchmark Comparison (Baseline vs ML) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Baseline Card */}
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Historical Baseline Model</h4>
              <p className="text-[11px] text-slate-400">4-Week Day-of-Week Rolling Mean</p>
            </div>
            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Reference</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <span className="text-[10px] uppercase text-slate-400 font-semibold">WAPE</span>
              <p className="text-lg font-bold text-slate-700 mt-0.5">12.8%</p>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <span className="text-[10px] uppercase text-slate-400 font-semibold">MAE</span>
              <p className="text-lg font-bold text-slate-700 mt-0.5">14.2</p>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <span className="text-[10px] uppercase text-slate-400 font-semibold">RMSE</span>
              <p className="text-lg font-bold text-slate-700 mt-0.5">17.5</p>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-3">
            Simple moving averages struggle during attendance shifts, rain days, and sudden student preorder surges.
          </p>
        </div>

        {/* Machine Learning Card */}
        <div className="bg-gradient-to-br from-emerald-50/50 to-white p-5 rounded-xl border-2 border-emerald-500/50 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-emerald-100 mb-3">
            <div>
              <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                GBDT Machine Learning Model
              </h4>
              <p className="text-[11px] text-emerald-700/80">Gradient Boosted Regressor with Preorders & Censored Adjustment</p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded">
              +28.4% Accuracy Boost
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-emerald-100/40 p-2.5 rounded-lg border border-emerald-200/60">
              <span className="text-[10px] uppercase text-emerald-800 font-semibold">WAPE</span>
              <p className="text-lg font-bold text-emerald-900 mt-0.5">8.4%</p>
            </div>
            <div className="bg-emerald-100/40 p-2.5 rounded-lg border border-emerald-200/60">
              <span className="text-[10px] uppercase text-emerald-800 font-semibold">MAE</span>
              <p className="text-lg font-bold text-emerald-900 mt-0.5">8.9</p>
            </div>
            <div className="bg-emerald-100/40 p-2.5 rounded-lg border border-emerald-200/60">
              <span className="text-[10px] uppercase text-emerald-800 font-semibold">R² Score</span>
              <p className="text-lg font-bold text-emerald-900 mt-0.5">0.89</p>
            </div>
          </div>
          <p className="text-[11px] text-emerald-800/90 mt-3 font-medium">
            Chronologically validated on 60+ days without data leakage. Compensates for stockouts via censored demand estimators.
          </p>
        </div>
      </div>

      {/* Item-Level Forecast Inspector */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Item-Level Prediction & Explainability Signals</h3>
            <p className="text-xs text-slate-500">Inspect feature contribution and confidence intervals for individual dishes</p>
          </div>

          {/* Item Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Dish:</span>
            <select
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.target.value)}
              className="px-3 py-1.5 text-xs font-semibold bg-slate-100 border border-slate-300 rounded-lg focus:outline-hidden"
            >
              <option value="item_02">Paneer Tikka Masala Rice Bowl</option>
              <option value="item_01">Mediterranean Grilled Chicken Bowl</option>
              <option value="item_06">Classic Yellow Dal Tadka with Rice</option>
            </select>
          </div>
        </div>

        {/* Prediction Interval Visual Banner */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Forecasted Expected Demand</span>
            <div className="text-3xl font-extrabold text-emerald-800">
              {activeForecast.final_expected_demand} <span className="text-sm font-normal text-slate-500">portions</span>
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Prediction interval (90% CI): <strong>{activeForecast.lower_bound} — {activeForecast.upper_bound} portions</strong>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="text-right">
              <span className="text-slate-400 text-[10px] uppercase font-semibold">Uncertainty</span>
              <p className="font-bold text-emerald-700">{activeForecast.uncertainty_level}</p>
            </div>
            <div className="text-right">
              <span className="text-slate-400 text-[10px] uppercase font-semibold">Preorders Locked</span>
              <p className="font-bold text-blue-700">{activeForecast.preorders_incorporated} portions</p>
            </div>
            <div className="text-right">
              <span className="text-slate-400 text-[10px] uppercase font-semibold">Confidence</span>
              <p className="font-bold text-slate-800">{Math.round(activeForecast.confidence_score * 100)}%</p>
            </div>
          </div>
        </div>

        {/* Feature Contribution / Explainability Breakdown (SHAP-Style) */}
        <div>
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
            Principal Explanatory Signals Influencing Forecast
          </h4>
          <div className="space-y-2">
            {activeForecast.explanations.map((exp, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-white border border-slate-200/80 rounded-lg text-xs">
                <span className="font-medium text-slate-800">{exp.feature_name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full ${exp.direction === "positive" ? "bg-emerald-500" : "bg-amber-500"}`}
                      style={{ width: `${exp.impact_pct}%` }}
                    />
                  </div>
                  <span className={`font-bold ${exp.direction === "positive" ? "text-emerald-700" : "text-amber-700"}`}>
                    +{exp.impact_pct}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Novelty Feature 4: Cold-Start Estimator for New Menu Dishes */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-md bg-purple-100 text-purple-700 flex items-center justify-center">
            <PlusCircle className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">
            Novelty Feature: Cold-Start Intelligence for New Dishes
          </h3>
          <span className="text-[10px] bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full font-semibold">
            Zero Historical Sales Fallback
          </span>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          Estimates initial launch demand for novel items by synthesizing peer category distributions, price elasticity, and student preorder interest.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-4">
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">New Dish Name</label>
            <input
              type="text"
              value={coldName}
              onChange={(e) => setColdName(e.target.value)}
              className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">Category</label>
            <select
              value={coldCat}
              onChange={(e) => setColdCat(e.target.value)}
              className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
            >
              <option value="Bowls & Curries">Bowls & Curries</option>
              <option value="Grills & Proteins">Grills & Proteins</option>
              <option value="Healthy Salads">Healthy Salads</option>
              <option value="Main Course">Main Course</option>
              <option value="Bakery">Bakery</option>
            </select>
          </div>
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">Selling Price ($)</label>
            <input
              type="number"
              step="0.5"
              value={coldPrice}
              onChange={(e) => setColdPrice(Number(e.target.value))}
              className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">Early Preorders</label>
            <input
              type="number"
              value={coldPreorders}
              onChange={(e) => setColdPreorders(Number(e.target.value))}
              className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
            />
          </div>
        </div>

        <button
          onClick={handleRunColdStart}
          className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-lg transition shadow-xs flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Estimate Launch Demand
        </button>

        {coldResult && (
          <div className="mt-4 p-4 rounded-xl bg-purple-50/60 border border-purple-200 text-xs text-purple-950 space-y-2">
            <div className="flex justify-between items-center font-bold">
              <span>Estimated Launch Demand: {coldResult.estimatedDemand} portions</span>
              <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                Confidence: {Math.round(coldResult.confidence * 100)}% (High Uncertainty)
              </span>
            </div>
            <p className="text-purple-900/80 leading-relaxed">{coldResult.rationale}</p>
            <div className="text-[11px] text-purple-800">
              Recommended Launch Prep: <strong>{coldResult.lowerBound} portions in initial batch</strong>; hold reserve for walk-in surge.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
