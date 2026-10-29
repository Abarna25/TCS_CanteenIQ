"""
CanteenIQ Data Models and Schemas
Complete normalized structures for campus canteen intelligence, forecasting, optimization, and sustainability.
"""

from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
from datetime import datetime, date

# ----------------- Core Entities -----------------

class Institution(BaseModel):
    id: str
    name: str
    code: str
    currency: str = "USD"
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())

class Canteen(BaseModel):
    id: str
    institution_id: str
    name: str
    location: str
    operating_hours: str = "07:30 - 20:00"
    meal_sessions: List[str] = ["Breakfast", "Lunch", "Snacks", "Dinner"]
    daily_budget_limit: float = 2500.0
    daily_capacity_portions: int = 1200
    currency: str = "USD"
    is_active: bool = True

class User(BaseModel):
    id: str
    email: str
    name: str
    role: str  # Administrator, Canteen Manager, Kitchen Staff, Student, Procurement Staff
    canteen_id: Optional[str] = None
    institution_id: str = "inst_tcs_01"
    avatar_url: Optional[str] = None
    dietary_preferences: Optional[List[str]] = []
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())

# ----------------- Menu & Recipes -----------------

class Ingredient(BaseModel):
    id: str
    name: str
    category: str  # Produce, Grains, Dairy, Protein, Spices, Bakery
    unit: str  # kg, g, l, ml, pcs
    unit_cost: float
    current_stock: float
    min_stock_threshold: float
    storage_type: str = "Dry"  # Dry, Refrigerated, Frozen
    shelf_life_days: int = 7
    pack_size: float = 1.0  # standard supplier pack size
    pack_unit: str = "kg"

class RecipeIngredient(BaseModel):
    ingredient_id: str
    ingredient_name: str
    quantity_per_portion: float
    unit: str
    cost_per_portion: float

class MenuItem(BaseModel):
    id: str
    canteen_id: str
    name: str
    category: str  # Main Course, Bowls & Curries, Grills & Proteins, Healthy Salads, Soups, Beverages, Bakery
    cuisine: str  # Mediterranean, Asian, American, Indian, Continental
    price: float
    portion_size_g: float
    is_veg: bool = True
    is_vegan: bool = False
    is_gluten_free: bool = False
    allergens: List[str] = []
    calories: int = 450
    protein_g: float = 18.0
    carbs_g: float = 55.0
    fat_g: float = 14.0
    preparation_time_mins: int = 35
    lead_time_mins: int = 25
    holding_temp_c: float = 65.0
    max_holding_hours: float = 3.5
    cost_per_portion: float
    image_url: Optional[str] = None
    is_active: bool = True
    popularity_score: float = 4.2  # 1-5 scale
    ingredients: List[RecipeIngredient] = []

class Recipe(BaseModel):
    id: str
    menu_item_id: str
    item_name: str
    yield_portions: int = 50
    prep_instructions: str
    total_cost_per_batch: float
    ingredients: List[RecipeIngredient]

# ----------------- Inventory & Procurement -----------------

class InventoryBatch(BaseModel):
    id: str
    ingredient_id: str
    ingredient_name: str
    batch_code: str
    quantity: float
    unit: str
    cost_per_unit: float
    received_date: str
    expiry_date: str
    supplier_id: str
    status: str = "Active"  # Active, Reserved, Expired, Depleted

class Supplier(BaseModel):
    id: str
    name: str
    contact_person: str
    email: str
    phone: str
    lead_time_days: int = 2
    min_order_value: float = 100.0
    rating: float = 4.5
    categories_supplied: List[str]

class PurchaseOrderItem(BaseModel):
    ingredient_id: str
    ingredient_name: str
    required_quantity: float
    pack_size: float
    packs_to_order: int
    unit_cost: float
    total_cost: float
    unit: str

class PurchaseOrder(BaseModel):
    id: str
    canteen_id: str
    po_number: str
    supplier_id: str
    supplier_name: str
    order_date: str
    expected_delivery: str
    status: str = "Pending"  # Draft, Submitted, Confirmed, Received, Cancelled
    total_cost: float
    items: List[PurchaseOrderItem]
    notes: Optional[str] = None

# ----------------- Preorders & Sales -----------------

class StudentPreorder(BaseModel):
    id: str
    student_id: str
    student_name: str
    canteen_id: str
    date: str
    meal_session: str
    menu_item_id: str
    item_name: str
    portions: int = 1
    price_each: float
    total_price: float
    dietary_notes: Optional[str] = None
    status: str = "Confirmed"  # Submitted, Confirmed, Fulfilled, Cancelled
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    rating: Optional[int] = None
    feedback_text: Optional[str] = None

# ----------------- Demand Forecasting -----------------

class HistoricalDemandRecord(BaseModel):
    date: str
    canteen_id: str
    menu_item_id: str
    item_name: str
    category: str
    meal_session: str
    day_of_week: int
    attendance_expected: int
    price: float
    is_promotion: bool = False
    weather: str = "Clear"
    is_exam_week: bool = False
    actual_sold: int
    preorders_count: int
    stockout_occurred: bool = False
    unmet_demand_est: int = 0
    discarded_portions: int = 0

class FeatureContribution(BaseModel):
    feature_name: str
    impact_pct: float
    direction: str  # positive, negative

class ForecastItem(BaseModel):
    menu_item_id: str
    item_name: str
    category: str
    meal_session: str
    date: str
    historical_baseline: float
    ml_forecast: float
    final_expected_demand: float
    lower_bound: float
    upper_bound: float
    uncertainty_level: str  # Low, Medium, High
    preorders_incorporated: int
    confidence_score: float
    is_cold_start: bool = False
    explanations: List[FeatureContribution] = []

class ForecastEvaluationMetric(BaseModel):
    model_name: str
    sample_size: int
    mae: float
    rmse: float
    wape: float
    r2_score: float
    train_range: str
    test_range: str
    notes: str

# ----------------- Menu Optimization -----------------

class MenuOptimizationRequest(BaseModel):
    canteen_id: str
    target_date: str
    meal_session: str
    objective: str = "Profit-focused"  # Budget-focused, Profit-focused, Waste-minimizing
    budget_limit: float = 1200.0
    kitchen_capacity_portions: int = 650
    min_veg_items: int = 3
    min_total_items: int = 5
    max_total_items: int = 8
    max_per_item_portions: int = 180
    prioritize_expiring_stock: bool = True

class OptimizedItemRecommendation(BaseModel):
    menu_item_id: str
    item_name: str
    category: str
    is_veg: bool
    price: float
    cost_per_portion: float
    expected_demand: float
    recommended_portions: int
    initial_batch: int
    reserve_batch: int
    stockout_risk_pct: float
    expected_surplus_portions: float
    projected_revenue: float
    projected_food_cost: float
    projected_gross_contribution: float
    selection_rationale: str

class OptimizationPlanResult(BaseModel):
    plan_id: str
    canteen_id: str
    target_date: str
    meal_session: str
    objective: str
    solver_status: str  # Optimal, Feasible, Relaxed
    total_portions: int
    total_food_cost: float
    total_projected_revenue: float
    total_gross_contribution: float
    expected_waste_pct: float
    veg_ratio_pct: float
    constraint_status: Dict[str, bool]
    recommended_items: List[OptimizedItemRecommendation]
    ingredients_required: List[Dict[str, Any]]
    alternative_plans: List[Dict[str, Any]] = []
    explanation_summary: str

# ----------------- Production Planning & Adaptive Batches -----------------

class ProductionBatchStatus(BaseModel):
    menu_item_id: str
    item_name: str
    target_date: str
    meal_session: str
    planned_portions: int
    initial_batch_target: int
    reserve_batch_target: int
    prepared_portions: int
    sold_portions: int
    remaining_portions: int
    discarded_portions: int
    stockout_reported: bool = False
    adjustment_reason: Optional[str] = None

class MidServiceCheckpointRecord(BaseModel):
    checkpoint_id: str
    plan_id: str
    menu_item_id: str
    item_name: str
    timestamp: str
    elapsed_service_mins: int
    remaining_service_mins: int
    current_sold: int
    current_remaining: int
    observed_sales_velocity: float  # portions per 10 mins
    projected_additional_demand: int
    recommended_action: str  # "Fire Batch 2 (30 portions)", "Hold Reserve", "Cease Production"
    reasoning: str
    approved_by_staff: bool = False

# ----------------- Waste Propagation & Safe Surplus -----------------

class IngredientWasteDetail(BaseModel):
    ingredient_id: str
    ingredient_name: str
    wasted_quantity: float
    unit: str
    unit_cost: float
    financial_loss: float
    is_perishable: bool

class WastePropagationResult(BaseModel):
    date: str
    meal_session: str
    canteen_id: str
    item_id: str
    item_name: str
    unsold_surplus_portions: int
    safe_surplus_portions: int
    actually_discarded_portions: int
    total_financial_loss: float
    ingredient_breakdown: List[IngredientWasteDetail]
    root_cause: str
    actionable_remedy: str

class SurplusOfferRecord(BaseModel):
    id: str
    canteen_id: str
    date: str
    meal_session: str
    menu_item_id: str
    item_name: str
    portions_available: int
    portions_reserved: int
    portions_collected: int
    original_price: float
    discounted_price: float
    discount_pct: int = 50
    food_safety_verified: bool
    temperature_verified_c: float
    verified_by: str
    safe_until_time: str
    status: str = "Active"  # Active, Sold Out, Expired, Withdrawn

# ----------------- What-If Simulator -----------------

class WhatIfSimulationRequest(BaseModel):
    canteen_id: str
    base_plan_id: Optional[str] = None
    attendance_change_pct: float = 0.0  # e.g., +10% or -10%
    ingredient_price_change_pct: float = 0.0  # e.g., +15%
    budget_limit_override: Optional[float] = None
    preorder_surge_pct: float = 0.0
    disabled_item_ids: List[str] = []
    initial_batch_pct: float = 65.0  # split %

class WhatIfSimulationResult(BaseModel):
    simulation_id: str
    title: str
    baseline: Dict[str, float]
    simulated: Dict[str, float]
    delta: Dict[str, float]
    items_impact: List[Dict[str, Any]]
    recommendation_notes: str

# ----------------- Sustainability & Multi-Canteen -----------------

class SustainabilityScorecard(BaseModel):
    canteen_id: str
    canteen_name: str
    reporting_period: str
    waste_per_meal_kg: float
    forecast_wape: float
    food_cost_per_meal: float
    stockout_rate_pct: float
    student_satisfaction_score: float
    surplus_recovery_pct: float
    composite_sustainability_score: float
    co2_emissions_avoided_kg: float
    water_saved_liters: float
    target_waste_per_meal_kg: float = 0.045
    trend: str = "Improving"

# ----------------- Administration & Audit -----------------

class AuditLogEntry(BaseModel):
    id: str
    timestamp: str
    user_name: str
    user_role: str
    action_type: str
    entity_type: str
    entity_id: str
    details: str
    ip_address: str = "127.0.0.1"

class NotificationItem(BaseModel):
    id: str
    title: str
    message: str
    category: str  # alert, approval, inventory, forecast, surplus
    urgency: str  # low, medium, high
    timestamp: str
    is_read: bool = False
    action_url: Optional[str] = None
