"use client";

import React, { useState } from "react";
import { StudentPreorder } from "@/types";
import {
  Clock,
  CheckCircle2,
  Star,
  Send,
  MessageSquare,
  AlertCircle
} from "lucide-react";

interface StudentPreordersViewProps {
  preorders: StudentPreorder[];
  onSubmitFeedback: (preorderId: string, rating: number, feedback: string) => void;
}

export const StudentPreordersView: React.FC<StudentPreordersViewProps> = ({
  preorders,
  onSubmitFeedback
}) => {
  const [ratingTarget, setRatingTarget] = useState<string | null>(null);
  const [stars, setStars] = useState<number>(5);
  const [feedbackText, setFeedbackText] = useState<string>("");

  const handleSendFeedback = () => {
    if (ratingTarget) {
      onSubmitFeedback(ratingTarget, stars, feedbackText);
      setRatingTarget(null);
      setFeedbackText("");
      setStars(5);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <Clock className="w-4 h-4 text-emerald-600" />
            Student Dining History & Demand Feedback
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Active Preorders, Order History & Dish Reviews
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Your preorders are directly factored into the kitchen batch planning and ML demand forecasts in real time.
          </p>
        </div>

        <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-1.5 rounded-lg">
          {preorders.length} Registered Preorders
        </span>
      </div>

      {/* Preorders List */}
      <div className="space-y-3">
        {preorders.map((po) => (
          <div key={po.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-slate-900">{po.item_name}</h3>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                  {po.status}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">{po.meal_session} • {po.date}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500 mt-1.5">
                <span>Ordered by: <strong>{po.student_name}</strong></span>
                <span>•</span>
                <span>Portions: <strong>{po.portions}</strong></span>
                <span>•</span>
                <span>Total: <strong>${po.total_price.toFixed(2)}</strong></span>
                {po.dietary_notes && (
                  <>
                    <span>•</span>
                    <span className="text-emerald-700 font-medium">Note: "{po.dietary_notes}"</span>
                  </>
                )}
              </div>

              {po.rating && (
                <div className="mt-2 text-xs flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${i < po.rating! ? "fill-amber-400 text-amber-400" : "text-slate-300"}`}
                    />
                  ))}
                  <span className="text-slate-600 font-medium text-[11px] ml-1">
                    "{po.feedback_text || "Great taste!"}"
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {!po.rating ? (
                <button
                  onClick={() => setRatingTarget(po.id)}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-lg transition shadow-xs flex items-center gap-1.5"
                >
                  <Star className="w-3.5 h-3.5 text-amber-500" />
                  Rate Dish
                </button>
              ) : (
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Reviewed
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Rating & Feedback Modal */}
      {ratingTarget && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-6 shadow-xl space-y-4">
            <h3 className="font-bold text-sm text-slate-900">Rate Your Campus Meal</h3>
            <p className="text-xs text-slate-500">
              Your feedback is aggregated into the Smart Menu Studio optimizer to tune future recipe combinations.
            </p>

            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Star Rating (1 - 5)</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() => setStars(num)}
                    className="p-1 hover:scale-110 transition"
                  >
                    <Star
                      className={`w-6 h-6 ${num <= stars ? "fill-amber-400 text-amber-400" : "text-slate-300"}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Written Feedback (Optional)</label>
              <textarea
                rows={3}
                placeholder="How was the flavor, portion size, and presentation?"
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setRatingTarget(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSendFeedback}
                className="px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
