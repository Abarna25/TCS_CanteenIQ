"use client";

import React, { useState } from "react";
import {
  UploadCloud,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Sparkles,
  ArrowRight
} from "lucide-react";

export const DataImportView: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<string>("kaggle");
  const [previewLoaded, setPreviewLoaded] = useState<boolean>(true);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // Kaggle Food Demand Forecasting dataset schema inspection preview
  const kaggleSampleRows = [
    { id: "1379560", week: "1", center_id: "55", meal_id: "1885", checkout_price: "136.83", base_price: "152.29", emailer_promo: "0", op_area: "3.7", num_orders: "177", status: "Valid" },
    { id: "1466964", week: "1", center_id: "55", meal_id: "1993", checkout_price: "136.83", base_price: "135.83", emailer_promo: "0", op_area: "3.7", num_orders: "270", status: "Valid" },
    { id: "1346255", week: "1", center_id: "55", meal_id: "2539", checkout_price: "134.86", base_price: "135.86", emailer_promo: "0", op_area: "3.7", num_orders: "189", status: "Valid" },
    { id: "1338232", week: "1", center_id: "55", meal_id: "2139", checkout_price: "339.50", base_price: "437.53", emailer_promo: "0", op_area: "3.7", num_orders: "54", status: "Valid" },
    { id: "1448490", week: "1", center_id: "55", meal_id: "2631", checkout_price: "NULL", base_price: "150.00", emailer_promo: "1", op_area: "3.7", num_orders: "-10", status: "Malformed (Negative Order Count & Null Price)" }
  ];

  const handleCommitImport = () => {
    setImportStatus("Import completed: 4 valid records ingested into historical dataset. 1 malformed row rejected with diagnostic log.");
    setTimeout(() => setImportStatus(null), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <UploadCloud className="w-4 h-4 text-emerald-600" />
            Data Import, Data Quality & Model Management
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            CSV Ingestion Wizard & Kaggle Food Demand Schema Support
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Validates column mappings, flags anomalies (e.g. negative orders or missing prices), and isolates historical training records from live pilot telemetry.
          </p>
        </div>

        <button
          onClick={handleCommitImport}
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg transition shadow-xs flex items-center gap-1.5"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-200" />
          Ingest & Retrain Model
        </button>
      </div>

      {importStatus && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          {importStatus}
        </div>
      )}

      {/* Upload & Preset Selector */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Select Schema Template or Upload Custom CSV
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedPreset("kaggle")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                selectedPreset === "kaggle" ? "bg-emerald-700 text-white" : "bg-slate-100 text-slate-700"
              }`}
            >
              Kaggle Food Demand Preset
            </button>
            <button
              onClick={() => setSelectedPreset("custom")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                selectedPreset === "custom" ? "bg-emerald-700 text-white" : "bg-slate-100 text-slate-700"
              }`}
            >
              CanteenIQ Standard Schema
            </button>
          </div>
        </div>

        {/* Upload Dropzone Preview */}
        <div className="p-6 border-2 border-dashed border-slate-200 rounded-xl text-center space-y-2 bg-slate-50/60">
          <FileSpreadsheet className="w-8 h-8 text-slate-400 mx-auto" />
          <div className="text-xs font-bold text-slate-800">
            Loaded File: <span className="text-emerald-700">train_food_demand_sample.csv</span> (5 rows preview)
          </div>
          <p className="text-[11px] text-slate-500">
            Column mapping auto-detected: meal_id → menu_item_id, num_orders → actual_sold, week → temporal_index.
          </p>
        </div>
      </div>

      {/* Schema Inspection & Validation Table */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Data Quality & Anomaly Detection Preview
          </h3>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
            1 Malformed Row Detected & Quarantined
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[10px] border-y border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Record ID</th>
                <th className="py-2.5 px-3">Week</th>
                <th className="py-2.5 px-3">Center ID</th>
                <th className="py-2.5 px-3">Meal ID</th>
                <th className="py-2.5 px-3 text-right">Checkout Price</th>
                <th className="py-2.5 px-3 text-right">Base Price</th>
                <th className="py-2.5 px-3 text-right">Orders (Target)</th>
                <th className="py-2.5 px-3 text-center">Validation Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {kaggleSampleRows.map((r, i) => (
                <tr key={i} className={`hover:bg-slate-50/80 ${r.status.includes("Malformed") ? "bg-red-50/40" : ""}`}>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">{r.id}</td>
                  <td className="py-2.5 px-3 text-slate-600">{r.week}</td>
                  <td className="py-2.5 px-3 text-slate-600">{r.center_id}</td>
                  <td className="py-2.5 px-3 font-medium text-emerald-800">{r.meal_id}</td>
                  <td className="py-2.5 px-3 text-right text-slate-700">${r.checkout_price}</td>
                  <td className="py-2.5 px-3 text-right text-slate-700">${r.base_price}</td>
                  <td className="py-2.5 px-3 text-right font-bold text-slate-900">{r.num_orders}</td>
                  <td className="py-2.5 px-3 text-center">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      r.status.includes("Malformed") ? "bg-red-100 text-red-800" : "bg-emerald-100 text-emerald-800"
                    }`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
