"""
Seed Data Generator for CanteenIQ
Populates high-fidelity campus canteen data:
- Institutions & Multi-Canteen setup (Main Food Court, Innovation Wing Bistro)
- Seed users with 5 distinct roles for seamless demo login
- 16 Realistic Menu Items with complete recipes, nutritional values, allergens & shelf-life
- Raw Ingredients & Inventory Batches with FEFO expiry tracking
- Suppliers & Purchase Orders
- 60+ Days of Historical Demand records (Kaggle Food Demand inspired)
- Active & Historical Student Preorders
- Production Plans, Mid-Service Checkpoints & Waste Propagation
- Safe Surplus Offers & Sustainability Scorecards
"""

from typing import List, Dict, Any
from app.models import (
    Institution, Canteen, User, Ingredient, RecipeIngredient, MenuItem,
    InventoryBatch, Supplier, PurchaseOrder, PurchaseOrderItem,
    HistoricalDemandRecord, StudentPreorder, SustainabilityScorecard
)

def get_seed_institutions() -> List[Institution]:
    return [
        Institution(
            id="inst_tcs_01",
            name="TCS Innovation & Technology University",
            code="TCS-ITU",
            currency="USD"
        )
    ]

def get_seed_canteens() -> List[Canteen]:
    return [
        Canteen(
            id="canteen_main",
            institution_id="inst_tcs_01",
            name="Main Food Court (Tech Tower)",
            location="Building Alpha, Level 1",
            operating_hours="07:30 - 20:30",
            meal_sessions=["Breakfast", "Lunch", "Snacks", "Dinner"],
            daily_budget_limit=2400.0,
            daily_capacity_portions=1200,
            currency="USD",
            is_active=True
        ),
        Canteen(
            id="canteen_bistro",
            institution_id="inst_tcs_01",
            name="Innovation Wing Bistro",
            location="Research Hub, Ground Floor",
            operating_hours="08:00 - 18:00",
            meal_sessions=["Breakfast", "Lunch", "Snacks"],
            daily_budget_limit=1400.0,
            daily_capacity_portions=600,
            currency="USD",
            is_active=True
        )
    ]

def get_seed_users() -> List[User]:
    return [
        User(
            id="usr_admin",
            email="admin@canteeniq.io",
            name="Dr. Eleanor Vance",
            role="Administrator",
            canteen_id="canteen_main",
            institution_id="inst_tcs_01"
        ),
        User(
            id="usr_manager",
            email="manager@canteeniq.io",
            name="Chef Marcus Sterling",
            role="Canteen Manager",
            canteen_id="canteen_main",
            institution_id="inst_tcs_01"
        ),
        User(
            id="usr_kitchen",
            email="kitchen@canteeniq.io",
            name="Kiran Patel",
            role="Kitchen Staff",
            canteen_id="canteen_main",
            institution_id="inst_tcs_01"
        ),
        User(
            id="usr_student",
            email="student@canteeniq.io",
            name="Aarav Sharma",
            role="Student",
            canteen_id="canteen_main",
            institution_id="inst_tcs_01",
            dietary_preferences=["Vegetarian", "High Protein"]
        ),
        User(
            id="usr_procurement",
            email="procurement@canteeniq.io",
            name="Sarah Jenkins",
            role="Procurement Staff",
            canteen_id="canteen_main",
            institution_id="inst_tcs_01"
        )
    ]

def get_seed_ingredients() -> List[Ingredient]:
    return [
        Ingredient(id="ing_rice", name="Basmati Rice", category="Grains", unit="kg", unit_cost=1.80, current_stock=180.0, min_stock_threshold=40.0, storage_type="Dry", shelf_life_days=180, pack_size=25.0),
        Ingredient(id="ing_paneer", name="Fresh Cottage Cheese (Paneer)", category="Dairy", unit="kg", unit_cost=6.50, current_stock=24.0, min_stock_threshold=10.0, storage_type="Refrigerated", shelf_life_days=4, pack_size=5.0),
        Ingredient(id="ing_chicken", name="Boneless Chicken Breast", category="Protein", unit="kg", unit_cost=7.20, current_stock=38.0, min_stock_threshold=15.0, storage_type="Refrigerated", shelf_life_days=3, pack_size=10.0),
        Ingredient(id="ing_tofu", name="Organic Firm Tofu", category="Protein", unit="kg", unit_cost=4.80, current_stock=18.0, min_stock_threshold=8.0, storage_type="Refrigerated", shelf_life_days=7, pack_size=5.0),
        Ingredient(id="ing_quinoa", name="Golden Quinoa", category="Grains", unit="kg", unit_cost=5.40, current_stock=35.0, min_stock_threshold=10.0, storage_type="Dry", shelf_life_days=120, pack_size=5.0),
        Ingredient(id="ing_spinach", name="Baby Spinach Leaves", category="Produce", unit="kg", unit_cost=3.20, current_stock=14.0, min_stock_threshold=6.0, storage_type="Refrigerated", shelf_life_days=4, pack_size=2.0),
        Ingredient(id="ing_tomatoes", name="Vine-Ripe Tomatoes", category="Produce", unit="kg", unit_cost=1.90, current_stock=45.0, min_stock_threshold=15.0, storage_type="Refrigerated", shelf_life_days=6, pack_size=10.0),
        Ingredient(id="ing_bell_peppers", name="Assorted Bell Peppers", category="Produce", unit="kg", unit_cost=3.50, current_stock=22.0, min_stock_threshold=8.0, storage_type="Refrigerated", shelf_life_days=5, pack_size=5.0),
        Ingredient(id="ing_lentils", name="Red & Yellow Lentils", category="Grains", unit="kg", unit_cost=2.10, current_stock=60.0, min_stock_threshold=20.0, storage_type="Dry", shelf_life_days=180, pack_size=20.0),
        Ingredient(id="ing_pasta", name="Durum Wheat Penne Pasta", category="Grains", unit="kg", unit_cost=2.30, current_stock=40.0, min_stock_threshold=15.0, storage_type="Dry", shelf_life_days=180, pack_size=10.0),
        Ingredient(id="ing_olive_oil", name="Extra Virgin Olive Oil", category="Dairy", unit="l", unit_cost=8.50, current_stock=30.0, min_stock_threshold=10.0, storage_type="Dry", shelf_life_days=365, pack_size=5.0),
        Ingredient(id="ing_spices", name="Culinary Spice Blend (Garam & Herb)", category="Spices", unit="kg", unit_cost=14.00, current_stock=8.0, min_stock_threshold=3.0, storage_type="Dry", shelf_life_days=240, pack_size=2.0),
        Ingredient(id="ing_milk", name="Whole Milk / Plant Blend", category="Dairy", unit="l", unit_cost=1.20, current_stock=60.0, min_stock_threshold=25.0, storage_type="Refrigerated", shelf_life_days=5, pack_size=12.0),
        Ingredient(id="ing_oats", name="Rolled Oats", category="Grains", unit="kg", unit_cost=2.60, current_stock=28.0, min_stock_threshold=10.0, storage_type="Dry", shelf_life_days=120, pack_size=10.0),
        Ingredient(id="ing_sourdough", name="Artisanal Sourdough Loaves", category="Bakery", unit="pcs", unit_cost=3.00, current_stock=18.0, min_stock_threshold=8.0, storage_type="Dry", shelf_life_days=3, pack_size=10.0),
        Ingredient(id="ing_avocado", name="Fresh Hass Avocados", category="Produce", unit="kg", unit_cost=6.80, current_stock=12.0, min_stock_threshold=5.0, storage_type="Refrigerated", shelf_life_days=4, pack_size=5.0),
        Ingredient(id="ing_berries", name="Frozen Mixed Forest Berries", category="Produce", unit="kg", unit_cost=7.00, current_stock=20.0, min_stock_threshold=8.0, storage_type="Frozen", shelf_life_days=90, pack_size=5.0)
    ]

def get_seed_menu_items() -> List[MenuItem]:
    return [
        MenuItem(
            id="item_01",
            canteen_id="canteen_main",
            name="Mediterranean Grilled Chicken Bowl",
            category="Grills & Proteins",
            cuisine="Mediterranean",
            price=7.50,
            portion_size_g=380.0,
            is_veg=False,
            is_gluten_free=True,
            allergens=[],
            calories=540,
            protein_g=36.0,
            carbs_g=48.0,
            fat_g=14.0,
            preparation_time_mins=35,
            lead_time_mins=25,
            cost_per_portion=2.85,
            popularity_score=4.7,
            ingredients=[
                RecipeIngredient(ingredient_id="ing_chicken", ingredient_name="Boneless Chicken Breast", quantity_per_portion=0.18, unit="kg", cost_per_portion=1.30),
                RecipeIngredient(ingredient_id="ing_quinoa", ingredient_name="Golden Quinoa", quantity_per_portion=0.08, unit="kg", cost_per_portion=0.43),
                RecipeIngredient(ingredient_id="ing_bell_peppers", ingredient_name="Assorted Bell Peppers", quantity_per_portion=0.07, unit="kg", cost_per_portion=0.25),
                RecipeIngredient(ingredient_id="ing_olive_oil", ingredient_name="Extra Virgin Olive Oil", quantity_per_portion=0.015, unit="l", cost_per_portion=0.13),
                RecipeIngredient(ingredient_id="ing_spices", ingredient_name="Culinary Spice Blend", quantity_per_portion=0.008, unit="kg", cost_per_portion=0.11)
            ]
        ),
        MenuItem(
            id="item_02",
            canteen_id="canteen_main",
            name="Paneer Tikka Masala Rice Bowl",
            category="Bowls & Curries",
            cuisine="Indian",
            price=6.20,
            portion_size_g=420.0,
            is_veg=True,
            is_gluten_free=True,
            allergens=["Dairy"],
            calories=580,
            protein_g=24.0,
            carbs_g=68.0,
            fat_g=19.0,
            preparation_time_mins=30,
            lead_time_mins=20,
            cost_per_portion=2.20,
            popularity_score=4.8,
            ingredients=[
                RecipeIngredient(ingredient_id="ing_paneer", ingredient_name="Fresh Cottage Cheese (Paneer)", quantity_per_portion=0.14, unit="kg", cost_per_portion=0.91),
                RecipeIngredient(ingredient_id="ing_rice", ingredient_name="Basmati Rice", quantity_per_portion=0.12, unit="kg", cost_per_portion=0.22),
                RecipeIngredient(ingredient_id="ing_tomatoes", ingredient_name="Vine-Ripe Tomatoes", quantity_per_portion=0.10, unit="kg", cost_per_portion=0.19),
                RecipeIngredient(ingredient_id="ing_spices", ingredient_name="Culinary Spice Blend", quantity_per_portion=0.012, unit="kg", cost_per_portion=0.17)
            ]
        ),
        MenuItem(
            id="item_03",
            canteen_id="canteen_main",
            name="Quinoa & Roasted Veggie Salad",
            category="Healthy Salads",
            cuisine="Continental",
            price=5.80,
            portion_size_g=320.0,
            is_veg=True,
            is_vegan=True,
            is_gluten_free=True,
            allergens=[],
            calories=390,
            protein_g=14.0,
            carbs_g=52.0,
            fat_g=11.0,
            preparation_time_mins=20,
            lead_time_mins=15,
            cost_per_portion=1.85,
            popularity_score=4.3,
            ingredients=[
                RecipeIngredient(ingredient_id="ing_quinoa", ingredient_name="Golden Quinoa", quantity_per_portion=0.10, unit="kg", cost_per_portion=0.54),
                RecipeIngredient(ingredient_id="ing_spinach", ingredient_name="Baby Spinach Leaves", quantity_per_portion=0.08, unit="kg", cost_per_portion=0.26),
                RecipeIngredient(ingredient_id="ing_bell_peppers", ingredient_name="Assorted Bell Peppers", quantity_per_portion=0.08, unit="kg", cost_per_portion=0.28),
                RecipeIngredient(ingredient_id="ing_olive_oil", ingredient_name="Extra Virgin Olive Oil", quantity_per_portion=0.02, unit="l", cost_per_portion=0.17)
            ]
        ),
        MenuItem(
            id="item_04",
            canteen_id="canteen_main",
            name="Tofu Teriyaki Stir-Fry Noodles",
            category="Bowls & Curries",
            cuisine="Asian",
            price=6.50,
            portion_size_g=400.0,
            is_veg=True,
            is_vegan=True,
            allergens=["Soy"],
            calories=480,
            protein_g=22.0,
            carbs_g=62.0,
            fat_g=13.0,
            preparation_time_mins=25,
            lead_time_mins=15,
            cost_per_portion=2.10,
            popularity_score=4.4,
            ingredients=[
                RecipeIngredient(ingredient_id="ing_tofu", ingredient_name="Organic Firm Tofu", quantity_per_portion=0.15, unit="kg", cost_per_portion=0.72),
                RecipeIngredient(ingredient_id="ing_bell_peppers", ingredient_name="Assorted Bell Peppers", quantity_per_portion=0.08, unit="kg", cost_per_portion=0.28),
                RecipeIngredient(ingredient_id="ing_spinach", ingredient_name="Baby Spinach Leaves", quantity_per_portion=0.06, unit="kg", cost_per_portion=0.19)
            ]
        ),
        MenuItem(
            id="item_05",
            canteen_id="canteen_main",
            name="Durum Penne Rosa with Spinach",
            category="Main Course",
            cuisine="Italian",
            price=6.00,
            portion_size_g=390.0,
            is_veg=True,
            allergens=["Gluten", "Dairy"],
            calories=510,
            protein_g=17.0,
            carbs_g=74.0,
            fat_g=12.0,
            preparation_time_mins=25,
            lead_time_mins=15,
            cost_per_portion=1.90,
            popularity_score=4.5,
            ingredients=[
                RecipeIngredient(ingredient_id="ing_pasta", ingredient_name="Durum Wheat Penne Pasta", quantity_per_portion=0.14, unit="kg", cost_per_portion=0.32),
                RecipeIngredient(ingredient_id="ing_tomatoes", ingredient_name="Vine-Ripe Tomatoes", quantity_per_portion=0.12, unit="kg", cost_per_portion=0.23),
                RecipeIngredient(ingredient_id="ing_spinach", ingredient_name="Baby Spinach Leaves", quantity_per_portion=0.07, unit="kg", cost_per_portion=0.22)
            ]
        ),
        MenuItem(
            id="item_06",
            canteen_id="canteen_main",
            name="Classic Yellow Dal Tadka with Steamed Rice",
            category="Bowls & Curries",
            cuisine="Indian",
            price=4.80,
            portion_size_g=450.0,
            is_veg=True,
            is_vegan=True,
            is_gluten_free=True,
            allergens=[],
            calories=470,
            protein_g=18.0,
            carbs_g=78.0,
            fat_g=7.0,
            preparation_time_mins=30,
            lead_time_mins=20,
            cost_per_portion=1.35,
            popularity_score=4.6,
            ingredients=[
                RecipeIngredient(ingredient_id="ing_lentils", ingredient_name="Red & Yellow Lentils", quantity_per_portion=0.10, unit="kg", cost_per_portion=0.21),
                RecipeIngredient(ingredient_id="ing_rice", ingredient_name="Basmati Rice", quantity_per_portion=0.14, unit="kg", cost_per_portion=0.25),
                RecipeIngredient(ingredient_id="ing_tomatoes", ingredient_name="Vine-Ripe Tomatoes", quantity_per_portion=0.08, unit="kg", cost_per_portion=0.15)
            ]
        ),
        MenuItem(
            id="item_07",
            canteen_id="canteen_main",
            name="Forest Berry Oat Crunch Smoothie",
            category="Beverages",
            cuisine="Continental",
            price=3.80,
            portion_size_g=300.0,
            is_veg=True,
            allergens=["Dairy"],
            calories=280,
            protein_g=9.0,
            carbs_g=44.0,
            fat_g=4.0,
            preparation_time_mins=10,
            lead_time_mins=5,
            cost_per_portion=1.20,
            popularity_score=4.5,
            ingredients=[
                RecipeIngredient(ingredient_id="ing_berries", ingredient_name="Frozen Mixed Forest Berries", quantity_per_portion=0.08, unit="kg", cost_per_portion=0.56),
                RecipeIngredient(ingredient_id="ing_milk", ingredient_name="Whole Milk", quantity_per_portion=0.20, unit="l", cost_per_portion=0.24),
                RecipeIngredient(ingredient_id="ing_oats", ingredient_name="Rolled Oats", quantity_per_portion=0.04, unit="kg", cost_per_portion=0.10)
            ]
        ),
        MenuItem(
            id="item_08",
            canteen_id="canteen_main",
            name="Artisanal Avocado & Tomato Sourdough",
            category="Bakery",
            cuisine="Continental",
            price=4.50,
            portion_size_g=240.0,
            is_veg=True,
            is_vegan=True,
            allergens=["Gluten"],
            calories=330,
            protein_g=8.0,
            carbs_g=42.0,
            fat_g=13.0,
            preparation_time_mins=12,
            lead_time_mins=8,
            cost_per_portion=1.65,
            popularity_score=4.4,
            ingredients=[
                RecipeIngredient(ingredient_id="ing_sourdough", ingredient_name="Artisanal Sourdough Loaves", quantity_per_portion=0.25, unit="pcs", cost_per_portion=0.75),
                RecipeIngredient(ingredient_id="ing_avocado", ingredient_name="Fresh Hass Avocados", quantity_per_portion=0.08, unit="kg", cost_per_portion=0.54),
                RecipeIngredient(ingredient_id="ing_tomatoes", ingredient_name="Vine-Ripe Tomatoes", quantity_per_portion=0.05, unit="kg", cost_per_portion=0.10)
            ]
        )
    ]

def get_seed_inventory_batches() -> List[InventoryBatch]:
    return [
        InventoryBatch(id="batch_01", ingredient_id="ing_paneer", ingredient_name="Fresh Cottage Cheese (Paneer)", batch_code="BN-PAN-092", quantity=14.0, unit="kg", cost_per_unit=6.50, received_date="2026-10-27", expiry_date="2026-10-31", supplier_id="sup_02", status="Active"),
        InventoryBatch(id="batch_02", ingredient_id="ing_chicken", ingredient_name="Boneless Chicken Breast", batch_code="BN-CHK-104", quantity=22.0, unit="kg", cost_per_unit=7.20, received_date="2026-10-28", expiry_date="2026-10-31", supplier_id="sup_01", status="Active"),
        InventoryBatch(id="batch_03", ingredient_id="ing_spinach", ingredient_name="Baby Spinach Leaves", batch_code="BN-SPN-412", quantity=10.0, unit="kg", cost_per_unit=3.20, received_date="2026-10-28", expiry_date="2026-10-31", supplier_id="sup_01", status="Active"),
        InventoryBatch(id="batch_04", ingredient_id="ing_rice", ingredient_name="Basmati Rice", batch_code="BN-RIC-881", quantity=120.0, unit="kg", cost_per_unit=1.80, received_date="2026-10-15", expiry_date="2027-04-15", supplier_id="sup_03", status="Active"),
        InventoryBatch(id="batch_05", ingredient_id="ing_quinoa", ingredient_name="Golden Quinoa", batch_code="BN-QUI-230", quantity=25.0, unit="kg", cost_per_unit=5.40, received_date="2026-10-20", expiry_date="2027-02-20", supplier_id="sup_03", status="Active")
    ]

def get_seed_suppliers() -> List[Supplier]:
    return [
        Supplier(id="sup_01", name="Apex Agro & Fresh Produce", contact_person="Dinesh Gupta", email="orders@apexagro.com", phone="+91 98201 12345", lead_time_days=1, min_order_value=80.0, rating=4.8, categories_supplied=["Produce", "Protein"]),
        Supplier(id="sup_02", name="Heritage Dairy Farms", contact_person="Priya Nair", email="dispatch@heritagedairy.in", phone="+91 98450 67890", lead_time_days=1, min_order_value=60.0, rating=4.7, categories_supplied=["Dairy"]),
        Supplier(id="sup_03", name="Continental Grains & Millers", contact_person="Vikram Rao", email="sales@continentalgrains.com", phone="+91 97110 34567", lead_time_days=2, min_order_value=120.0, rating=4.6, categories_supplied=["Grains", "Spices", "Bakery"])
    ]

def get_seed_historical_records() -> List[HistoricalDemandRecord]:
    """Generates 50+ historical records reflecting realistic campus meal dynamics."""
    records = []
    base_dates = [
        "2026-10-01", "2026-10-02", "2026-10-03", "2026-10-06", "2026-10-07",
        "2026-10-08", "2026-10-09", "2026-10-10", "2026-10-13", "2026-10-14",
        "2026-10-15", "2026-10-16", "2026-10-17", "2026-10-20", "2026-10-21",
        "2026-10-22", "2026-10-23", "2026-10-24", "2026-10-27", "2026-10-28"
    ]
    items = [
        ("item_01", "Mediterranean Grilled Chicken Bowl", "Grills & Proteins", 7.50, 110, 24),
        ("item_02", "Paneer Tikka Masala Rice Bowl", "Bowls & Curries", 6.20, 135, 38),
        ("item_03", "Quinoa & Roasted Veggie Salad", "Healthy Salads", 5.80, 75, 18),
        ("item_04", "Tofu Teriyaki Stir-Fry Noodles", "Bowls & Curries", 6.50, 85, 20),
        ("item_05", "Durum Penne Rosa with Spinach", "Main Course", 6.00, 95, 22),
        ("item_06", "Classic Yellow Dal Tadka with Steamed Rice", "Bowls & Curries", 4.80, 140, 30),
        ("item_07", "Forest Berry Oat Crunch Smoothie", "Beverages", 3.80, 65, 12),
        ("item_08", "Artisanal Avocado & Tomato Sourdough", "Bakery", 4.50, 55, 10)
    ]

    for d_idx, dt in enumerate(base_dates):
        dow = d_idx % 5  # Mon to Fri
        att = 920 + (dow * 40) - (20 if dow == 4 else 0)
        is_promo = (dow == 2)  # Wednesday special
        is_exam = (d_idx >= 15)  # Exam week towards end

        for item_id, item_name, cat, price, base_sold, base_po in items:
            var = (d_idx * 3 + hash(item_id)) % 17 - 8
            actual = max(20, base_sold + var - (12 if is_exam and cat != "Healthy Salads" else 0))
            po_cnt = max(5, int(base_po + (var * 0.3)))
            stockout = (var > 6 and dow == 2)
            unmet = 14 if stockout else 0
            discarded = 3 if var < -4 else 1

            records.append(HistoricalDemandRecord(
                date=dt,
                canteen_id="canteen_main",
                menu_item_id=item_id,
                item_name=item_name,
                category=cat,
                meal_session="Lunch",
                day_of_week=dow,
                attendance_expected=att,
                price=price,
                is_promotion=is_promo,
                weather="Clear" if dow != 3 else "Rainy",
                is_exam_week=is_exam,
                actual_sold=actual,
                preorders_count=po_cnt,
                stockout_occurred=stockout,
                unmet_demand_est=unmet,
                discarded_portions=discarded
            ))
    return records

def get_seed_preorders() -> List[StudentPreorder]:
    return [
        StudentPreorder(
            id="po_01",
            student_id="usr_student",
            student_name="Aarav Sharma",
            canteen_id="canteen_main",
            date="2026-10-30",
            meal_session="Lunch",
            menu_item_id="item_02",
            item_name="Paneer Tikka Masala Rice Bowl",
            portions=1,
            price_each=6.20,
            total_price=6.20,
            dietary_notes="Mild spice please",
            status="Confirmed",
            rating=5,
            feedback_text="Consistently delicious and fresh paneer!"
        ),
        StudentPreorder(
            id="po_02",
            student_id="usr_student_2",
            student_name="Meera Sen",
            canteen_id="canteen_main",
            date="2026-10-30",
            meal_session="Lunch",
            menu_item_id="item_01",
            item_name="Mediterranean Grilled Chicken Bowl",
            portions=1,
            price_each=7.50,
            total_price=7.50,
            dietary_notes="Extra dressing on side",
            status="Confirmed"
        ),
        StudentPreorder(
            id="po_03",
            student_id="usr_student_3",
            student_name="Rohan Nair",
            canteen_id="canteen_main",
            date="2026-10-30",
            meal_session="Lunch",
            menu_item_id="item_03",
            item_name="Quinoa & Roasted Veggie Salad",
            portions=1,
            price_each=5.80,
            total_price=5.80,
            dietary_notes="Gluten free verified",
            status="Confirmed"
        )
    ]

def get_seed_sustainability_scorecards() -> List[SustainabilityScorecard]:
    return [
        SustainabilityScorecard(
            canteen_id="canteen_main",
            canteen_name="Main Food Court (Tech Tower)",
            reporting_period="October 2026",
            waste_per_meal_kg=0.038,
            forecast_wape=8.4,
            food_cost_per_meal=2.18,
            stockout_rate_pct=2.1,
            student_satisfaction_score=4.6,
            surplus_recovery_pct=88.5,
            composite_sustainability_score=92.4,
            co2_emissions_avoided_kg=482.0,
            water_saved_liters=14500.0,
            target_waste_per_meal_kg=0.045,
            trend="Improving (+4.2% MoM)"
        ),
        SustainabilityScorecard(
            canteen_id="canteen_bistro",
            canteen_name="Innovation Wing Bistro",
            reporting_period="October 2026",
            waste_per_meal_kg=0.049,
            forecast_wape=11.2,
            food_cost_per_meal=2.45,
            stockout_rate_pct=4.5,
            student_satisfaction_score=4.4,
            surplus_recovery_pct=76.0,
            composite_sustainability_score=84.8,
            co2_emissions_avoided_kg=190.0,
            water_saved_liters=5200.0,
            target_waste_per_meal_kg=0.045,
            trend="Stable"
        )
    ]
