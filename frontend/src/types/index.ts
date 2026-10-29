export type UserRole = 
  | "Administrator"
  | "Canteen Manager"
  | "Kitchen Staff"
  | "Student"
  | "Procurement Staff";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  canteen_id: string;
  institution_id: string;
  avatar_url?: string;
  dietary_preferences?: string[];
}

export interface Canteen {
  id: string;
  institution_id: string;
  name: string;
  location: string;
  operating_hours: string;
  meal_sessions: string[];
  daily_budget_limit: number;
  daily_capacity_portions: number;
  currency: string;
  is_active: boolean;
}

export interface RecipeIngredient {
  ingredient_id: string;
  ingredient_name: string;
  quantity_per_portion: number;
  unit: string;
  cost_per_portion: number;
}

export interface MenuItem {
  id: string;
  canteen_id: string;
  name: string;
  category: string;
  cuisine: string;
  price: number;
  portion_size_g: number;
  is_veg: boolean;
  is_vegan?: boolean;
  is_gluten_free?: boolean;
  allergens: string[];
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  preparation_time_mins: number;
  lead_time_mins: number;
  cost_per_portion: number;
  popularity_score: number;
  ingredients: RecipeIngredient[];
}

export interface Ingredient {
  id: string;
  name: string;
  category: string;
  unit: string;
  unit_cost: number;
  current_stock: number;
  min_stock_threshold: number;
  storage_type: string;
  shelf_life_days: number;
  pack_size: number;
}

export interface InventoryBatch {
  id: string;
  ingredient_id: string;
  ingredient_name: string;
  batch_code: string;
  quantity: number;
  unit: string;
  cost_per_unit: number;
  received_date: string;
  expiry_date: string;
  supplier_id: string;
  status: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact_person: string;
  email: string;
  phone: string;
  lead_time_days: number;
  min_order_value: number;
  rating: number;
  categories_supplied: string[];
}

export interface PurchaseOrderItem {
  ingredient_id: string;
  ingredient_name: string;
  required_quantity: number;
  pack_size: number;
  packs_to_order: number;
  unit_cost: number;
  total_cost: number;
  unit: string;
}

export interface PurchaseOrder {
  id: string;
  canteen_id: string;
  po_number: string;
  supplier_id: string;
  supplier_name: string;
  order_date: string;
  expected_delivery: string;
  status: "Draft" | "Pending" | "Confirmed" | "Received" | "Cancelled";
  total_cost: number;
  items: PurchaseOrderItem[];
  notes?: string;
}

export interface FeatureContribution {
  feature_name: string;
  impact_pct: number;
  direction: "positive" | "negative";
}

export interface ForecastItem {
  menu_item_id: string;
  item_name: string;
  category: string;
  meal_session: string;
  date: string;
  historical_baseline: number;
  ml_forecast: number;
  final_expected_demand: number;
  lower_bound: number;
  upper_bound: number;
  uncertainty_level: "Low" | "Medium" | "High";
  preorders_incorporated: number;
  confidence_score: number;
  is_cold_start: boolean;
  explanations: FeatureContribution[];
}

export interface ForecastEvaluationMetric {
  model_name: string;
  sample_size: number;
  mae: number;
  rmse: number;
  wape: number;
  r2_score: number;
  train_range: string;
  test_range: string;
  notes: string;
}

export interface OptimizedItemRecommendation {
  menu_item_id: string;
  item_name: string;
  category: string;
  is_veg: boolean;
  price: number;
  cost_per_portion: number;
  expected_demand: number;
  recommended_portions: number;
  initial_batch: number;
  reserve_batch: number;
  stockout_risk_pct: number;
  expected_surplus_portions: number;
  projected_revenue: number;
  projected_food_cost: number;
  projected_gross_contribution: number;
  selection_rationale: string;
}

export interface OptimizationPlanResult {
  plan_id: string;
  canteen_id: string;
  target_date: string;
  meal_session: string;
  objective: string;
  solver_status: string;
  total_portions: number;
  total_food_cost: number;
  total_projected_revenue: number;
  total_gross_contribution: number;
  expected_waste_pct: number;
  veg_ratio_pct: number;
  constraint_status: {
    budget_satisfied: boolean;
    kitchen_capacity_satisfied: boolean;
    min_veg_satisfied: boolean;
    variety_bounds_satisfied: boolean;
  };
  recommended_items: OptimizedItemRecommendation[];
  ingredients_required: Array<{
    ingredient_id: string;
    ingredient_name: string;
    required_quantity: number;
    unit: string;
    estimated_cost: number;
  }>;
  alternative_plans: Array<{
    name: string;
    total_portions: number;
    total_food_cost: number;
    gross_contribution: number;
    waste_risk: string;
    highlight: string;
  }>;
  explanation_summary: string;
}

export interface MidServiceCheckpointRecord {
  checkpoint_id: string;
  plan_id: string;
  menu_item_id: string;
  item_name: string;
  timestamp: string;
  elapsed_service_mins: number;
  remaining_service_mins: number;
  current_sold: number;
  current_remaining: number;
  observed_sales_velocity: number;
  projected_additional_demand: number;
  recommended_action: string;
  reasoning: string;
  approved_by_staff: boolean;
}

export interface StudentPreorder {
  id: string;
  student_id: string;
  student_name: string;
  canteen_id: string;
  date: string;
  meal_session: string;
  menu_item_id: string;
  item_name: string;
  portions: number;
  price_each: number;
  total_price: number;
  dietary_notes?: string;
  status: "Submitted" | "Confirmed" | "Fulfilled" | "Cancelled";
  created_at: string;
  rating?: number;
  feedback_text?: string;
}

export interface SurplusOfferRecord {
  id: string;
  canteen_id: string;
  date: string;
  meal_session: string;
  menu_item_id: string;
  item_name: string;
  portions_available: number;
  portions_reserved: number;
  portions_collected: number;
  original_price: number;
  discounted_price: number;
  discount_pct: number;
  food_safety_verified: boolean;
  temperature_verified_c: number;
  verified_by: string;
  safe_until_time: string;
  status: string;
}

export interface WastePropagationResult {
  date: string;
  meal_session: string;
  canteen_id: string;
  item_id: string;
  item_name: string;
  unsold_surplus_portions: number;
  safe_surplus_portions: number;
  actually_discarded_portions: number;
  total_financial_loss: number;
  ingredient_breakdown: Array<{
    ingredient_id: string;
    ingredient_name: string;
    wasted_quantity: number;
    unit: string;
    unit_cost: number;
    financial_loss: number;
    is_perishable: boolean;
  }>;
  root_cause: string;
  actionable_remedy: string;
}

export interface WhatIfSimulationResult {
  simulation_id: string;
  title: string;
  baseline: {
    total_portions: number;
    total_food_cost: number;
    total_revenue: number;
    gross_margin: number;
    expected_surplus_portions: number;
  };
  simulated: {
    total_portions: number;
    total_food_cost: number;
    total_revenue: number;
    gross_margin: number;
    expected_surplus_portions: number;
  };
  delta: {
    delta_portions: number;
    delta_portions_pct: number;
    delta_cost: number;
    delta_cost_pct: number;
    delta_revenue: number;
    delta_margin: number;
    delta_surplus_portions: number;
  };
  items_impact: Array<{
    item_id: string;
    item_name: string;
    status: string;
    baseline_portions: number;
    simulated_portions: number;
    initial_batch?: number;
    reserve_batch?: number;
    unit_cost_adjusted?: number;
    delta_portions: number;
    impact_note: string;
  }>;
  recommendation_notes: string;
}

export interface SustainabilityScorecard {
  canteen_id: string;
  canteen_name: string;
  reporting_period: string;
  waste_per_meal_kg: number;
  forecast_wape: number;
  food_cost_per_meal: number;
  stockout_rate_pct: number;
  student_satisfaction_score: number;
  surplus_recovery_pct: number;
  composite_sustainability_score: number;
  co2_emissions_avoided_kg: number;
  water_saved_liters: number;
  target_waste_per_meal_kg: number;
  trend: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user_name: string;
  user_role: string;
  action_type: string;
  entity_type: string;
  entity_id: string;
  details: string;
  ip_address: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: "alert" | "approval" | "inventory" | "forecast" | "surplus";
  urgency: "low" | "medium" | "high";
  timestamp: string;
  is_read: boolean;
  action_url?: string;
}
