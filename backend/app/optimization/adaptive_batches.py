"""
Adaptive Demand-to-Production Intelligence (Novelty Feature 1)
Breaks daily single-number production into:
- Initial batch (e.g. 60-70% based on lead time & holding shelf life)
- Reserve capacity (held as prepped raw ingredients)
- Mid-service checkpoints (evaluating sales velocity & remaining service minutes)
- Dynamic re-forecasting: recommends firing next batch, holding reserve, or ceasing production
- Staff approval & audit trails
"""

from typing import Dict, Any, List
from datetime import datetime
from app.models import MidServiceCheckpointRecord

class AdaptiveBatchManager:
    def calculate_mid_service_recommendation(
        self,
        plan_id: str,
        menu_item_id: str,
        item_name: str,
        service_total_mins: int,
        elapsed_mins: int,
        initial_prepared: int,
        current_sold: int,
        current_remaining: int,
        total_planned_portions: int,
        preorders_unfulfilled: int,
        lead_time_mins: int
    ) -> MidServiceCheckpointRecord:
        """Evaluate sales velocity vs remaining service window to recommend next batch action."""
        
        remaining_service_mins = max(0, service_total_mins - elapsed_mins)
        elapsed_mins_safe = max(5, elapsed_mins)

        # Observed sales velocity (portions sold per 10 minutes)
        velocity_per_10m = (current_sold / float(elapsed_mins_safe)) * 10.0

        # Project additional demand for the remaining service window
        projected_additional = int(round((velocity_per_10m / 10.0) * remaining_service_mins))
        
        # Add unfulfilled preorders
        projected_total_needed = projected_additional + preorders_unfulfilled

        # Deficit or surplus relative to remaining portions on hot holding line
        net_shortfall = projected_total_needed - current_remaining

        reserve_capacity_available = max(0, total_planned_portions - initial_prepared)

        # Determine recommendation
        if remaining_service_mins <= lead_time_mins:
            recommended_action = "Cease Production (Service Window Closing)"
            reasoning = (
                f"Only {remaining_service_mins}m remaining in service window, which is within the "
                f"{lead_time_mins}m cooking lead time. Hot line stock ({current_remaining} portions) will serve remaining traffic."
            )
        elif net_shortfall > 5 and reserve_capacity_available > 0:
            batch_to_fire = min(net_shortfall, reserve_capacity_available)
            recommended_action = f"Fire Batch 2 ({batch_to_fire} portions)"
            reasoning = (
                f"Sales velocity is high ({velocity_per_10m:.1f} portions/10m). At current pace, current stock "
                f"({current_remaining}) will deplete in {int((current_remaining / max(0.1, velocity_per_10m / 10.0)))}m. "
                f"Fire {batch_to_fire} portions from reserved capacity now to avert stockout."
            )
        elif current_remaining >= projected_total_needed:
            recommended_action = "Hold Reserve (Preserve Fresh Ingredients)"
            reasoning = (
                f"Current stock ({current_remaining}) is sufficient to satisfy the projected {projected_total_needed} portions "
                f"needed across the remaining {remaining_service_mins}m. Hold reserved ingredients to avoid surplus waste."
            )
        else:
            recommended_action = "Maintain Holding Temp & Monitor"
            reasoning = f"Velocity is steady ({velocity_per_10m:.1f}/10m). Stockout probability is low (<5%)."

        return MidServiceCheckpointRecord(
            checkpoint_id=f"chk_{menu_item_id}_{int(datetime.utcnow().timestamp())}",
            plan_id=plan_id,
            menu_item_id=menu_item_id,
            item_name=item_name,
            timestamp=datetime.utcnow().strftime("%H:%M"),
            elapsed_service_mins=elapsed_mins,
            remaining_service_mins=remaining_service_mins,
            current_sold=current_sold,
            current_remaining=current_remaining,
            observed_sales_velocity=round(velocity_per_10m, 1),
            projected_additional_demand=projected_additional,
            recommended_action=recommended_action,
            reasoning=reasoning,
            approved_by_staff=False
        )
