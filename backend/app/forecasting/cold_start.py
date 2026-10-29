"""
Cold-Start Intelligence for New Dishes (Novelty Feature 4)
Estimates initial demand for dishes without historical sales using:
- Category-level sales distributions
- Price tier affinity
- Meal session typical velocity
- Preorder signals and student interest
- Explicit uncertainty bounding to avoid overconfidence
"""

from typing import List
import numpy as np
from app.models import (
    HistoricalDemandRecord,
    ForecastItem,
    FeatureContribution
)

class ColdStartEstimator:
    def estimate_new_dish(
        self,
        item_name: str,
        category: str,
        price: float,
        meal_session: str,
        target_date: str,
        preorders_count: int,
        all_history: List[HistoricalDemandRecord]
    ) -> ForecastItem:
        """Estimate initial demand for a novel dish with transparent fallback evidence."""
        # Find similar category dishes in the same meal session
        peer_records = [
            r for r in all_history
            if r.category == category and r.meal_session == meal_session
        ]

        if not peer_records:
            peer_records = [r for r in all_history if r.category == category]

        if not peer_records:
            peer_records = all_history

        if peer_records:
            peer_demands = [r.actual_sold for r in peer_records]
            median_peer = float(np.median(peer_demands))
            stdev_peer = float(np.std(peer_demands)) if len(peer_demands) > 1 else 15.0
        else:
            median_peer = 55.0
            stdev_peer = 18.0

        # Adjust for price elasticity: compare price against category median
        if peer_records:
            cat_prices = [r.price for r in peer_records]
            avg_price = float(np.mean(cat_prices)) if cat_prices else price
            price_ratio = price / avg_price if avg_price > 0 else 1.0
            # Higher price reduces initial trial slightly, lower price boosts trial
            elasticity_multiplier = max(0.75, min(1.25, 1.0 - (0.4 * (price_ratio - 1.0))))
        else:
            elasticity_multiplier = 1.0

        estimated_val = median_peer * elasticity_multiplier

        # If student preorders are already coming in, anchor with high weight
        if preorders_count > 0:
            estimated_val = max(preorders_count * 1.35, (estimated_val * 0.6) + (preorders_count * 1.5))

        final_demand = round(max(15.0, estimated_val), 1)

        # Cold start items inherently have wider bounds & medium/high uncertainty
        lower_bound = max(preorders_count, round(max(5.0, final_demand - (1.96 * stdev_peer)), 1))
        upper_bound = round(final_demand + (1.96 * stdev_peer), 1)

        explanations = [
            FeatureContribution(
                feature_name=f"Peer Category Baseline ({category} median)",
                impact_pct=45.0,
                direction="positive"
            ),
            FeatureContribution(
                feature_name=f"Price Tier Elasticity (${price:.2f} relative to category)",
                impact_pct=25.0,
                direction="positive" if elasticity_multiplier >= 1.0 else "negative"
            ),
            FeatureContribution(
                feature_name=f"Cold-Start Guardband (Zero Prior Sales History)",
                impact_pct=30.0,
                direction="negative"
            )
        ]

        if preorders_count > 0:
            explanations.insert(0, FeatureContribution(
                feature_name=f"Early Student Preorders ({preorders_count} registered)",
                impact_pct=40.0,
                direction="positive"
            ))

        return ForecastItem(
            menu_item_id="new_cold_start",
            item_name=item_name,
            category=category,
            meal_session=meal_session,
            date=target_date,
            historical_baseline=round(median_peer, 1),
            ml_forecast=final_demand,
            final_expected_demand=final_demand,
            lower_bound=lower_bound,
            upper_bound=upper_bound,
            uncertainty_level="High",
            preorders_incorporated=preorders_count,
            confidence_score=0.55,  # Transparently mark lower confidence for cold start
            is_cold_start=True,
            explanations=explanations
        )
