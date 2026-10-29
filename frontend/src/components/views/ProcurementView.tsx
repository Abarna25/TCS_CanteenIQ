"use client";

import React, { useState } from "react";
import { Supplier, Ingredient } from "@/types";
import {
  Truck,
  Boxes,
  Plus,
  CheckCircle2,
  AlertTriangle,
  FileText,
  DollarSign,
  Clock
} from "lucide-react";

interface ProcurementViewProps {
  suppliers: Supplier[];
  ingredients: Ingredient[];
}

export const ProcurementView: React.FC<ProcurementViewProps> = ({
  suppliers,
  ingredients
}) => {
  const [activeTab, setActiveTab] = useState<"requirements" | "orders">("requirements");

  // Automated Purchase Requirements derived from optimized menu
  const purchaseRequirements = [
    {
      id: "req_01",
      ingredient: "Basmati Rice",
      category: "Grains",
      requiredQty: 48.0,
      unit: "kg",
      currentStock: 180.0,
      shortfall: 0.0,
      packSize: 25.0,
      packsToOrder: 2,
      supplier: "Continental Grains & Millers",
      leadTime: "2 Days",
      unitCost: 1.80,
      totalCost: 90.00,
      status: "Covered by Inventory"
    },
    {
      id: "req_02",
      ingredient: "Fresh Cottage Cheese (Paneer)",
      category: "Dairy",
      requiredQty: 18.9,
      unit: "kg",
      currentStock: 24.0,
      shortfall: 0.0,
      packSize: 5.0,
      packsToOrder: 4,
      supplier: "Heritage Dairy Farms",
      leadTime: "1 Day",
      unitCost: 6.50,
      totalCost: 130.00,
      status: "FEFO Stock Depleting"
    },
    {
      id: "req_03",
      ingredient: "Boneless Chicken Breast",
      category: "Protein",
      requiredQty: 19.8,
      unit: "kg",
      currentStock: 38.0,
      shortfall: 0.0,
      packSize: 10.0,
      packsToOrder: 2,
      supplier: "Apex Agro & Fresh Produce",
      leadTime: "1 Day",
      unitCost: 7.20,
      totalCost: 144.00,
      status: "Sufficient"
    },
    {
      id: "req_04",
      ingredient: "Vine-Ripe Tomatoes",
      category: "Produce",
      requiredQty: 22.0,
      unit: "kg",
      currentStock: 45.0,
      shortfall: 0.0,
      packSize: 10.0,
      packsToOrder: 2,
      supplier: "Apex Agro & Fresh Produce",
      leadTime: "1 Day",
      unitCost: 1.90,
      totalCost: 38.00,
      status: "Sufficient"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <Truck className="w-4 h-4 text-emerald-600" />
            Supply Chain & Procurement Intelligence
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Recipe-Driven Replenishment & Pack Size Optimization
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Converts approved menu portions into exact supplier pack sizes, deducting on-hand inventory and lead times.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            onClick={() => setActiveTab("requirements")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
              activeTab === "requirements" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600"
            }`}
          >
            Ingredient Requirements
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
              activeTab === "orders" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600"
            }`}
          >
            Active Purchase Orders
          </button>
        </div>
      </div>

      {activeTab === "requirements" && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Projected Ingredient Requirements for Today's Approved Menu
            </h3>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              Total Order Outlay: $402.00
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[10px] border-y border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Ingredient</th>
                  <th className="py-2.5 px-3">Supplier</th>
                  <th className="py-2.5 px-3 text-right">Required Qty</th>
                  <th className="py-2.5 px-3 text-right">On-Hand Stock</th>
                  <th className="py-2.5 px-3 text-center">Pack Size</th>
                  <th className="py-2.5 px-3 text-center">Packs to Order</th>
                  <th className="py-2.5 px-3 text-right">Expected Cost</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {purchaseRequirements.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-3 font-semibold text-slate-900">{row.ingredient}</td>
                    <td className="py-3 px-3 text-slate-600">{row.supplier}</td>
                    <td className="py-3 px-3 text-right font-medium text-slate-800">{row.requiredQty} {row.unit}</td>
                    <td className="py-3 px-3 text-right text-slate-600">{row.currentStock} {row.unit}</td>
                    <td className="py-3 px-3 text-center text-slate-500">{row.packSize} {row.unit}</td>
                    <td className="py-3 px-3 text-center font-bold text-emerald-700">{row.packsToOrder} packs</td>
                    <td className="py-3 px-3 text-right font-bold text-slate-900">${row.totalCost.toFixed(2)}</td>
                    <td className="py-3 px-3 text-center">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        row.status.includes("FEFO")
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "orders" && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Issued Purchase Orders & Supplier Dispatch
            </h3>
            <button
              onClick={() => alert("New PO Issued: PO-2026-1030-01 to Apex Agro for $182.00")}
              className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg transition shadow-xs flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              Generate PO
            </button>
          </div>

          <div className="space-y-3">
            {[
              { po: "PO-2026-1028-09", supplier: "Heritage Dairy Farms", items: "Fresh Paneer (4 packs)", cost: "$130.00", date: "2026-10-28", status: "Received", badge: "bg-emerald-100 text-emerald-800" },
              { po: "PO-2026-1029-02", supplier: "Continental Grains & Millers", items: "Basmati Rice (2 bags), Quinoa (1 bag)", cost: "$144.00", date: "2026-10-29", status: "In Transit", badge: "bg-blue-100 text-blue-800" },
              { po: "PO-2026-1030-01", supplier: "Apex Agro & Fresh Produce", items: "Chicken Breast, Bell Peppers, Spinach", cost: "$182.00", date: "2026-10-30", status: "Submitted", badge: "bg-amber-100 text-amber-800" }
            ].map((order, i) => (
              <div key={i} className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{order.po}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${order.badge}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-slate-600 mt-1">{order.supplier} • {order.items}</p>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-sm text-slate-900">{order.cost}</span>
                  <p className="text-[10px] text-slate-400 mt-0.5">Order Date: {order.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
