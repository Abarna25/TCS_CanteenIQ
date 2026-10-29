"use client";

import React from "react";
import { UserRole } from "@/types";
import {
  Sparkles,
  TrendingUp,
  Leaf,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Utensils,
  ChefHat,
  Boxes,
  Users,
  Compass,
  Cpu
} from "lucide-react";

interface LandingViewProps {
  onLoginRole: (role: UserRole) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onLoginRole }) => {
  const roles: Array<{
    role: UserRole;
    title: string;
    description: string;
    icon: any;
    accent: string;
  }> = [
    {
      role: "Canteen Manager",
      title: "Canteen Manager",
      description: "Smart Menu Studio, Demand Forecasting, What-If Sim, and Plan Approvals",
      icon: Sparkles,
      accent: "border-emerald-500 bg-emerald-50/50 hover:border-emerald-600"
    },
    {
      role: "Kitchen Staff",
      title: "Kitchen Operations",
      description: "Batch Production Sheet, Mid-Service Checkpoints, POS Sales & Waste Logging",
      icon: ChefHat,
      accent: "border-amber-500 bg-amber-50/50 hover:border-amber-600"
    },
    {
      role: "Student",
      title: "Student Portal",
      description: "Browse Daily Menu, Dietary Filters, Place Preorders, and Surplus Flash Deals",
      icon: Utensils,
      accent: "border-blue-500 bg-blue-50/50 hover:border-blue-600"
    },
    {
      role: "Procurement Staff",
      title: "Procurement & Suppliers",
      description: "Automated Ingredient Requirements, FEFO Stock, Pack Sizes & Purchase Orders",
      icon: Boxes,
      accent: "border-purple-500 bg-purple-50/50 hover:border-purple-600"
    },
    {
      role: "Administrator",
      title: "Campus Administrator",
      description: "Multi-Canteen Benchmarks, Budgets, RLS Policies, Audit Logs & System Health",
      icon: ShieldCheck,
      accent: "border-slate-500 bg-slate-50/50 hover:border-slate-600"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8faf8] flex flex-col justify-between">
      {/* Top Bar */}
      <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md px-8 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-900/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-slate-900 tracking-tight flex items-center gap-1.5">
              Canteen<span className="text-emerald-600">IQ</span>
            </h1>
            <p className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase">Campus Canteen Intelligence & Waste Prevention</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Closed-Loop Operational Engine</span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-12 flex-1 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-xs font-semibold mb-6">
          <Cpu className="w-3.5 h-3.5 text-emerald-700" />
          TCS Campus Food Intelligence & Optimization Platform
        </div>

        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight max-w-3xl leading-tight">
          Prepare Smarter. Waste Less. <span className="text-emerald-700">Serve Better.</span>
        </h2>

        <p className="mt-4 text-base md:text-lg text-slate-600 max-w-2xl">
          An AI-powered campus canteen management platform connecting student demand, menu selection, ML forecasting, kitchen batch execution, inventory, and safe surplus recovery.
        </p>

        {/* 5 Operational Questions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-10 w-full text-left">
          {[
            { q: "What will students want?", a: "ML Demand Forecasting + Preorders", icon: TrendingUp },
            { q: "How much to prepare?", a: "Adaptive Batches + Reserve Buffers", icon: ChefHat },
            { q: "Which menu combination?", a: "Constraint-Aware Menu Mix Optimizer", icon: Sparkles },
            { q: "What ingredients to buy?", a: "Recipe-Driven FEFO Procurement", icon: Boxes },
            { q: "Did outcomes improve?", a: "Sustainability Scorecard & Waste Trace", icon: Leaf }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700 mb-2">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-900">{item.q}</h4>
                <p className="text-[11px] text-slate-500 mt-1 font-medium">{item.a}</p>
              </div>
            );
          })}
        </div>

        {/* Role Quick-Select Entrance Cards */}
        <div className="mt-14 w-full">
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">Select a Role to Enter Live Demonstration</h3>
            <p className="text-xs text-slate-500 mt-0.5">Experience the complete end-to-end operational workflow tailored to each persona</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {roles.map((r) => {
              const Icon = r.icon;
              return (
                <button
                  key={r.role}
                  onClick={() => onLoginRole(r.role)}
                  className={`flex flex-col text-left p-5 rounded-xl border-2 transition-all card-hover bg-white ${r.accent} shadow-sm group`}
                >
                  <div className="w-10 h-10 rounded-lg bg-white shadow-xs border border-slate-200/80 flex items-center justify-center text-slate-800 mb-3 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5 text-emerald-700" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 flex items-center justify-between">
                    {r.title}
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                  </h4>
                  <p className="text-xs text-slate-500 mt-1.5 flex-1 leading-relaxed">
                    {r.description}
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-semibold text-emerald-700">
                    <span>Launch Portal</span>
                    <span>→</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Closed Loop Architecture Indicator */}
        <div className="mt-14 w-full bg-white p-6 rounded-2xl border border-slate-200 text-left shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <Compass className="w-4 h-4 text-emerald-700" />
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">The Closed-Loop CanteenIQ Flywheel</h4>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 font-medium">
            <span className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">1. Student Preorders & Footfall</span>
            <span className="text-emerald-600 font-bold">→</span>
            <span className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">2. ML Item Demand Forecast</span>
            <span className="text-emerald-600 font-bold">→</span>
            <span className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">3. Smart Menu Mix Optimizer</span>
            <span className="text-emerald-600 font-bold">→</span>
            <span className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">4. Adaptive Batches (Live Cook)</span>
            <span className="text-emerald-600 font-bold">→</span>
            <span className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">5. Safe Surplus Recovery</span>
            <span className="text-emerald-600 font-bold">→</span>
            <span className="bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-300 text-emerald-800 font-semibold">6. Waste Trace & Sustainability</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-8 py-5 text-center text-xs text-slate-500">
        <p>© 2026 CanteenIQ — TCS Campus Innovation Platform. Production-Minded Architecture with Supabase & FastAPI ML Engine.</p>
      </footer>
    </div>
  );
};
