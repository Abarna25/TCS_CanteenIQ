-- CanteenIQ Initial Database Schema
-- Multi-tenant, normalized PostgreSQL/Supabase schema

CREATE TABLE IF NOT EXISTS institutions (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(64) NOT NULL UNIQUE,
    currency VARCHAR(16) DEFAULT 'USD',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS canteens (
    id VARCHAR(64) PRIMARY KEY,
    institution_id VARCHAR(64) REFERENCES institutions(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    operating_hours VARCHAR(128) DEFAULT '07:30 - 20:00',
    meal_sessions JSONB DEFAULT '["Breakfast", "Lunch", "Snacks", "Dinner"]'::jsonb,
    daily_budget_limit NUMERIC(10,2) DEFAULT 2500.00,
    daily_capacity_portions INT DEFAULT 1200,
    currency VARCHAR(16) DEFAULT 'USD',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) PRIMARY KEY,
    institution_id VARCHAR(64) REFERENCES institutions(id) ON DELETE CASCADE,
    canteen_id VARCHAR(64) REFERENCES canteens(id) ON DELETE SET NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(64) NOT NULL, -- Administrator, Canteen Manager, Kitchen Staff, Student, Procurement Staff
    avatar_url TEXT,
    dietary_preferences JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ingredients (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(64) NOT NULL,
    unit VARCHAR(32) NOT NULL,
    unit_cost NUMERIC(10,2) NOT NULL,
    current_stock NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    min_stock_threshold NUMERIC(10,2) NOT NULL DEFAULT 10.00,
    storage_type VARCHAR(64) DEFAULT 'Dry',
    shelf_life_days INT DEFAULT 7,
    pack_size NUMERIC(10,2) DEFAULT 1.00,
    pack_unit VARCHAR(32) DEFAULT 'kg',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS menu_items (
    id VARCHAR(64) PRIMARY KEY,
    canteen_id VARCHAR(64) REFERENCES canteens(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(64) NOT NULL,
    cuisine VARCHAR(64) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    portion_size_g NUMERIC(8,2) NOT NULL,
    is_veg BOOLEAN DEFAULT TRUE,
    is_vegan BOOLEAN DEFAULT FALSE,
    is_gluten_free BOOLEAN DEFAULT FALSE,
    allergens JSONB DEFAULT '[]'::jsonb,
    calories INT DEFAULT 450,
    protein_g NUMERIC(6,2) DEFAULT 18.0,
    carbs_g NUMERIC(6,2) DEFAULT 55.0,
    fat_g NUMERIC(6,2) DEFAULT 14.0,
    preparation_time_mins INT DEFAULT 30,
    lead_time_mins INT DEFAULT 20,
    holding_temp_c NUMERIC(5,2) DEFAULT 65.0,
    max_holding_hours NUMERIC(4,2) DEFAULT 3.5,
    cost_per_portion NUMERIC(10,2) NOT NULL,
    popularity_score NUMERIC(3,2) DEFAULT 4.0,
    image_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS recipe_ingredients (
    id SERIAL PRIMARY KEY,
    menu_item_id VARCHAR(64) REFERENCES menu_items(id) ON DELETE CASCADE,
    ingredient_id VARCHAR(64) REFERENCES ingredients(id) ON DELETE CASCADE,
    quantity_per_portion NUMERIC(10,4) NOT NULL,
    unit VARCHAR(32) NOT NULL,
    cost_per_portion NUMERIC(10,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS student_preorders (
    id VARCHAR(64) PRIMARY KEY,
    student_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    student_name VARCHAR(255) NOT NULL,
    canteen_id VARCHAR(64) REFERENCES canteens(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    meal_session VARCHAR(64) NOT NULL,
    menu_item_id VARCHAR(64) REFERENCES menu_items(id) ON DELETE CASCADE,
    item_name VARCHAR(255) NOT NULL,
    portions INT DEFAULT 1,
    price_each NUMERIC(10,2) NOT NULL,
    total_price NUMERIC(10,2) NOT NULL,
    dietary_notes TEXT,
    status VARCHAR(64) DEFAULT 'Confirmed', -- Submitted, Confirmed, Fulfilled, Cancelled
    rating INT,
    feedback_text TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS production_plans (
    id VARCHAR(64) PRIMARY KEY,
    canteen_id VARCHAR(64) REFERENCES canteens(id) ON DELETE CASCADE,
    target_date DATE NOT NULL,
    meal_session VARCHAR(64) NOT NULL,
    status VARCHAR(64) DEFAULT 'Draft', -- Draft, Optimized, Manager Review, Approved, In Production, Completed
    version INT DEFAULT 1,
    approved_by VARCHAR(255),
    approved_at TIMESTAMPTZ,
    total_food_cost NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    total_projected_revenue NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    gross_contribution NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    plan_data JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS waste_records (
    id SERIAL PRIMARY KEY,
    canteen_id VARCHAR(64) REFERENCES canteens(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    meal_session VARCHAR(64) NOT NULL,
    menu_item_id VARCHAR(64) REFERENCES menu_items(id) ON DELETE CASCADE,
    item_name VARCHAR(255) NOT NULL,
    unsold_surplus_portions INT NOT NULL DEFAULT 0,
    safe_surplus_portions INT NOT NULL DEFAULT 0,
    actually_discarded_portions INT NOT NULL DEFAULT 0,
    financial_loss NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    ingredient_breakdown JSONB DEFAULT '[]'::jsonb,
    root_cause TEXT,
    actionable_remedy TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS surplus_offers (
    id VARCHAR(64) PRIMARY KEY,
    canteen_id VARCHAR(64) REFERENCES canteens(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    meal_session VARCHAR(64) NOT NULL,
    menu_item_id VARCHAR(64) REFERENCES menu_items(id) ON DELETE CASCADE,
    item_name VARCHAR(255) NOT NULL,
    portions_available INT NOT NULL,
    portions_reserved INT NOT NULL DEFAULT 0,
    portions_collected INT NOT NULL DEFAULT 0,
    original_price NUMERIC(10,2) NOT NULL,
    discounted_price NUMERIC(10,2) NOT NULL,
    discount_pct INT DEFAULT 50,
    food_safety_verified BOOLEAN DEFAULT FALSE,
    temperature_verified_c NUMERIC(5,2),
    verified_by VARCHAR(255),
    safe_until_time VARCHAR(64),
    status VARCHAR(64) DEFAULT 'Active',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id VARCHAR(64) PRIMARY KEY,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    user_name VARCHAR(255) NOT NULL,
    user_role VARCHAR(64) NOT NULL,
    action_type VARCHAR(64) NOT NULL,
    entity_type VARCHAR(64) NOT NULL,
    entity_id VARCHAR(64) NOT NULL,
    details TEXT NOT NULL,
    ip_address VARCHAR(64) DEFAULT '127.0.0.1'
);

-- Indexing for fast analytical and operational lookups
CREATE INDEX idx_preorders_date_session ON student_preorders (canteen_id, date, meal_session);
CREATE INDEX idx_menu_canteen ON menu_items (canteen_id);
CREATE INDEX idx_production_canteen_date ON production_plans (canteen_id, target_date);
CREATE INDEX idx_waste_canteen_date ON waste_records (canteen_id, date);
