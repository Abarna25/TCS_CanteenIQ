"use client";

import React, { useState } from "react";
import { MenuItem } from "@/types";
import {
  Receipt,
  Plus,
  Minus,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ArrowRight
} from "lucide-react";

interface PosSalesViewProps {
  menuItems: MenuItem[];
  onRecordOutcome: (data: any) => void;
}

export const PosSalesView: React.FC<PosSalesViewProps> = ({
  menuItems,
  onRecordOutcome
}) => {
  const [salesRecords, setSalesRecords] = useState([
    {
      id: "item_02",
      name: "Paneer Tikka Masala Rice Bowl",
      planned: 135,
      prepared: 88,
      sold: 62,
      remaining: 26,
      stockouts: 0,
      discarded: 0,
      safeRecovered: 16
    },
    {
      id: "item_01",
      name: "Mediterranean Grilled Chicken Bowl",
      planned: 110,
      prepared: 75,
      sold: 58,
      remaining: 17,
      stockouts: 0,
      discarded: 2,
      safeRecovered: 10
    },
    {
      id: "item_06",
      name: "Classic Yellow Dal Tadka with Steamed Rice",
      planned: 140,
      prepared: 90,
      sold: 70,
      remaining: 20,
      stockouts: 0,
      discarded: 1,
      safeRecovered: 15
    }
  ]);

  const [notification, setNotification] = useState<string | null>(null);

  const handleUpdate = (idx: number, field: string, delta: number) => {
    const updated = [...salesRecords];
    const rec = updated[idx];
    if (field === "sold") {
      rec.sold = Math.max(0, rec.sold + delta);
      rec.remaining = Math.max(0, rec.prepared - rec.sold);
    } else if (field === "discarded") {
      rec.discarded = Math.max(0, rec.discarded + delta);
    } else if (field === "stockouts") {
      rec.stockouts = Math.max(0, rec.stockouts + delta);
    }
    setSalesRecords(updated);
  };

  const handleCommitSession = () => {
    setNotification("Actual outcomes successfully reconciled and synchronized with Waste Propagation & Inventory.");
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <Receipt className="w-4 h-4 text-emerald-600" />
            POS & Actual Outcomes Logging
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Sales, Stockouts & End-of-Service Reconciliation
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Records prepared, sold, remaining, safe recovered, and discarded portions with strict reconciliation checks.
          </p>
        </div>

        <button
          onClick={handleCommitSession}
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg transition shadow-xs flex items-center gap-1.5"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-200" />
          Reconcile & Commit Session
        </button>
      </div>

      {notification && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          {notification}
        </div>
      )}

      {/* Reconciliation Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Menu Item</th>
                <th className="py-3 px-4 text-center">Planned</th>
                <th className="py-3 px-4 text-center">Prepared</th>
                <th className="py-3 px-4 text-center">Sold Portions</th>
                <th className="py-3 px-4 text-center">Remaining (Hotline)</th>
                <th className="py-3 px-4 text-center">Stockouts</th>
                <th className="py-3 px-4 text-center">Actually Discarded</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {salesRecords.map((row, idx) => (
                <tr key={row.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-4 font-semibold text-slate-900">{row.name}</td>
                  <td className="py-3 px-4 text-center font-medium text-slate-600">{row.planned}</td>
                  <td className="py-3 px-4 text-center font-bold text-slate-800">{row.prepared}</td>
                  <td className="py-3 px-4 text-center">
                    <div className="inline-flex items-center gap-1.5 bg-slate-100 px-2 py-1 rounded-lg">
                      <button
                        onClick={() => handleUpdate(idx, "sold", -1)}
                        className="w-5 h-5 bg-white rounded flex items-center justify-center text-slate-700 hover:bg-slate-200"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-extrabold text-slate-900 w-8">{row.sold}</span>
                      <button
                        onClick={() => handleUpdate(idx, "sold", +1)}
                        className="w-5 h-5 bg-white rounded flex items-center justify-center text-slate-700 hover:bg-slate-200"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center font-bold text-emerald-700">{row.remaining}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleUpdate(idx, "stockouts", +1)}
                      className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                        row.stockouts > 0 ? "bg-red-100 text-red-800" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {row.stockouts > 0 ? `${row.stockouts} Stockouts` : "+ Log"}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => handleUpdate(idx, "discarded", -1)}
                        className="w-5 h-5 bg-slate-100 rounded flex items-center justify-center text-slate-700"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-bold text-red-700 w-6">{row.discarded}</span>
                      <button
                        onClick={() => handleUpdate(idx, "discarded", +1)}
                        className="w-5 h-5 bg-slate-100 rounded flex items-center justify-center text-slate-700"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
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
