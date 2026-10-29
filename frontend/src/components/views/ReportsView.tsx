"use client";

import React from "react";
import {
  FileSpreadsheet,
  Download,
  Calendar,
  FileText,
  DollarSign,
  TrendingDown
} from "lucide-react";

export const ReportsView: React.FC = () => {
  const handleDownloadCSV = (reportType: string) => {
    // Generate CSV export
    let csvContent = "data:text/csv;charset=utf-8,";
    if (reportType === "daily") {
      csvContent += "Date,MealSession,PlannedPortions,PreparedPortions,SoldPortions,SurplusPortions,DiscardedPortions,FoodCost,Revenue,GrossContribution,WasteLoss\n";
      csvContent += "2026-10-30,Lunch,520,520,491,29,4,1068.50,3280.00,2211.50,9.50\n";
      csvContent += "2026-10-29,Lunch,510,510,485,25,3,1042.00,3190.00,2148.00,7.10\n";
    } else {
      csvContent += "Month,Canteen,TotalMealsServed,TotalFoodCost,TotalRevenue,GrossMargin,WastePerMealKg,ForecastWAPE,SurplusRecoveryPct\n";
      csvContent += "October 2026,Main Food Court,14250,29840.00,89250.00,59410.00,0.038,8.4%,88.5%\n";
      csvContent += "October 2026,Innovation Wing Bistro,6800,16660.00,44200.00,27540.00,0.049,11.2%,76.0%\n";
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `canteeniq_${reportType}_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            Financial & Operational Reports
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Daily Reconciliation, Cost Variance & CSV Exports
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Export production metrics, gross contributions, and audited food-waste loss logs for institutional reporting.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleDownloadCSV("daily")}
            className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg transition shadow-xs flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-emerald-200" />
            Export Daily Reconciliation CSV
          </button>
        </div>
      </div>

      {/* Available Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm text-slate-900">Daily Production & Reconciliation</h3>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold">Daily</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Item-by-item breakdown of planned vs prepared, actual sold portions, unsold surplus, safe recovery, and monetary waste loss.
          </p>
          <button
            onClick={() => handleDownloadCSV("daily")}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-lg transition flex items-center justify-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            Download CSV
          </button>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm text-slate-900">Monthly Institutional Audit</h3>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold">Monthly</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Consolidated totals for meals served, raw ingredient spending, gross contribution, and sustainability scores across all canteens.
          </p>
          <button
            onClick={() => handleDownloadCSV("monthly")}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-lg transition flex items-center justify-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            Download CSV
          </button>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm text-slate-900">Procurement & Price Variance</h3>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold">Supply</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Tracks contract pack pricing versus actual invoiced costs across all 3 suppliers, highlighting inflation shifts.
          </p>
          <button
            onClick={() => handleDownloadCSV("daily")}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-lg transition flex items-center justify-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            Download CSV
          </button>
        </div>
      </div>
    </div>
  );
};
