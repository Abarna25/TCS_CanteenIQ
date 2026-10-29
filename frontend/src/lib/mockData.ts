import {
  User, Canteen, MenuItem, Ingredient, InventoryBatch, Supplier,
  StudentPreorder, SurplusOfferRecord, SustainabilityScorecard, AuditLogEntry, NotificationItem
} from "@/types";

export const initialUsers: User[] = [
  { id: "usr_admin", email: "admin@canteeniq.io", name: "Dr. Eleanor Vance", role: "Administrator", canteen_id: "canteen_main", institution_id: "inst_tcs_01" },
  { id: "usr_manager", email: "manager@canteeniq.io", name: "Chef Marcus Sterling", role: "Canteen Manager", canteen_id: "canteen_main", institution_id: "inst_tcs_01" },
  { id: "usr_kitchen", email: "kitchen@canteeniq.io", name: "Kiran Patel", role: "Kitchen Staff", canteen_id: "canteen_main", institution_id: "inst_tcs_01" },
  { id: "usr_student", email: "student@canteeniq.io", name: "Aarav Sharma", role: "Student", canteen_id: "canteen_main", institution_id: "inst_tcs_01", dietary_preferences: ["Vegetarian", "High Protein"] },
  { id: "usr_procurement", email: "procurement@canteeniq.io", name: "Sarah Jenkins", role: "Procurement Staff", canteen_id: "canteen_main", institution_id: "inst_tcs_01" }
];

export const initialCanteens: Canteen[] = [
  {
    id: "canteen_main",
    institution_id: "inst_tcs_01",
    name: "Main Food Court (Tech Tower)",
    location: "Building Alpha, Level 1",
    operating_hours: "07:30 - 20:30",
    meal_sessions: ["Breakfast", "Lunch", "Snacks", "Dinner"],
    daily_budget_limit: 2400.0,
    daily_capacity_portions: 1200,
    currency: "USD",
    is_active: true
  },
  {
    id: "canteen_bistro",
    institution_id: "inst_tcs_01",
    name: "Innovation Wing Bistro",
    location: "Research Hub, Ground Floor",
    operating_hours: "08:00 - 18:00",
    meal_sessions: ["Breakfast", "Lunch", "Snacks"],
    daily_budget_limit: 1400.0,
    daily_capacity_portions: 600,
    currency: "USD",
    is_active: true
  }
];

export const initialIngredients: Ingredient[] = [
  { id: "ing_rice", name: "Basmati Rice", category: "Grains", unit: "kg", unit_cost: 1.80, current_stock: 180.0, min_stock_threshold: 40.0, storage_type: "Dry", shelf_life_days: 180, pack_size: 25.0 },
  { id: "ing_paneer", name: "Fresh Cottage Cheese (Paneer)", category: "Dairy", unit: "kg", unit_cost: 6.50, current_stock: 24.0, min_stock_threshold: 10.0, storage_type: "Refrigerated", shelf_life_days: 4, pack_size: 5.0 },
  { id: "ing_chicken", name: "Boneless Chicken Breast", category: "Protein", unit: "kg", unit_cost: 7.20, current_stock: 38.0, min_stock_threshold: 15.0, storage_type: "Refrigerated", shelf_life_days: 3, pack_size: 10.0 },
  { id: "ing_tofu", name: "Organic Firm Tofu", category: "Protein", unit: "kg", unit_cost: 4.80, current_stock: 18.0, min_stock_threshold: 8.0, storage_type: "Refrigerated", shelf_life_days: 7, pack_size: 5.0 },
  { id: "ing_quinoa", name: "Golden Quinoa", category: "Grains", unit: "kg", unit_cost: 5.40, current_stock: 35.0, min_stock_threshold: 10.0, storage_type: "Dry", shelf_life_days: 120, pack_size: 5.0 },
  { id: "ing_spinach", name: "Baby Spinach Leaves", category: "Produce", unit: "kg", unit_cost: 3.20, current_stock: 14.0, min_stock_threshold: 6.0, storage_type: "Refrigerated", shelf_life_days: 4, pack_size: 2.0 },
  { id: "ing_tomatoes", name: "Vine-Ripe Tomatoes", category: "Produce", unit: "kg", unit_cost: 1.90, current_stock: 45.0, min_stock_threshold: 15.0, storage_type: "Refrigerated", shelf_life_days: 6, pack_size: 10.0 },
  { id: "ing_bell_peppers", name: "Assorted Bell Peppers", category: "Produce", unit: "kg", unit_cost: 3.50, current_stock: 22.0, min_stock_threshold: 8.0, storage_type: "Refrigerated", shelf_life_days: 5, pack_size: 5.0 },
  { id: "ing_lentils", name: "Red & Yellow Lentils", category: "Grains", unit: "kg", unit_cost: 2.10, current_stock: 60.0, min_stock_threshold: 20.0, storage_type: "Dry", shelf_life_days: 180, pack_size: 20.0 },
  { id: "ing_pasta", name: "Durum Wheat Penne Pasta", category: "Grains", unit: "kg", unit_cost: 2.30, current_stock: 40.0, min_stock_threshold: 15.0, storage_type: "Dry", shelf_life_days: 180, pack_size: 10.0 },
  { id: "ing_olive_oil", name: "Extra Virgin Olive Oil", category: "Dairy", unit: "l", unit_cost: 8.50, current_stock: 30.0, min_stock_threshold: 10.0, storage_type: "Dry", shelf_life_days: 365, pack_size: 5.0 },
  { id: "ing_spices", name: "Culinary Spice Blend", category: "Spices", unit: "kg", unit_cost: 14.00, current_stock: 8.0, min_stock_threshold: 3.0, storage_type: "Dry", shelf_life_days: 240, pack_size: 2.0 }
];

export const initialBatches: InventoryBatch[] = [
  { id: "batch_01", ingredient_id: "ing_paneer", ingredient_name: "Fresh Cottage Cheese (Paneer)", batch_code: "BN-PAN-092", quantity: 14.0, unit: "kg", cost_per_unit: 6.50, received_date: "2026-10-27", expiry_date: "2026-10-31", supplier_id: "sup_02", status: "Active" },
  { id: "batch_02", ingredient_id: "ing_chicken", ingredient_name: "Boneless Chicken Breast", batch_code: "BN-CHK-104", quantity: 22.0, unit: "kg", cost_per_unit: 7.20, received_date: "2026-10-28", expiry_date: "2026-10-31", supplier_id: "sup_01", status: "Active" },
  { id: "batch_03", ingredient_id: "ing_spinach", ingredient_name: "Baby Spinach Leaves", batch_code: "BN-SPN-412", quantity: 10.0, unit: "kg", cost_per_unit: 3.20, received_date: "2026-10-28", expiry_date: "2026-10-31", supplier_id: "sup_01", status: "Active" },
  { id: "batch_04", ingredient_id: "ing_rice", ingredient_name: "Basmati Rice", batch_code: "BN-RIC-881", quantity: 120.0, unit: "kg", cost_per_unit: 1.80, received_date: "2026-10-15", expiry_date: "2027-04-15", supplier_id: "sup_03", status: "Active" }
];

export const initialMenuItems: MenuItem[] = [
  {
    id: "item_01",
    canteen_id: "canteen_main",
    name: "Mediterranean Grilled Chicken Bowl",
    category: "Grills & Proteins",
    cuisine: "Mediterranean",
    price: 7.50,
    portion_size_g: 380,
    is_veg: false,
    is_gluten_free: true,
    allergens: [],
    calories: 540,
    protein_g: 36,
    carbs_g: 48,
    fat_g: 14,
    preparation_time_mins: 35,
    lead_time_mins: 25,
    cost_per_portion: 2.85,
    popularity_score: 4.7,
    ingredients: [
      { ingredient_id: "ing_chicken", ingredient_name: "Boneless Chicken Breast", quantity_per_portion: 0.18, unit: "kg", cost_per_portion: 1.30 },
      { ingredient_id: "ing_quinoa", ingredient_name: "Golden Quinoa", quantity_per_portion: 0.08, unit: "kg", cost_per_portion: 0.43 },
      { ingredient_id: "ing_bell_peppers", ingredient_name: "Assorted Bell Peppers", quantity_per_portion: 0.07, unit: "kg", cost_per_portion: 0.25 }
    ]
  },
  {
    id: "item_02",
    canteen_id: "canteen_main",
    name: "Paneer Tikka Masala Rice Bowl",
    category: "Bowls & Curries",
    cuisine: "Indian",
    price: 6.20,
    portion_size_g: 420,
    is_veg: true,
    is_gluten_free: true,
    allergens: ["Dairy"],
    calories: 580,
    protein_g: 24,
    carbs_g: 68,
    fat_g: 19,
    preparation_time_mins: 30,
    lead_time_mins: 20,
    cost_per_portion: 2.20,
    popularity_score: 4.8,
    ingredients: [
      { ingredient_id: "ing_paneer", ingredient_name: "Fresh Cottage Cheese (Paneer)", quantity_per_portion: 0.14, unit: "kg", cost_per_portion: 0.91 },
      { ingredient_id: "ing_rice", ingredient_name: "Basmati Rice", quantity_per_portion: 0.12, unit: "kg", cost_per_portion: 0.22 },
      { ingredient_id: "ing_tomatoes", ingredient_name: "Vine-Ripe Tomatoes", quantity_per_portion: 0.10, unit: "kg", cost_per_portion: 0.19 }
    ]
  },
  {
    id: "item_03",
    canteen_id: "canteen_main",
    name: "Quinoa & Roasted Veggie Salad",
    category: "Healthy Salads",
    cuisine: "Continental",
    price: 5.80,
    portion_size_g: 320,
    is_veg: true,
    is_vegan: true,
    is_gluten_free: true,
    allergens: [],
    calories: 390,
    protein_g: 14,
    carbs_g: 52,
    fat_g: 11,
    preparation_time_mins: 20,
    lead_time_mins: 15,
    cost_per_portion: 1.85,
    popularity_score: 4.3,
    ingredients: [
      { ingredient_id: "ing_quinoa", ingredient_name: "Golden Quinoa", quantity_per_portion: 0.10, unit: "kg", cost_per_portion: 0.54 },
      { ingredient_id: "ing_spinach", ingredient_name: "Baby Spinach Leaves", quantity_per_portion: 0.08, unit: "kg", cost_per_portion: 0.26 }
    ]
  },
  {
    id: "item_04",
    canteen_id: "canteen_main",
    name: "Tofu Teriyaki Stir-Fry Noodles",
    category: "Bowls & Curries",
    cuisine: "Asian",
    price: 6.50,
    portion_size_g: 400,
    is_veg: true,
    is_vegan: true,
    allergens: ["Soy"],
    calories: 480,
    protein_g: 22,
    carbs_g: 62,
    fat_g: 13,
    preparation_time_mins: 25,
    lead_time_mins: 15,
    cost_per_portion: 2.10,
    popularity_score: 4.4,
    ingredients: [
      { ingredient_id: "ing_tofu", ingredient_name: "Organic Firm Tofu", quantity_per_portion: 0.15, unit: "kg", cost_per_portion: 0.72 },
      { ingredient_id: "ing_bell_peppers", ingredient_name: "Assorted Bell Peppers", quantity_per_portion: 0.08, unit: "kg", cost_per_portion: 0.28 }
    ]
  },
  {
    id: "item_05",
    canteen_id: "canteen_main",
    name: "Durum Penne Rosa with Spinach",
    category: "Main Course",
    cuisine: "Italian",
    price: 6.00,
    portion_size_g: 390,
    is_veg: true,
    allergens: ["Gluten", "Dairy"],
    calories: 510,
    protein_g: 17,
    carbs_g: 74,
    fat_g: 12,
    preparation_time_mins: 25,
    lead_time_mins: 15,
    cost_per_portion: 1.90,
    popularity_score: 4.5,
    ingredients: [
      { ingredient_id: "ing_pasta", ingredient_name: "Durum Wheat Penne Pasta", quantity_per_portion: 0.14, unit: "kg", cost_per_portion: 0.32 },
      { ingredient_id: "ing_spinach", ingredient_name: "Baby Spinach Leaves", quantity_per_portion: 0.07, unit: "kg", cost_per_portion: 0.22 }
    ]
  },
  {
    id: "item_06",
    canteen_id: "canteen_main",
    name: "Classic Yellow Dal Tadka with Steamed Rice",
    category: "Bowls & Curries",
    cuisine: "Indian",
    price: 4.80,
    portion_size_g: 450,
    is_veg: true,
    is_vegan: true,
    is_gluten_free: true,
    allergens: [],
    calories: 470,
    protein_g: 18,
    carbs_g: 78,
    fat_g: 7,
    preparation_time_mins: 30,
    lead_time_mins: 20,
    cost_per_portion: 1.35,
    popularity_score: 4.6,
    ingredients: [
      { ingredient_id: "ing_lentils", ingredient_name: "Red & Yellow Lentils", quantity_per_portion: 0.10, unit: "kg", cost_per_portion: 0.21 },
      { ingredient_id: "ing_rice", ingredient_name: "Basmati Rice", quantity_per_portion: 0.14, unit: "kg", cost_per_portion: 0.25 }
    ]
  }
];

export const initialPreorders: StudentPreorder[] = [
  {
    id: "po_01",
    student_id: "usr_student",
    student_name: "Aarav Sharma",
    canteen_id: "canteen_main",
    date: "2026-10-30",
    meal_session: "Lunch",
    menu_item_id: "item_02",
    item_name: "Paneer Tikka Masala Rice Bowl",
    portions: 1,
    price_each: 6.20,
    total_price: 6.20,
    dietary_notes: "Mild spice please",
    status: "Confirmed",
    created_at: "2026-10-29T10:15:00Z",
    rating: 5,
    feedback_text: "Consistently delicious and fresh paneer!"
  },
  {
    id: "po_02",
    student_id: "usr_student_2",
    student_name: "Meera Sen",
    canteen_id: "canteen_main",
    date: "2026-10-30",
    meal_session: "Lunch",
    menu_item_id: "item_01",
    item_name: "Mediterranean Grilled Chicken Bowl",
    portions: 1,
    price_each: 7.50,
    total_price: 7.50,
    dietary_notes: "Extra dressing on side",
    status: "Confirmed",
    created_at: "2026-10-29T11:20:00Z"
  },
  {
    id: "po_03",
    student_id: "usr_student_3",
    student_name: "Rohan Nair",
    canteen_id: "canteen_main",
    date: "2026-10-30",
    meal_session: "Lunch",
    menu_item_id: "item_03",
    item_name: "Quinoa & Roasted Veggie Salad",
    portions: 1,
    price_each: 5.80,
    total_price: 5.80,
    dietary_notes: "Gluten free verified",
    status: "Confirmed",
    created_at: "2026-10-29T11:45:00Z"
  }
];

export const initialSuppliers: Supplier[] = [
  { id: "sup_01", name: "Apex Agro & Fresh Produce", contact_person: "Dinesh Gupta", email: "orders@apexagro.com", phone: "+91 98201 12345", lead_time_days: 1, min_order_value: 80.0, rating: 4.8, categories_supplied: ["Produce", "Protein"] },
  { id: "sup_02", name: "Heritage Dairy Farms", contact_person: "Priya Nair", email: "dispatch@heritagedairy.in", phone: "+91 98450 67890", lead_time_days: 1, min_order_value: 60.0, rating: 4.7, categories_supplied: ["Dairy"] },
  { id: "sup_03", name: "Continental Grains & Millers", contact_person: "Vikram Rao", email: "sales@continentalgrains.com", phone: "+91 97110 34567", lead_time_days: 2, min_order_value: 120.0, rating: 4.6, categories_supplied: ["Grains", "Spices", "Bakery"] }
];

export const initialSurplusOffers: SurplusOfferRecord[] = [
  {
    id: "offer_01",
    canteen_id: "canteen_main",
    date: "2026-10-30",
    meal_session: "Lunch",
    menu_item_id: "item_02",
    item_name: "Paneer Tikka Masala Rice Bowl",
    portions_available: 16,
    portions_reserved: 4,
    portions_collected: 2,
    original_price: 6.20,
    discounted_price: 3.10,
    discount_pct: 50,
    food_safety_verified: true,
    temperature_verified_c: 64.5,
    verified_by: "Chef Marcus Sterling",
    safe_until_time: "14:15 (Session Closing)",
    status: "Active"
  }
];

export const initialScorecards: Record<string, SustainabilityScorecard> = {
  canteen_main: {
    canteen_id: "canteen_main",
    canteen_name: "Main Food Court (Tech Tower)",
    reporting_period: "October 2026",
    waste_per_meal_kg: 0.038,
    forecast_wape: 8.4,
    food_cost_per_meal: 2.18,
    stockout_rate_pct: 2.1,
    student_satisfaction_score: 4.6,
    surplus_recovery_pct: 88.5,
    composite_sustainability_score: 92.4,
    co2_emissions_avoided_kg: 482.0,
    water_saved_liters: 14500.0,
    target_waste_per_meal_kg: 0.045,
    trend: "Improving (+4.2% MoM)"
  },
  canteen_bistro: {
    canteen_id: "canteen_bistro",
    canteen_name: "Innovation Wing Bistro",
    reporting_period: "October 2026",
    waste_per_meal_kg: 0.049,
    forecast_wape: 11.2,
    food_cost_per_meal: 2.45,
    stockout_rate_pct: 4.5,
    student_satisfaction_score: 4.4,
    surplus_recovery_pct: 76.0,
    composite_sustainability_score: 84.8,
    co2_emissions_avoided_kg: 190.0,
    water_saved_liters: 5200.0,
    target_waste_per_meal_kg: 0.045,
    trend: "Stable"
  }
};

export const initialNotifications: NotificationItem[] = [
  {
    id: "notif_01",
    title: "FEFO Shortage Warning",
    message: "Fresh Cottage Cheese (Paneer) batch BN-PAN-092 expires in 3 days. Prioritize in today's menu.",
    category: "inventory",
    urgency: "high",
    timestamp: "10m ago",
    is_read: false,
    action_url: "/inventory"
  },
  {
    id: "notif_02",
    title: "3 New Student Preorders",
    message: "Preorders registered for Lunch service. Demand floor automatically elevated.",
    category: "forecast",
    urgency: "medium",
    timestamp: "25m ago",
    is_read: false,
    action_url: "/forecasting"
  }
];

export const initialAuditLogs: AuditLogEntry[] = [
  {
    id: "log_01",
    timestamp: "2026-10-29T10:00:00Z",
    user_name: "Dr. Eleanor Vance",
    user_role: "Administrator",
    action_type: "SYSTEM_INITIALIZATION",
    entity_type: "Database",
    entity_id: "inst_tcs_01",
    details: "Initialized CanteenIQ for TCS Innovation & Technology Campus.",
    ip_address: "10.14.2.1"
  },
  {
    id: "log_02",
    timestamp: "2026-10-29T11:00:00Z",
    user_name: "Chef Marcus Sterling",
    user_role: "Canteen Manager",
    action_type: "OPTIMIZE_MENU",
    entity_type: "ProductionPlan",
    entity_id: "plan_2026-10-30_lunch",
    details: "Executed Profit-focused menu optimization covering 6 dishes within $1200 budget.",
    ip_address: "10.14.2.45"
  }
];
