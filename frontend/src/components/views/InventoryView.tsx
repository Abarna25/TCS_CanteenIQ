"use client";

import React, { useState } from "react";
import { Ingredient, InventoryBatch } from "@/types";
import {
  Boxes,
  AlertTriangle,
  Clock,
  Plus,
  Search,
  CheckCircle2,
  Calendar,
  Filter
} from "lucide-react";

interface InventoryViewProps {
  ingredients: Ingredient[];
  batches: InventoryBatch[];
  onAdjustStock: (ingredientId: string, delta: number, reason: string) => void;
}

export const InventoryView: React.FC<InventoryViewProps> = ({
  ingredients,
  batches,
  onAdjustStock
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Stock adjust modal
  const [adjustingIng, setAdjustingIng] = useState<Ingredient | null>(null);
  const [adjustDelta, setAdjustDelta] = useState<number>(0);
  const [adjustReason, setAdjustReason] = useState<string>("Damaged / Spoilage");

  const filteredIngredients = ingredients.filter(ing => {
    const matchesSearch = ing.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === "All" || ing.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleConfirmAdjust = () => {
    if (adjustingIng && adjustDelta !== 0) {
      onAdjustStock(adjustingIng.id, adjustDelta, adjustReason);
      setAdjustingIng(null);
      setAdjustDelta(0);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <Boxes className="w-4 h-4 text-emerald-600" />
            Inventory & Expiry Management
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Raw Ingredient Stocks & FEFO Batch Expiry Tracking
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Enforces First-Expiring-First-Out (FEFO) prioritization across recipes to minimize shelf-life expiration.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            3 Batches Expiring in ≤ 4 Days
          </span>
        </div>
      </div>

      {/* FEFO Priority Expiry Alert Banner */}
      <div className="bg-white rounded-xl border border-amber-200 p-5 shadow-xs space-y-3">
        <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-600" />
          Active FEFO Batches Requiring Menu Prioritization
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {batches.slice(0, 3).map((b) => (
            <div key={b.id} className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs space-y-1">
              <div className="flex justify-between items-center font-bold text-slate-900">
                <span>{b.ingredient_name}</span>
                <span className="text-red-700 font-extrabold text-[11px] bg-red-100 px-1.5 py-0.5 rounded">
                  Exp: {b.expiry_date}
                </span>
              </div>
              <div className="flex justify-between text-slate-600 text-[11px]">
                <span>Batch: {b.batch_code}</span>
                <span className="font-semibold">{b.quantity} {b.unit}</span>
              </div>
              <div className="text-[10px] text-amber-800 font-medium pt-1 border-t border-amber-200/60">
                Prioritized in Smart Menu Studio optimizer.
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden"
          >
            <option value="All">All Categories</option>
            <option value="Dairy">Dairy</option>
            <option value="Produce">Produce</option>
            <option value="Protein">Protein</option>
            <option value="Grains">Grains</option>
            <option value="Spices">Spices</option>
          </select>
        </div>
      </div>

      {/* Ingredient Stock Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Ingredient Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Storage Type</th>
                <th className="py-3 px-4 text-right">Unit Cost</th>
                <th className="py-3 px-4 text-right">Current Stock</th>
                <th className="py-3 px-4 text-right">Min Threshold</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredIngredients.map((ing) => {
                const isLow = ing.current_stock <= ing.min_stock_threshold;
                return (
                  <tr key={ing.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4 font-semibold text-slate-900">{ing.name}</td>
                    <td className="py-3 px-4 text-slate-600">{ing.category}</td>
                    <td className="py-3 px-4 text-slate-500">{ing.storage_type}</td>
                    <td className="py-3 px-4 text-right font-medium text-slate-700">${ing.unit_cost.toFixed(2)} / {ing.unit}</td>
                    <td className="py-3 px-4 text-right font-bold text-slate-900">
                      {ing.current_stock.toFixed(1)} {ing.unit}
                    </td>
                    <td className="py-3 px-4 text-right text-slate-500">{ing.min_stock_threshold} {ing.unit}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        isLow ? "bg-red-50 text-red-700 border border-red-200" : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      }`}>
                        {isLow ? "Low Stock" : "Adequate"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => {
                          setAdjustingIng(ing);
                          setAdjustDelta(0);
                        }}
                        className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                      >
                        Adjust ±
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stock Adjustment Modal */}
      {adjustingIng && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-6 shadow-xl space-y-4">
            <h3 className="font-bold text-sm text-slate-900">
              Adjust Stock: {adjustingIng.name}
            </h3>
            <p className="text-xs text-slate-500">
              Current stock: <strong>{adjustingIng.current_stock} {adjustingIng.unit}</strong>. All modifications are tracked in the immutable audit log.
            </p>

            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                Adjustment Quantity ({adjustingIng.unit}) - Positive to add, negative to deduct
              </label>
              <input
                type="number"
                step="0.5"
                value={adjustDelta}
                onChange={(e) => setAdjustDelta(Number(e.target.value))}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden font-bold"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                Mandatory Operational Reason
              </label>
              <select
                value={adjustReason}
                onChange={(e) => setAdjustReason(e.target.value)}
                className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden"
              >
                <option value="Damaged / Spoilage">Damaged / Spoilage</option>
                <option value="Supplier Over-Delivery">Supplier Over-Delivery</option>
                <option value="Physical Audit Discrepancy">Physical Audit Discrepancy</option>
                <option value="Pre-Prep Trimming Loss">Pre-Prep Trimming Loss</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setAdjustingIng(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAdjust}
                className="px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs"
              >
                Confirm Adjustment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
