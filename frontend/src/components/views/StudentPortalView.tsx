"use client";

import React, { useState } from "react";
import { MenuItem, SurplusOfferRecord } from "@/types";
import {
  UtensilsCrossed,
  Sparkles,
  Tag,
  Clock,
  Heart,
  ShieldCheck,
  CheckCircle2,
  Flame,
  Plus
} from "lucide-react";

interface StudentPortalViewProps {
  menuItems: MenuItem[];
  surplusOffers: SurplusOfferRecord[];
  onPlacePreorder: (item: MenuItem, portions: number, notes: string) => void;
  onReserveSurplus: (offerId: string) => void;
}

export const StudentPortalView: React.FC<StudentPortalViewProps> = ({
  menuItems,
  surplusOffers,
  onPlacePreorder,
  onReserveSurplus
}) => {
  const [filterDiet, setFilterDiet] = useState<string>("All");
  const [selectedItemForOrder, setSelectedItemForOrder] = useState<MenuItem | null>(null);
  const [orderPortions, setOrderPortions] = useState<number>(1);
  const [orderNotes, setOrderNotes] = useState<string>("");
  const [orderSuccessMsg, setOrderSuccessMsg] = useState<string | null>(null);

  const filteredItems = menuItems.filter(item => {
    if (filterDiet === "Veg") return item.is_veg;
    if (filterDiet === "Vegan") return item.is_vegan;
    if (filterDiet === "GlutenFree") return item.is_gluten_free;
    return true;
  });

  const handleConfirmPreorder = () => {
    if (selectedItemForOrder) {
      onPlacePreorder(selectedItemForOrder, orderPortions, orderNotes);
      setOrderSuccessMsg(`Preorder confirmed for ${orderPortions}x ${selectedItemForOrder.name}! Demand floor updated.`);
      setSelectedItemForOrder(null);
      setOrderPortions(1);
      setOrderNotes("");
      setTimeout(() => setOrderSuccessMsg(null), 4000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <UtensilsCrossed className="w-4 h-4 text-emerald-600" />
            Campus Dining & Student Portal
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Today's Fresh Menu, Dietary Transparency & Preorders
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Preorder ahead to secure your meal and help the kitchen cook exact quantities, minimizing campus food waste.
          </p>
        </div>

        {/* Preorder Cutoff Notice */}
        <div className="bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-600" />
          <span className="font-semibold text-emerald-900">Preorder Cutoff: 11:00 AM for Lunch</span>
        </div>
      </div>

      {orderSuccessMsg && (
        <div className="p-3 bg-emerald-100/80 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          {orderSuccessMsg}
        </div>
      )}

      {/* Novelty Feature 6: Safe Surplus Flash Offers Section */}
      {surplusOffers.filter(o => o.status === "Active" && o.food_safety_verified).length > 0 && (
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white rounded-2xl p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
              <h3 className="font-bold text-sm tracking-wide uppercase">
                Novelty Feature: Safe Surplus Flash Recovery Deals (50% Off)
              </h3>
            </div>
            <span className="text-[11px] font-bold bg-white text-amber-900 px-2.5 py-0.5 rounded-full">
              Food Safety Temperature Verified (≥ 60°C)
            </span>
          </div>
          <p className="text-xs text-amber-100 max-w-2xl leading-relaxed">
            Fresh, hot surplus food verified by Kitchen Staff. Available at 50% discount to prevent edible food from being discarded.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {surplusOffers.filter(o => o.status === "Active").map((off) => (
              <div key={off.id} className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-white">{off.item_name}</h4>
                  <div className="flex items-center gap-2 text-xs text-amber-200 mt-1">
                    <span className="line-through text-amber-300/80">${off.original_price.toFixed(2)}</span>
                    <span className="font-extrabold text-white text-sm">${off.discounted_price.toFixed(2)}</span>
                    <span>• {off.portions_available - off.portions_reserved} portions left</span>
                  </div>
                  <span className="text-[10px] text-amber-200/90 block mt-1">
                    Verified by {off.verified_by} at {off.temperature_verified_c}°C
                  </span>
                </div>

                <button
                  onClick={() => onReserveSurplus(off.id)}
                  className="px-3.5 py-2 bg-white text-amber-900 hover:bg-amber-50 font-bold text-xs rounded-lg transition shadow-xs flex items-center gap-1"
                >
                  <Tag className="w-3.5 h-3.5 text-amber-700" />
                  Claim Deal
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dietary Filter Pills */}
      <div className="flex items-center gap-2">
        {["All", "Veg", "Vegan", "GlutenFree"].map(tab => (
          <button
            key={tab}
            onClick={() => setFilterDiet(tab)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
              filterDiet === tab
                ? "bg-emerald-700 text-white shadow-xs"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {tab === "All" ? "All Dishes" : tab === "Veg" ? "🌱 Vegetarian Only" : tab === "Vegan" ? "🌿 Pure Vegan" : "🌾 Gluten-Free"}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 leading-tight">{item.name}</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">{item.category} • {item.cuisine}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  item.is_veg ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"
                }`}>
                  {item.is_veg ? "Vegetarian" : "Non-Veg"}
                </span>
              </div>

              {/* Nutrition and Allergen Row */}
              <div className="flex items-center gap-3 text-xs text-slate-600 mt-3 pt-3 border-t border-slate-100">
                <span>{item.calories} kcal</span>
                <span>•</span>
                <span>{item.protein_g}g Protein</span>
                <span>•</span>
                <span>{item.portion_size_g}g Portion</span>
              </div>

              {item.allergens && item.allergens.length > 0 && (
                <div className="text-[10px] text-amber-700 mt-2 font-medium">
                  Contains: {item.allergens.join(", ")}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <div className="text-base font-extrabold text-slate-900">
                ${item.price.toFixed(2)}
              </div>
              <button
                onClick={() => setSelectedItemForOrder(item)}
                className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg transition shadow-xs flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                Preorder
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Preorder Submission Modal */}
      {selectedItemForOrder && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-6 shadow-xl space-y-4">
            <h3 className="font-bold text-sm text-slate-900">
              Preorder: {selectedItemForOrder.name}
            </h3>
            <p className="text-xs text-slate-500">
              Unit price: <strong>${selectedItemForOrder.price.toFixed(2)}</strong>. Guaranteed meal pickup reserved at Lunch service.
            </p>

            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Number of Portions</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setOrderPortions(Math.max(1, orderPortions - 1))}
                  className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-700"
                >
                  -
                </button>
                <span className="font-extrabold text-base text-slate-900 w-8 text-center">{orderPortions}</span>
                <button
                  onClick={() => setOrderPortions(orderPortions + 1)}
                  className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-700"
                >
                  +
                </button>
                <span className="text-xs text-slate-500 font-semibold ml-2">
                  Total: ${(selectedItemForOrder.price * orderPortions).toFixed(2)}
                </span>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Optional Dietary Notes</label>
              <input
                type="text"
                placeholder="e.g. Less spicy, dressing on side"
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setSelectedItemForOrder(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPreorder}
                className="px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs"
              >
                Confirm Preorder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
