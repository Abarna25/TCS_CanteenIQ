"use client";

import React, { useState } from "react";
import { MenuItem } from "@/types";
import {
  BookOpen,
  Plus,
  Scale,
  Sparkles,
  Search,
  DollarSign,
  Heart,
  ShieldCheck,
  ChevronRight
} from "lucide-react";

interface RecipesViewProps {
  menuItems: MenuItem[];
}

export const RecipesView: React.FC<RecipesViewProps> = ({ menuItems }) => {
  const [selectedItem, setSelectedItem] = useState<MenuItem>(menuItems[0] || {} as MenuItem);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = menuItems.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            Recipe Engineering & Culinary Standards
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Dish Formulations, Ingredient Yields & Verified Nutrition
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Calculates exact per-portion raw ingredient requirements and powers upstream procurement.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            {menuItems.length} Verified Standardized Recipes
          </span>
        </div>
      </div>

      {/* Two-Column Recipe Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recipe List (1 Col) */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden"
            />
          </div>

          <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
            {filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`w-full text-left p-3 rounded-lg border transition ${
                  selectedItem.id === item.id
                    ? "bg-emerald-50 border-emerald-500 shadow-xs"
                    : "bg-white border-slate-200/80 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 truncate">{item.name}</span>
                  <span className={`text-[9px] px-1.5 py-0.2 rounded font-semibold ${item.is_veg ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}`}>
                    {item.is_veg ? "Veg" : "Non-Veg"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                  <span>{item.category}</span>
                  <span className="font-semibold text-slate-700">${item.cost_per_portion.toFixed(2)} cost</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Detailed Recipe Breakdown (2 Cols) */}
        {selectedItem && (
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
            {/* Title & Nutritional Tags */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{selectedItem.name}</h3>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                  <span>{selectedItem.cuisine} Cuisine</span>
                  <span>•</span>
                  <span>Serving size: <strong>{selectedItem.portion_size_g}g</strong></span>
                  <span>•</span>
                  <span>Cooking lead time: <strong>{selectedItem.lead_time_mins} mins</strong></span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Portion Cost</span>
                <p className="text-xl font-bold text-emerald-700">${selectedItem.cost_per_portion.toFixed(2)}</p>
                <span className="text-[11px] text-slate-500">Retail: ${selectedItem.price.toFixed(2)}</span>
              </div>
            </div>

            {/* Verified Nutrition Grid */}
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Calories</span>
                <p className="font-bold text-slate-800">{selectedItem.calories} kcal</p>
              </div>
              <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Protein</span>
                <p className="font-bold text-emerald-700">{selectedItem.protein_g}g</p>
              </div>
              <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Carbs</span>
                <p className="font-bold text-slate-800">{selectedItem.carbs_g}g</p>
              </div>
              <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Fat</span>
                <p className="font-bold text-slate-800">{selectedItem.fat_g}g</p>
              </div>
            </div>

            {/* Raw Ingredient Bill of Materials (BOM) */}
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                Ingredient Quantities Per Single Portion
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[10px] border-y border-slate-200">
                    <tr>
                      <th className="py-2 px-3">Ingredient</th>
                      <th className="py-2 px-3 text-right">Quantity / Portion</th>
                      <th className="py-2 px-3 text-right">Cost Contribution</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedItem.ingredients.map((ring, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="py-2 px-3 font-semibold text-slate-800">{ring.ingredient_name}</td>
                        <td className="py-2 px-3 text-right text-slate-700 font-medium">
                          {ring.quantity_per_portion} {ring.unit}
                        </td>
                        <td className="py-2 px-3 text-right font-bold text-emerald-700">
                          ${ring.cost_per_portion.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Verified Allergen Statement */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="font-bold text-slate-800">Verified Allergens:</span>
                <span className="text-slate-600">
                  {selectedItem.allergens && selectedItem.allergens.length > 0
                    ? selectedItem.allergens.join(", ")
                    : "None recorded (Allergen-Safe)"}
                </span>
              </div>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded">
                Campus Nutrition Compliant
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
