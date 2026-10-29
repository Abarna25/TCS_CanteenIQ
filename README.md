# CanteenIQ — Campus Canteen Intelligence & Food-Waste Prevention

> **Tagline:** Prepare Smarter. Waste Less. Serve Better.  
> **Target Audience:** Campus Canteen Operations, University Administration, Kitchen Teams, Procurement Staff & Students.

---

## 1. Executive Summary & Product Vision

**CanteenIQ** is an AI-powered campus canteen intelligence, menu optimization, and food-waste prevention platform. It answers the five core operational questions facing campus food services:

1. **What will students want to eat?** — Chronologically validated ML Demand Forecasting (GBDT) + verified Student Preorder demand floor.
2. **How much should the kitchen prepare, and when?** — Adaptive Demand-to-Production Intelligence breaking preparation into responsive initial batches (65%) and mid-service velocity checkpoints.
3. **Which menu combination best balances demand, affordability, cost, nutrition, and variety?** — Constraint-Aware Smart Menu Studio solving for Budget-focused, Profit-focused, or Waste-minimizing objectives.
4. **Which ingredients should the canteen purchase?** — Recipe-driven Procurement Engine converting approved meal plans into supplier pack sizes, accounting for First-Expiring-First-Out (FEFO) stock.
5. **Did the recommendation improve actual operational outcomes?** — Backward Ingredient-Level Waste Propagation, Safe Surplus Recovery (50% student flash offers), and an ESG Sustainability Scorecard.

---

## 2. Technology Stack & System Architecture

```
CanteenIQ Platform Architecture
┌────────────────────────────────────────────────────────────────────────┐
│                          Next.js Frontend                              │
│       (App Router, TypeScript Strict, Tailwind CSS, Lucide Icons)      │
│      21 Interactive Screens • 5 Role Views • Live State Propagation    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP / REST
┌───────────────────────────────────▼────────────────────────────────────┐
│                    FastAPI ML Intelligence Service                     │
│           (Python 3.12, scikit-learn, pandas, numpy, scipy)            │
│  - GBDT Demand Forecaster (Censored Adjustments & WAPE Evaluation)     │
│  - Cold-Start Dish Estimator (Zero-History Category/Elasticity Prior)  │
│  - Constraint-Aware Menu Mix Optimizer (Multi-Objective MILP)          │
│  - Adaptive Batching & Sales Velocity Checkpoints                      │
│  - Ingredient-Level Waste Propagation & Monetary Loss Decomposition    │
│  - What-If Counterfactual Scenario Simulator                           │
│  - Safe Surplus Food Safety Temperature Verification (≥ 60°C)          │
│  - Computer-Vision Plate Waste Segmentation Fallback (EfficientNet-B0) │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ SQL Migrations & RLS
┌───────────────────────────────────▼────────────────────────────────────┐
│               Unified Database Layer (Supabase / PostgreSQL)           │
│       Row-Level Security • Tenant Scoping • Immutable Audit Trail      │
└────────────────────────────────────────────────────────────────────────┘
```

- **Frontend:** Next.js (App Router), React 19, TypeScript in strict mode, Tailwind CSS v4, Lucide React icons.
- **Backend & ML Engine:** Python 3.12, FastAPI, Uvicorn, scikit-learn (`HistGradientBoostingRegressor`, `GradientBoostingRegressor`, `Ridge`), pandas, numpy, scipy.
- **Database & Security:** Supabase PostgreSQL with Row Level Security (RLS) policies and seed scripts.
- **Zero-Friction Fallback:** Built-in in-memory/JSON store with full CRUD capabilities, allowing complete standalone operation without paid external APIs.

---

## 3. Seed Accounts & User Roles

The application provides 5 pre-seeded role personas with dedicated workflows:

| Role | Name | Email | Purpose / Screens |
| :--- | :--- | :--- | :--- |
| **Canteen Manager** | Chef Marcus Sterling | `manager@canteeniq.io` | Command Center, Smart Menu Studio, Forecasting, What-If Simulator, Plan Approval |
| **Kitchen Staff** | Kiran Patel | `kitchen@canteeniq.io` | Kitchen Production Board, Live Batches, Checkpoints, POS Sales & Waste Logging |
| **Student** | Aarav Sharma | `student@canteeniq.io` | Food Portal, Preorders, Dietary/Allergen Filters, 50% Safe Surplus Flash Deals, Star Reviews |
| **Procurement Staff** | Sarah Jenkins | `procurement@canteeniq.io` | Ingredient Requirements, Supplier Management, Pack Size Optimization, Purchase Orders |
| **Administrator** | Dr. Eleanor Vance | `admin@canteeniq.io` | Multi-Canteen Benchmarking, Institutional Budgets, System Settings, Audit Trail |

> **Evaluation Shortcut:** In the top header bar, click any of the **Role Switcher Pills** to instantly switch personas without re-authenticating.

---

## 4. Key Novelty Features

### Novelty 1: Adaptive Demand-to-Production Intelligence
Moves away from static all-at-once morning cooking. It splits daily planned portions into:
- **Initial Batch (60–70%):** Prepared on hot line before service starts.
- **Reserve Capacity (30–40%):** Kept as raw prepped ingredients.
- **Mid-Service Checkpoint:** Automatically computes sales velocity (portions sold per 10 minutes) against remaining service time to recommend firing Batch 2, holding reserve, or ceasing production.

### Novelty 2: Preference-Aware Menu Mix Optimization
Smart Menu Studio balances operational constraints with aggregated student signals:
- Select between **Budget-focused**, **Profit-focused**, or **Waste-minimizing** objectives.
- Enforces strict minimum vegetarian variety and dietary requirements.
- Uses FEFO inventory signals to prioritize dishes consuming ingredients nearing expiration.
- Detects infeasible constraints and provides human-readable relaxation advice.

### Novelty 3: Ingredient-Level Waste Propagation
When leftover food is logged at the end of service, the engine:
- Traces unsold portions backward through standardized recipes to constituent raw ingredients.
- Calculates exact monetary loss and tags perishable risk.
- Identifies root causes (e.g., over-prep vs holding timer lapse) and prescribes concrete remedies.

### Novelty 4: Cold-Start Intelligence for New Dishes
Allows managers to launch new items with zero sales history. It computes an initial demand range and confidence interval using peer category medians, price elasticity, and registered student preorders, transparently flagging it as high uncertainty.

### Novelty 5: Explainable What-If Scenario Simulator
Interactive stress-testing sandbox that evaluates counterfactual shocks:
- Attendance variance (+/- 10%, +/- 30%)
- Ingredient price inflation (+15%)
- Supply chain shortages (ingredient unavailable)
- Displays side-by-side delta tables and allows applying the approved scenario to a new version of the production plan.

### Novelty 6: Safe Surplus Recovery & Redistribution
Operational food safety gate:
- Validates holding temperature (must be $\ge 60^\circ\text{C}$) and safe elapsed time ($\le 3.5\text{ hours}$).
- Publishes manager-approved 50% discount flash offers to eligible students in the final 45 minutes of service.
- Tracks avoided waste in kilograms and recovered revenue.

### Novelty 7: Computer-Vision Plate Waste Estimation
Lightweight image analysis module simulating plate segmentation:
- Analyzes dining tray photos and estimates leftover area percentage.
- Deconstructs residues by component (rice, curry, greens) with confidence scores.
- Implements mandatory **human-in-the-loop confirmation** before saving to the official waste audit log.

---

## 5. Verification & Test Suite

The intelligence engine and core business logic have been tested with pytest:

```bash
python -m pytest backend/tests
```

**Results:**
- `test_wape_calculation`: Passed
- `test_wape_zero_actuals`: Passed
- `test_forecast_training_and_evaluation`: Passed
- `test_forecast_item_with_preorders`: Passed
- `test_cold_start_new_dish`: Passed
- `test_menu_optimization_budget_and_veg_constraints`: Passed
- `test_menu_optimization_infeasible_handling`: Passed
- `test_adaptive_batch_manager`: Passed
- `test_waste_propagation_engine`: Passed
- `test_what_if_simulator`: Passed
- `test_safe_surplus_recovery_temperature_check`: Passed

**Test Status:** 11 passed in 17.5s (100% pass rate).

---

## 6. Local Setup & Running Instructions

### Prerequisites
- Node.js v18+ (Node v24 tested)
- Python 3.10+ (Python 3.12 tested)

### 1. Launch FastAPI Intelligence Backend
```bash
cd backend
python run_server.py
```
- API server runs at: `http://127.0.0.1:8000`
- Interactive OpenAPI Docs: `http://127.0.0.1:8000/docs`

### 2. Launch Next.js Frontend
```bash
cd frontend
npm run dev
```
- Open `http://localhost:3000` in your browser.

> Note: The frontend is fully functional in both standalone mode and connected to FastAPI.

---

## 7. 15-Step End-to-End Evaluation Demonstration

Follow this step-by-step journey to experience the complete closed-loop workflow:

1. **Role Login:** Enter as **Canteen Manager** via the role card or header pill.
2. **Inspect Command Center:** Observe predicted demand (540 portions), budget limits, and FEFO expiry warnings.
3. **Open Smart Menu Studio:** Switch optimization objective to *Profit-focused*. Note the 6 recommended dishes, initial vs reserve batches, and FEFO priority for Paneer.
4. **Approve Production Plan:** Click *Approve & Release to Kitchen* to lock Version 1.
5. **Demand Forecasting:** Navigate to *Demand Forecasting* to inspect ML vs Baseline WAPE comparison (8.4% vs 12.8%).
6. **Cold-Start Dish:** Enter *Smoked Jackfruit BBQ Bowl* to view the cold-start launch recommendation.
7. **Procurement Review:** Switch role to **Procurement Staff**; view automated ingredient requirements and supplier pack sizes.
8. **Kitchen Production:** Switch role to **Kitchen Staff**; view the live *Production Board*. Click *Log +1 Sold* and *Eval Velocity* to trigger a mid-service checkpoint recommendation.
9. **Sales Reconciliation:** Open *POS & Sales Entry* to log actual sold and discarded portions.
10. **Waste Propagation:** Open *Waste Propagation* to inspect leftover chicken and rice decomposed into raw ingredient losses ($5.70).
11. **Student Preorder:** Switch role to **Student**; browse the menu and click *Preorder* on the *Paneer Tikka Masala Rice Bowl*.
12. **Surplus Flash Deal:** In the Student Portal, click *Claim Deal* on the verified 50% discount surplus offer.
13. **What-If Simulation:** Switch back to **Canteen Manager**; test a -10% attendance and +15% inflation shock in the *What-If Simulator*.
14. **Sustainability Scorecard:** View waste per meal (0.038 kg/meal), CO₂ avoided (482 kg), and water conserved.
15. **Multi-Canteen Benchmarking:** Compare the Main Food Court with the Innovation Wing Bistro.
