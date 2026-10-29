"use client";

import React, { useState } from "react";
import { MenuItem } from "@/types";
import {
  ChefHat,
  Clock,
  Flame,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Plus,
  Minus,
  Check
} from "lucide-react";

interface KitchenBoardViewProps {
  menuItems: MenuItem[];
}

export const KitchenBoardView: React.FC<KitchenBoardViewProps> = ({ menuItems }) => {
  // Production batch state for active items
  const [batches, setBatches] = useState([
    {
      id: "item_02",
      name: "Paneer Tikka Masala Rice Bowl",
      planned: 135,
      initialTarget: 88,
      reserveTarget: 47,
      prepared: 88,
      sold: 62,
      remaining: 26,
      holdingTempC: 64.2,
      leadTimeMins: 20,
      checkpointTriggered: false,
      checkpointRec: null as any
    },
    {
      id: "item_01",
      name: "Mediterranean Grilled Chicken Bowl",
      planned: 110,
      initialTarget: 75,
      reserveTarget: 35,
      prepared: 75,
      sold: 58,
      remaining: 17,
      holdingTempC: 65.0,
      leadTimeMins: 25,
      checkpointTriggered: false,
      checkpointRec: null as any
    },
    {
      id: "item_06",
      name: "Classic Yellow Dal Tadka with Steamed Rice",
      planned: 140,
      initialTarget: 90,
      reserveTarget: 50,
      prepared: 90,
      sold: 70,
      remaining: 20,
      holdingTempC: 66.5,
      leadTimeMins: 20,
      checkpointTriggered: false,
      checkpointRec: null as any
    }
  ]);

  const [elapsedMins, setElapsedMins] = useState<number>(60);
  const serviceTotalMins = 180;
  const remainingMins = Math.max(0, serviceTotalMins - elapsedMins);

  // Evaluate mid-service checkpoint recommendation
  const handleEvaluateCheckpoint = (idx: number) => {
    const b = batches[idx];
    const velocity = (b.sold / Math.max(10, elapsedMins)) * 10; // sold per 10m
    const projectedAdditional = Math.round((velocity / 10) * remainingMins);
    const shortfall = projectedAdditional - b.remaining;

    let action = "";
    let reason = "";

    if (shortfall > 5 && b.reserveTarget > 0) {
      const portionsToFire = Math.min(shortfall, b.reserveTarget);
      action = `Fire Batch 2 (${portionsToFire} portions)`;
      reason = `Sales velocity is high (${velocity.toFixed(1)} portions/10m). Remaining stock (${b.remaining}) will deplete in ~${Math.round(b.remaining / (velocity / 10))}m. Fire ${portionsToFire} portions from reserve now.`;
    } else {
      action = "Hold Reserve (Preserve Fresh Ingredients)";
      reason = `Current stock (${b.remaining}) is sufficient to cover remaining service window (${remainingMins}m). Do not overcook.`;
    }

    const updated = [...batches];
    updated[idx].checkpointTriggered = true;
    updated[idx].checkpointRec = {
      velocity: velocity.toFixed(1),
      action,
      reason,
      portionsToFire: shortfall > 5 ? Math.min(shortfall, b.reserveTarget) : 0,
      confirmed: false
    };
    setBatches(updated);
  };

  const handleConfirmBatchAction = (idx: number) => {
    const updated = [...batches];
    const b = updated[idx];
    if (b.checkpointRec && b.checkpointRec.portionsToFire > 0) {
      b.prepared += b.checkpointRec.portionsToFire;
      b.remaining += b.checkpointRec.portionsToFire;
      b.reserveTarget -= b.checkpointRec.portionsToFire;
      b.checkpointRec.confirmed = true;
    }
    setBatches(updated);
  };

  const handleIncrementSold = (idx: number) => {
    const updated = [...batches];
    if (updated[idx].remaining > 0) {
      updated[idx].sold += 1;
      updated[idx].remaining -= 1;
      setBatches(updated);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <ChefHat className="w-4 h-4 text-emerald-600" />
            Novelty Feature 1: Adaptive Production Intelligence
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Kitchen Production Board & Live Batching Station
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Replaces static all-at-once cooking with responsive initial batches and velocity-driven reserve checkpoints.
          </p>
        </div>

        {/* Live Service Clock */}
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-xs">
          <Clock className="w-4 h-4 text-emerald-600" />
          <div>
            <div className="font-bold text-slate-900">Lunch Service: 60m Elapsed</div>
            <div className="text-[11px] text-slate-500">120m Remaining in Service Window</div>
          </div>
        </div>
      </div>

      {/* Production Batch Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {batches.map((b, idx) => (
          <div key={b.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            {/* Dish Title & Holding Temp */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-900 leading-tight">{b.name}</h3>
                <span className="text-[10px] text-slate-400">Target Lead Time: {b.leadTimeMins} mins</span>
              </div>
              <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Flame className="w-3 h-3 text-emerald-600" />
                {b.holdingTempC}°C
              </span>
            </div>

            {/* Batch Status Metrics */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Planned</span>
                <p className="font-bold text-slate-800 text-base">{b.planned}</p>
              </div>
              <div className="bg-emerald-50/60 p-2 rounded-lg border border-emerald-100">
                <span className="text-[10px] text-emerald-800 uppercase font-semibold">Prepared</span>
                <p className="font-bold text-emerald-900 text-base">{b.prepared}</p>
              </div>
              <div className="bg-blue-50/60 p-2 rounded-lg border border-blue-100">
                <span className="text-[10px] text-blue-800 uppercase font-semibold">Reserve Raw</span>
                <p className="font-bold text-blue-900 text-base">{b.reserveTarget}</p>
              </div>
            </div>

            {/* Real-Time Hot Line Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-600 font-medium">
                <span>Sold: <strong className="text-slate-900">{b.sold}</strong></span>
                <span>On Hot Line: <strong className="text-emerald-700">{b.remaining} left</strong></span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex">
                <div
                  className="bg-emerald-600 h-full"
                  style={{ width: `${(b.sold / b.prepared) * 100}%` }}
                />
                <div
                  className="bg-emerald-300 h-full"
                  style={{ width: `${(b.remaining / b.prepared) * 100}%` }}
                />
              </div>
            </div>

            {/* Quick Kitchen Action Buttons (Mobile-Friendly) */}
            <div className="pt-2 flex items-center justify-between gap-2">
              <button
                onClick={() => handleIncrementSold(idx)}
                className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-lg transition flex items-center justify-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5 text-slate-600" />
                Log +1 Sold
              </button>

              <button
                onClick={() => handleEvaluateCheckpoint(idx)}
                className="flex-1 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg transition flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                Eval Velocity
              </button>
            </div>

            {/* Checkpoint Intelligence Banner */}
            {b.checkpointTriggered && b.checkpointRec && (
              <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-2">
                <div className="flex items-center justify-between font-bold">
                  <span>Recommendation:</span>
                  <span className="text-[10px] bg-amber-200/60 px-1.5 py-0.5 rounded text-amber-900">
                    Velocity: {b.checkpointRec.velocity}/10m
                  </span>
                </div>
                <p className="text-amber-900/90 leading-tight">{b.checkpointRec.reason}</p>

                {b.checkpointRec.portionsToFire > 0 && !b.checkpointRec.confirmed && (
                  <button
                    onClick={() => handleConfirmBatchAction(idx)}
                    className="w-full py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg transition text-xs shadow-xs flex items-center justify-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Confirm & Fire {b.checkpointRec.portionsToFire} Portions
                  </button>
                )}
                {b.checkpointRec.confirmed && (
                  <div className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Batch Fired & In Production
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
