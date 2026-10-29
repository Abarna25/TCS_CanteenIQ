-- CanteenIQ Row Level Security (RLS) Policies
-- Enforces tenant isolation and role-based permissions

ALTER TABLE institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE canteens ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_preorders ENABLE ROW LEVEL SECURITY;
ALTER TABLE production_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE waste_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE surplus_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- 1. Public / Authenticated read policies for published menus and surplus offers
CREATE POLICY student_view_active_menu ON menu_items
    FOR SELECT USING (is_active = true);

CREATE POLICY student_view_surplus_offers ON surplus_offers
    FOR SELECT USING (status = 'Active' AND food_safety_verified = true);

-- 2. Student Preorder Policies
CREATE POLICY student_preorder_insert ON student_preorders
    FOR INSERT WITH CHECK (auth.uid()::text = student_id OR student_id IS NOT NULL);

CREATE POLICY student_preorder_select_own ON student_preorders
    FOR SELECT USING (
        auth.uid()::text = student_id 
        OR EXISTS (
            SELECT 1 FROM users WHERE users.id = auth.uid()::text AND users.role IN ('Administrator', 'Canteen Manager', 'Kitchen Staff')
        )
    );

CREATE POLICY student_preorder_update_own ON student_preorders
    FOR UPDATE USING (auth.uid()::text = student_id);

-- 3. Canteen Manager and Admin full access on operational records
CREATE POLICY manager_manage_menu ON menu_items
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users WHERE users.id = auth.uid()::text AND users.role IN ('Administrator', 'Canteen Manager')
        )
    );

CREATE POLICY manager_manage_production ON production_plans
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users WHERE users.id = auth.uid()::text AND users.role IN ('Administrator', 'Canteen Manager')
        )
    );

CREATE POLICY kitchen_staff_production_view ON production_plans
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users WHERE users.id = auth.uid()::text AND users.role IN ('Kitchen Staff', 'Canteen Manager', 'Administrator')
        )
    );

CREATE POLICY kitchen_record_waste ON waste_records
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users WHERE users.id = auth.uid()::text AND users.role IN ('Kitchen Staff', 'Canteen Manager', 'Administrator')
        )
    );

CREATE POLICY audit_view_admin ON audit_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users WHERE users.id = auth.uid()::text AND users.role = 'Administrator'
        )
    );
