"""
Tests for Constraint-Aware Menu Mix Optimizer, Adaptive Batches, Waste Propagation, and What-If
"""

import pytest
from app.models import MenuOptimizationRequest, WhatIfSimulationRequest
from app.optimization.menu_optimizer import MenuMixOptimizer
from app.optimization.adaptive_batches import AdaptiveBatchManager
from app.optimization.waste_propagation import WastePropagationEngine
from app.simulation.what_if import WhatIfSimulationEngine
from app.surplus.recovery import SafeSurplusRecoveryManager
from app.seed_data import get_seed_menu_items, get_seed_ingredients

def test_menu_optimization_budget_and_veg_constraints():
    optimizer = MenuMixOptimizer()
    items = get_seed_menu_items()
    ingredients = get_seed_ingredients()

    forecast_map = {item.id: 80.0 for item in items}
    preorders_map = {item.id: 15 for item in items}

    req = MenuOptimizationRequest(
        canteen_id="canteen_main",
        target_date="2026-10-30",
        meal_session="Lunch",
        objective="Profit-focused",
        budget_limit=1200.0,
        kitchen_capacity_portions=600,
        min_veg_items=3,
        min_total_items=4,
        max_total_items=6
    )

    result = optimizer.optimize_menu(
        request=req,
        candidate_items=items,
        forecast_map=forecast_map,
        preorders_map=preorders_map,
        inventory_items=ingredients,
        expiring_ingredient_ids=["ing_paneer"]
    )

    assert result.solver_status == "Optimal"
    assert result.total_food_cost <= 1200.0
    assert result.total_portions <= 600
    veg_items = [it for it in result.recommended_items if it.is_veg]
    assert len(veg_items) >= 3
    assert result.constraint_status["budget_satisfied"] is True
    assert result.constraint_status["min_veg_satisfied"] is True
    assert len(result.alternative_plans) == 2

def test_menu_optimization_infeasible_handling():
    optimizer = MenuMixOptimizer()
    items = get_seed_menu_items()
    ingredients = get_seed_ingredients()

    # Request impossible vegetarian variety
    req = MenuOptimizationRequest(
        canteen_id="canteen_main",
        target_date="2026-10-30",
        meal_session="Lunch",
        min_veg_items=25,  # Impossible: only 7 veg items exist
        min_total_items=25
    )

    result = optimizer.optimize_menu(
        request=req,
        candidate_items=items,
        forecast_map={},
        preorders_map={},
        inventory_items=ingredients,
        expiring_ingredient_ids=[]
    )

    assert result.solver_status == "Infeasible"
    assert "Infeasible constraint detected" in result.explanation_summary

def test_adaptive_batch_manager():
    batch_mgr = AdaptiveBatchManager()
    rec = batch_mgr.calculate_mid_service_recommendation(
        plan_id="plan_01",
        menu_item_id="item_02",
        item_name="Paneer Tikka Masala Rice Bowl",
        service_total_mins=180,
        elapsed_mins=60,
        initial_prepared=60,
        current_sold=50,
        current_remaining=10,
        total_planned_portions=90,
        preorders_unfulfilled=5,
        lead_time_mins=20
    )
    # 50 sold in 60m => velocity is ~8.3 portions/10m. Across remaining 120m => ~100 portions needed!
    # With only 10 left on line, it should recommend firing Batch 2!
    assert "Fire Batch 2" in rec.recommended_action
    assert rec.observed_sales_velocity > 0

def test_waste_propagation_engine():
    waste_engine = WastePropagationEngine()
    items = {m.id: m for m in get_seed_menu_items()}
    ingredients = {ing.id: ing for ing in get_seed_ingredients()}

    item = items["item_02"]
    res = waste_engine.propagate_dish_waste(
        date="2026-10-30",
        meal_session="Lunch",
        canteen_id="canteen_main",
        menu_item=item,
        prepared_portions=100,
        sold_portions=85,
        remaining_portions=15,
        discarded_portions=10,
        safe_recovered_portions=5,
        inventory_map=ingredients
    )

    # 10 discarded portions * $2.20 cost per portion = $22.00 financial loss
    assert res.total_financial_loss == 22.00
    assert len(res.ingredient_breakdown) > 0
    assert any(ing.ingredient_id == "ing_paneer" for ing in res.ingredient_breakdown)

def test_what_if_simulator():
    sim = WhatIfSimulationEngine()
    items = get_seed_menu_items()
    forecasts = {m.id: 60.0 for m in items}
    preorders = {m.id: 10 for m in items}

    req = WhatIfSimulationRequest(
        canteen_id="canteen_main",
        attendance_change_pct=-15.0,
        ingredient_price_change_pct=10.0,
        initial_batch_pct=65.0
    )

    res = sim.simulate_scenario(req, items, forecasts, preorders)
    # Attendance drop should lower simulated portions and cost
    assert res.simulated["total_portions"] < res.baseline["total_portions"]
    assert res.delta["delta_portions"] < 0
    assert len(res.items_impact) == len(items)

def test_safe_surplus_recovery_temperature_check():
    surplus_mgr = SafeSurplusRecoveryManager()
    
    # Valid safe condition: hot holding at 64C within 2 hours
    safe_offer = surplus_mgr.verify_and_create_offer(
        canteen_id="canteen_main",
        date="2026-10-30",
        meal_session="Lunch",
        menu_item_id="item_02",
        item_name="Paneer Bowl",
        surplus_portions=15,
        original_price=6.00,
        current_holding_temp_c=64.0,
        elapsed_holding_hours=2.0,
        max_safe_holding_hours=3.5,
        verified_by="Chef Marcus",
        discount_pct=50
    )
    assert safe_offer.food_safety_verified is True
    assert safe_offer.status == "Active"
    assert safe_offer.discounted_price == 3.00

    # Unsafe condition: temperature dropped below 60C
    unsafe_offer = surplus_mgr.verify_and_create_offer(
        canteen_id="canteen_main",
        date="2026-10-30",
        meal_session="Lunch",
        menu_item_id="item_02",
        item_name="Paneer Bowl",
        surplus_portions=15,
        original_price=6.00,
        current_holding_temp_c=54.0,  # Unsafe!
        elapsed_holding_hours=2.0,
        max_safe_holding_hours=3.5,
        verified_by="Chef Marcus",
        discount_pct=50
    )
    assert unsafe_offer.food_safety_verified is False
    assert "Rejected" in unsafe_offer.status
    assert unsafe_offer.portions_available == 0
