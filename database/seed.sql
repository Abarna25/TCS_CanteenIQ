-- CanteenIQ Database Seed Data Script
-- Populates initial institutions, canteens, roles, demo users, inventory, and menu items

INSERT INTO institutions (id, name, code, currency) VALUES
('inst_tcs_01', 'TCS Innovation & Technology University', 'TCS-ITU', 'USD')
ON CONFLICT (id) DO NOTHING;

INSERT INTO canteens (id, institution_id, name, location, operating_hours, daily_budget_limit, daily_capacity_portions) VALUES
('canteen_main', 'inst_tcs_01', 'Main Food Court (Tech Tower)', 'Building Alpha, Level 1', '07:30 - 20:30', 2400.00, 1200),
('canteen_bistro', 'inst_tcs_01', 'Innovation Wing Bistro', 'Research Hub, Ground Floor', '08:00 - 18:00', 1400.00, 600)
ON CONFLICT (id) DO NOTHING;

INSERT INTO users (id, institution_id, canteen_id, email, name, role) VALUES
('usr_admin', 'inst_tcs_01', 'canteen_main', 'admin@canteeniq.io', 'Dr. Eleanor Vance', 'Administrator'),
('usr_manager', 'inst_tcs_01', 'canteen_main', 'manager@canteeniq.io', 'Chef Marcus Sterling', 'Canteen Manager'),
('usr_kitchen', 'inst_tcs_01', 'canteen_main', 'kitchen@canteeniq.io', 'Kiran Patel', 'Kitchen Staff'),
('usr_student', 'inst_tcs_01', 'canteen_main', 'student@canteeniq.io', 'Aarav Sharma', 'Student'),
('usr_procurement', 'inst_tcs_01', 'canteen_main', 'procurement@canteeniq.io', 'Sarah Jenkins', 'Procurement Staff')
ON CONFLICT (id) DO NOTHING;

INSERT INTO ingredients (id, name, category, unit, unit_cost, current_stock, min_stock_threshold, storage_type, shelf_life_days) VALUES
('ing_rice', 'Basmati Rice', 'Grains', 'kg', 1.80, 180.0, 40.0, 'Dry', 180),
('ing_paneer', 'Fresh Cottage Cheese (Paneer)', 'Dairy', 'kg', 6.50, 24.0, 10.0, 'Refrigerated', 4),
('ing_chicken', 'Boneless Chicken Breast', 'Protein', 'kg', 7.20, 38.0, 15.0, 'Refrigerated', 3),
('ing_tofu', 'Organic Firm Tofu', 'Protein', 'kg', 4.80, 18.0, 8.0, 'Refrigerated', 7),
('ing_quinoa', 'Golden Quinoa', 'Grains', 'kg', 5.40, 35.0, 10.0, 'Dry', 120),
('ing_spinach', 'Baby Spinach Leaves', 'Produce', 'kg', 3.20, 14.0, 6.0, 'Refrigerated', 4),
('ing_tomatoes', 'Vine-Ripe Tomatoes', 'Produce', 'kg', 1.90, 45.0, 15.0, 'Refrigerated', 6)
ON CONFLICT (id) DO NOTHING;

INSERT INTO menu_items (id, canteen_id, name, category, cuisine, price, portion_size_g, is_veg, is_gluten_free, cost_per_portion, popularity_score) VALUES
('item_01', 'canteen_main', 'Mediterranean Grilled Chicken Bowl', 'Grills & Proteins', 'Mediterranean', 7.50, 380.0, false, true, 2.85, 4.7),
('item_02', 'canteen_main', 'Paneer Tikka Masala Rice Bowl', 'Bowls & Curries', 'Indian', 6.20, 420.0, true, true, 2.20, 4.8),
('item_03', 'canteen_main', 'Quinoa & Roasted Veggie Salad', 'Healthy Salads', 'Continental', 5.80, 320.0, true, true, 1.85, 4.3),
('item_04', 'canteen_main', 'Tofu Teriyaki Stir-Fry Noodles', 'Bowls & Curries', 'Asian', 6.50, 400.0, true, false, 2.10, 4.4),
('item_05', 'canteen_main', 'Durum Penne Rosa with Spinach', 'Main Course', 'Italian', 6.00, 390.0, true, false, 1.90, 4.5),
('item_06', 'canteen_main', 'Classic Yellow Dal Tadka with Steamed Rice', 'Bowls & Curries', 'Indian', 4.80, 450.0, true, true, 1.35, 4.6),
('item_07', 'canteen_main', 'Forest Berry Oat Crunch Smoothie', 'Beverages', 'Continental', 3.80, 300.0, true, false, 1.20, 4.5),
('item_08', 'canteen_main', 'Artisanal Avocado & Tomato Sourdough', 'Bakery', 'Continental', 4.50, 240.0, true, false, 1.65, 4.4)
ON CONFLICT (id) DO NOTHING;
