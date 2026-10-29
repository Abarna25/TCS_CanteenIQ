"""
Ingredient-Level Waste Propagation (Novelty Feature 3)
Traces leftover dishes backward into recipes, raw ingredients, and procurement:
- Prepared, sold, remaining, and discarded reconciliation
- Estimates ingredient quantities discarded in surplus dishes
- Quantifies actual monetary loss
- Flags repeatedly overproduced items and perishable ingredient risks
- Generates actionable kitchen remedies
"""

from typing import List, Dict, Any
from app.models import (
    MenuItem,
    Ingredient,
    IngredientWasteDetail,
    WastePropagationResult
)

class WastePropagationEngine:
    def propagate_dish_waste(
        self,
        date: str,
        meal_session: str,
        canteen_id: str,
        menu_item: MenuItem,
        prepared_portions: int,
        sold_portions: int,
        remaining_portions: int,
        discarded_portions: int,
        safe_recovered_portions: int,
        inventory_map: Dict[str, Ingredient]
    ) -> WastePropagationResult:
        """Trace discarded portion counts back into ingredient units and financial loss."""
        
        # Financial loss is computed on the portions actually discarded (excluding safe surplus recovered)
        direct_financial_loss = discarded_portions * menu_item.cost_per_portion

        ingredient_breakdown: List[IngredientWasteDetail] = []
        for ring in menu_item.ingredients:
            wasted_qty = round(ring.quantity_per_portion * discarded_portions, 3)
            ing_obj = inventory_map.get(ring.ingredient_id)
            is_perishable = ing_obj.storage_type in ["Refrigerated", "Frozen"] or ing_obj.shelf_life_days <= 7 if ing_obj else True
            loss_for_ing = round(wasted_qty * (ing_obj.unit_cost if ing_obj else ring.cost_per_portion / max(0.001, ring.quantity_per_portion)), 2)

            ingredient_breakdown.append(IngredientWasteDetail(
                ingredient_id=ring.ingredient_id,
                ingredient_name=ring.ingredient_name,
                wasted_quantity=wasted_qty,
                unit=ring.unit,
                unit_cost=ing_obj.unit_cost if ing_obj else 0.0,
                financial_loss=loss_for_ing,
                is_perishable=is_perishable
            ))

        # Root cause diagnosis
        surplus_portions = max(0, prepared_portions - sold_portions)
        if discarded_portions > 25:
            root_cause = "Over-preparation in Initial Batch: demand softened mid-session without reserve buffering"
            actionable_remedy = f"Lower initial batch size for {menu_item.name} by 20% and defer balance to mid-service reserve."
        elif safe_recovered_portions == 0 and surplus_portions > 0:
            root_cause = "Holding temperature expired or food safety timer lapsed before discount redistribution"
            actionable_remedy = "Initiate safe surplus recovery offer 45 minutes prior to session closing."
        else:
            root_cause = "Normal variance in walk-in demand vs forecasted footfall"
            actionable_remedy = "Maintain current recipe portioning; monitor attendance calendar."

        return WastePropagationResult(
            date=date,
            meal_session=meal_session,
            canteen_id=canteen_id,
            item_id=menu_item.id,
            item_name=menu_item.name,
            unsold_surplus_portions=surplus_portions,
            safe_surplus_portions=safe_recovered_portions,
            actually_discarded_portions=discarded_portions,
            total_financial_loss=round(direct_financial_loss, 2),
            ingredient_breakdown=ingredient_breakdown,
            root_cause=root_cause,
            actionable_remedy=actionable_remedy
        )
