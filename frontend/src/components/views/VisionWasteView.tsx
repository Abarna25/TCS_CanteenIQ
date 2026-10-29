"use client";

import React, { useState } from "react";
import {
  Camera,
  Upload,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  Eye,
  FileCheck
} from "lucide-react";

export const VisionWasteView: React.FC = () => {
  const [selectedSample, setSelectedSample] = useState<string>("plate_tray_sample.jpg");
  const [analyzed, setAnalyzed] = useState<boolean>(true);
  const [confirmed, setConfirmed] = useState<boolean>(false);

  const sampleImages = [
    { id: "tray_curry", label: "Tray A: Basmati Rice & Paneer Bowl", file: "sample_rice_tray.jpg" },
    { id: "tray_grill", label: "Tray B: Grilled Chicken & Greens", file: "sample_grill_tray.jpg" },
    { id: "tray_salad", label: "Tray C: Quinoa Salad Trimmings", file: "sample_salad_tray.jpg" }
  ];

  const analysisResult = {
    dish: "Paneer Tikka Masala Rice Bowl",
    totalWastePct: 24.5,
    estimatedWeightG: 105,
    estimatedLoss: 1.85,
    components: [
      { name: "Basmati Rice Residue", pct: 30.0, weight: "70g", confidence: 0.91 },
      { name: "Curry Gravy Residue", pct: 15.0, weight: "35g", confidence: 0.84 }
    ],
    modelType: "EfficientNet-B0 Visual Segmentation Fallback"
  };

  const handleConfirmLog = () => {
    setConfirmed(true);
    setTimeout(() => setConfirmed(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <Camera className="w-4 h-4 text-emerald-600" />
            Computer-Vision Plate Waste Estimation
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Visual Plate Residue Segmentation & Human-in-the-Loop Logging
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Analyzes tray photos, calculates estimated leftover area percentages, and requires human verification before recording.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-purple-800 bg-purple-50 border border-purple-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-600" />
            CV Segmentation Assisted
          </span>
        </div>
      </div>

      {confirmed && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Plate waste record verified and logged into Food Waste Analytics with manual human sign-off!
        </div>
      )}

      {/* Two-Column Interface */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Plate Photo & Sample Selector */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Select Dining Tray Capture
          </h3>

          <div className="space-y-2">
            {sampleImages.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setSelectedSample(s.file);
                  setAnalyzed(true);
                }}
                className={`w-full text-left p-3 rounded-xl border text-xs font-semibold transition ${
                  selectedSample === s.file
                    ? "border-emerald-600 bg-emerald-50/60 text-emerald-950"
                    : "border-slate-200 hover:bg-slate-50 text-slate-700"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Visual Plate Placeholder */}
          <div className="h-56 bg-slate-100 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-center p-4">
            <Camera className="w-10 h-10 text-slate-400 mb-2" />
            <div className="text-xs font-bold text-slate-700">Tray Capture Active: {selectedSample}</div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Visual plate boundary detected • Segmentation mask overlaid
            </p>
          </div>
        </div>

        {/* Right: AI Segmentation Breakdown & Human Confirmation */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Visual Segmentation Breakdown
              </h3>
              <p className="text-[11px] text-slate-500">{analysisResult.modelType}</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              {analysisResult.totalWastePct}% Leftover Area
            </span>
          </div>

          <div className="space-y-3">
            {analysisResult.components.map((comp, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900">{comp.name}</span>
                  <span className="text-slate-500 text-[11px] block mt-0.5">Estimated weight: {comp.weight}</span>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-slate-800">{comp.pct}% of portion</span>
                  <span className="text-[10px] text-emerald-700 block">Conf: {Math.round(comp.confidence * 100)}%</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 leading-tight">
            <strong>Human Confirmation Required:</strong> The AI vision model provides an initial estimate. You must review and confirm the portion before committing to institutional waste reports.
          </div>

          <button
            onClick={handleConfirmLog}
            className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition shadow-xs flex items-center justify-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-200" />
            Confirm & Log {analysisResult.estimatedWeightG}g Waste
          </button>
        </div>
      </div>
    </div>
  );
};
