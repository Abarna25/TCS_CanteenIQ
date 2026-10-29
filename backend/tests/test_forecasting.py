"""
Tests for Demand Forecasting Engine & Cold Start
"""

import pytest
from app.forecasting.engine import DemandForecastingEngine, calculate_wape
from app.forecasting.cold_start import ColdStartEstimator
from app.seed_data import get_seed_historical_records
import numpy as np

def test_wape_calculation():
    actuals = np.array([100, 150, 80])
    predictions = np.array([90, 160, 85])
    wape = calculate_wape(actuals, predictions)
    # total abs error = |100-90| + |150-160| + |80-85| = 10 + 10 + 5 = 25
    # total actual = 330
    # wape = 25 / 330 * 100 = 7.58
    assert wape == 7.58

def test_wape_zero_actuals():
    actuals = np.array([0, 0, 0])
    predictions = np.array([10, 20, 30])
    wape = calculate_wape(actuals, predictions)
    assert wape == 0.0

def test_forecast_training_and_evaluation():
    engine = DemandForecastingEngine()
    records = get_seed_historical_records()
    res = engine.train_and_evaluate(records)
    assert res["status"] == "success"
    assert res["train_samples"] > 0
    assert res["test_samples"] > 0
    assert res["baseline"].wape > 0
    assert res["ml_model"].wape > 0
    assert res["baseline"].mae >= 0

def test_forecast_item_with_preorders():
    engine = DemandForecastingEngine()
    records = get_seed_historical_records()
    engine.train_and_evaluate(records)

    fc = engine.forecast_item(
        item_id="item_02",
        item_name="Paneer Tikka Masala Rice Bowl",
        category="Bowls & Curries",
        meal_session="Lunch",
        target_date="2026-10-30",
        day_of_week=4,
        attendance_expected=950,
        price=6.20,
        preorders_count=35,
        is_promotion=False,
        is_exam_week=False,
        historical_records=records
    )
    assert fc.final_expected_demand >= 35  # Preorders provide demand floor
    assert fc.confidence_score > 0.6
    assert fc.lower_bound <= fc.final_expected_demand <= fc.upper_bound
    assert len(fc.explanations) > 0

def test_cold_start_new_dish():
    estimator = ColdStartEstimator()
    records = get_seed_historical_records()
    res = estimator.estimate_new_dish(
        item_name="Smoked Barbecue Jackfruit Burger",
        category="Grills & Proteins",
        price=7.20,
        meal_session="Lunch",
        target_date="2026-10-30",
        preorders_count=5,
        all_history=records
    )
    assert res.is_cold_start is True
    assert res.confidence_score <= 0.60  # Transparent lower confidence
    assert res.final_expected_demand >= 5
    assert res.uncertainty_level == "High"
