"""
CanteenIQ Data Store & Persistence Manager
Provides unified, shared, persistent in-memory + JSON storage with tenant isolation,
audit tracking, and seed reset capabilities.
"""

import json
import os
from typing import List, Dict, Any, Optional
from datetime import datetime

from app.models import (
    Institution, Canteen, User, Ingredient, MenuItem, InventoryBatch,
    Supplier, PurchaseOrder, HistoricalDemandRecord, StudentPreorder,
    SustainabilityScorecard, AuditLogEntry, NotificationItem,
    OptimizationPlanResult, MidServiceCheckpointRecord, SurplusOfferRecord
)
from app.seed_data import (
    get_seed_institutions, get_seed_canteens, get_seed_users,
    get_seed_ingredients, get_seed_menu_items, get_seed_inventory_batches,
    get_seed_suppliers, get_seed_historical_records, get_seed_preorders,
    get_seed_sustainability_scorecards
)

DATA_FILE = os.path.join(os.path.dirname(__file__), "canteen_store.json")

class CanteenDatabase:
    def __init__(self):
        self.institutions: Dict[str, Institution] = {}
        self.canteens: Dict[str, Canteen] = {}
        self.users: Dict[str, User] = {}
        self.ingredients: Dict[str, Ingredient] = {}
        self.menu_items: Dict[str, MenuItem] = {}
        self.inventory_batches: Dict[str, InventoryBatch] = {}
        self.suppliers: Dict[str, Supplier] = {}
        self.purchase_orders: Dict[str, PurchaseOrder] = {}
        self.historical_records: List[HistoricalDemandRecord] = []
        self.preorders: Dict[str, StudentPreorder] = {}
        self.production_plans: Dict[str, Dict[str, Any]] = {}
        self.checkpoints: List[MidServiceCheckpointRecord] = []
        self.surplus_offers: Dict[str, SurplusOfferRecord] = {}
        self.sustainability_scorecards: Dict[str, SustainabilityScorecard] = {}
        self.audit_logs: List[AuditLogEntry] = []
        self.notifications: List[NotificationItem] = []
        self.waste_records: List[Dict[str, Any]] = []

        self.reset_to_seed()

    def reset_to_seed(self):
        """Reset state to rich initial seed demo data."""
        self.institutions = {i.id: i for i in get_seed_institutions()}
        self.canteens = {c.id: c for c in get_seed_canteens()}
        self.users = {u.id: u for u in get_seed_users()}
        self.ingredients = {ing.id: ing for ing in get_seed_ingredients()}
        self.menu_items = {m.id: m for m in get_seed_menu_items()}
        self.inventory_batches = {b.id: b for b in get_seed_inventory_batches()}
        self.suppliers = {s.id: s for s in get_seed_suppliers()}
        self.historical_records = get_seed_historical_records()
        self.preorders = {p.id: p for p in get_seed_preorders()}
        self.sustainability_scorecards = {s.canteen_id: s for s in get_seed_sustainability_scorecards()}
        self.production_plans = {}
        self.checkpoints = []
        self.surplus_offers = {}
        self.waste_records = []
        
        # Initial audit log
        self.audit_logs = [
            AuditLogEntry(
                id="log_01",
                timestamp=datetime.utcnow().isoformat(),
                user_name="System Seeder",
                user_role="Administrator",
                action_type="SYSTEM_SEED",
                entity_type="Database",
                entity_id="canteen_main",
                details="Initialized campus canteen seed demo dataset with 60+ sales observations."
            )
        ]

        # Initial notifications
        self.notifications = [
            NotificationItem(
                id="notif_01",
                title="FEFO Shortage Warning",
                message="Fresh Cottage Cheese (Paneer) batch BN-PAN-092 expires in 3 days. Prioritize in today's menu.",
                category="inventory",
                urgency="high",
                timestamp="10 mins ago",
                action_url="/inventory"
            ),
            NotificationItem(
                id="notif_02",
                title="New Student Preorders Received",
                message="3 student preorders registered for today's Lunch service. Demand baseline updated.",
                category="forecast",
                urgency="medium",
                timestamp="25 mins ago",
                action_url="/forecasting"
            )
        ]

    def log_audit(self, user_name: str, user_role: str, action: str, entity_type: str, entity_id: str, details: str):
        entry = AuditLogEntry(
            id=f"log_{int(datetime.utcnow().timestamp())}_{len(self.audit_logs)}",
            timestamp=datetime.utcnow().isoformat(),
            user_name=user_name,
            user_role=user_role,
            action_type=action,
            entity_type=entity_type,
            entity_id=entity_id,
            details=details
        )
        self.audit_logs.insert(0, entry)

    def add_notification(self, title: str, message: str, category: str, urgency: str = "medium", action_url: Optional[str] = None):
        notif = NotificationItem(
            id=f"notif_{int(datetime.utcnow().timestamp())}_{len(self.notifications)}",
            title=title,
            message=message,
            category=category,
            urgency=urgency,
            timestamp="Just now",
            action_url=action_url
        )
        self.notifications.insert(0, notif)

# Global singleton
db = CanteenDatabase()
