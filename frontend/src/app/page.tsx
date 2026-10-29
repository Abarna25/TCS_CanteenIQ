"use client";

import React, { useState, useEffect } from "react";
import {
  UserRole,
  User,
  Canteen,
  MenuItem,
  Ingredient,
  InventoryBatch,
  Supplier,
  StudentPreorder,
  SurplusOfferRecord,
  SustainabilityScorecard,
  AuditLogEntry,
  NotificationItem
} from "@/types";

import {
  initialUsers,
  initialCanteens,
  initialIngredients,
  initialBatches,
  initialMenuItems,
  initialPreorders,
  initialSuppliers,
  initialSurplusOffers,
  initialScorecards,
  initialNotifications,
  initialAuditLogs
} from "@/lib/mockData";

import { api } from "@/lib/api";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

// Screen Views
import { LandingView } from "@/components/views/LandingView";
import { DashboardView } from "@/components/views/DashboardView";
import { CommandCenterView } from "@/components/views/CommandCenterView";
import { SmartMenuStudioView } from "@/components/views/SmartMenuStudioView";
import { ForecastingView } from "@/components/views/ForecastingView";
import { KitchenBoardView } from "@/components/views/KitchenBoardView";
import { InventoryView } from "@/components/views/InventoryView";
import { RecipesView } from "@/components/views/RecipesView";
import { ProcurementView } from "@/components/views/ProcurementView";
import { PosSalesView } from "@/components/views/PosSalesView";
import { WasteAnalyticsView } from "@/components/views/WasteAnalyticsView";
import { StudentPortalView } from "@/components/views/StudentPortalView";
import { StudentPreordersView } from "@/components/views/StudentPreordersView";
import { WhatIfSimulatorView } from "@/components/views/WhatIfSimulatorView";
import { SustainabilityScorecardView } from "@/components/views/SustainabilityScorecardView";
import { MultiCanteenView } from "@/components/views/MultiCanteenView";
import { DataImportView } from "@/components/views/DataImportView";
import { ReportsView } from "@/components/views/ReportsView";
import { AdminSettingsView } from "@/components/views/AdminSettingsView";
import { AuditNotificationsView } from "@/components/views/AuditNotificationsView";
import { VisionWasteView } from "@/components/views/VisionWasteView";

export default function Home() {
  // Session & Navigation State
  const [currentRole, setCurrentRole] = useState<UserRole>("Canteen Manager");
  const [currentScreen, setCurrentScreen] = useState<string>("command-center");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  // Operational Context
  const [selectedCanteenId, setSelectedCanteenId] = useState<string>("canteen_main");
  const [selectedSession, setSelectedSession] = useState<string>("Lunch");
  const [targetDate] = useState<string>("2026-10-30");

  // Application Domain State
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [canteens, setCanteens] = useState<Canteen[]>(initialCanteens);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [ingredients, setIngredients] = useState<Ingredient[]>(initialIngredients);
  const [batches, setBatches] = useState<InventoryBatch[]>(initialBatches);
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [preorders, setPreorders] = useState<StudentPreorder[]>(initialPreorders);
  const [surplusOffers, setSurplusOffers] = useState<SurplusOfferRecord[]>(initialSurplusOffers);
  const [scorecards, setScorecards] = useState<Record<string, SustainabilityScorecard>>(initialScorecards);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(initialAuditLogs);

  // Workflow Approvals
  const [isPlanApproved, setIsPlanApproved] = useState<boolean>(false);

  // Attempt backend initial sync if available
  useEffect(() => {
    async function loadBackendData() {
      try {
        const remoteCanteens = await api.getCanteens();
        if (remoteCanteens && remoteCanteens.length > 0) setCanteens(remoteCanteens);
        const remoteItems = await api.getMenuItems();
        if (remoteItems && remoteItems.length > 0) setMenuItems(remoteItems);
        const remotePreorders = await api.getPreorders();
        if (remotePreorders && remotePreorders.length > 0) setPreorders(remotePreorders);
        const remoteOffers = await api.getSurplusOffers();
        if (remoteOffers && remoteOffers.length > 0) setSurplusOffers(remoteOffers);
      } catch (err) {
        // Safe fallback already active
      }
    }
    loadBackendData();
  }, []);

  // Handler: Role Login from Landing
  const handleLoginRole = (role: UserRole) => {
    setCurrentRole(role);
    setIsLoggedIn(true);
    if (role === "Student") {
      setCurrentScreen("student-portal");
    } else if (role === "Kitchen Staff") {
      setCurrentScreen("kitchen-board");
    } else if (role === "Procurement Staff") {
      setCurrentScreen("procurement");
    } else if (role === "Administrator") {
      setCurrentScreen("dashboard");
    } else {
      setCurrentScreen("command-center");
    }

    logAuditAction(
      role,
      "USER_LOGIN",
      "UserSession",
      "session_01",
      `Switched active role to ${role}`
    );
  };

  // Handler: Audit Logging
  const logAuditAction = (
    actorRole: string,
    action: string,
    entityType: string,
    entityId: string,
    details: string
  ) => {
    const newEntry: AuditLogEntry = {
      id: `log_${Date.now()}`,
      timestamp: new Date().toISOString(),
      user_name: actorRole,
      user_role: actorRole,
      action_type: action,
      entity_type: entityType,
      entity_id: entityId,
      details,
      ip_address: "127.0.0.1"
    };
    setAuditLogs(prev => [newEntry, ...prev]);
  };

  // Handler: Production Plan Approval
  const handleApprovePlan = (planId: string = "plan_2026-10-30_lunch") => {
    setIsPlanApproved(true);
    logAuditAction(
      currentRole,
      "APPROVE_PRODUCTION_PLAN",
      "ProductionPlan",
      planId,
      `Approved production plan ${planId} (Version 1 locked). Released to kitchen.`
    );
    // Add high-priority notification
    const notif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: "Plan Approved & Released",
      message: "Version 1 of Lunch Production Plan is now live on Kitchen Production Board.",
      category: "approval",
      urgency: "high",
      timestamp: "Just now",
      is_read: false
    };
    setNotifications(prev => [notif, ...prev]);
  };

  // Handler: Stock Adjustment
  const handleAdjustStock = (ingredientId: string, delta: number, reason: string) => {
    setIngredients(prev =>
      prev.map(ing => {
        if (ing.id === ingredientId) {
          return { ...ing, current_stock: Math.max(0, ing.current_stock + delta) };
        }
        return ing;
      })
    );
    logAuditAction(
      currentRole,
      "ADJUST_STOCK",
      "Ingredient",
      ingredientId,
      `Adjusted stock by ${delta > 0 ? "+" : ""}${delta}. Reason: ${reason}`
    );
  };

  // Handler: Preorder Placement
  const handlePlacePreorder = (item: MenuItem, portions: number, notes: string) => {
    const newPO: StudentPreorder = {
      id: `po_${Date.now()}`,
      student_id: "usr_student",
      student_name: "Aarav Sharma",
      canteen_id: selectedCanteenId,
      date: targetDate,
      meal_session: selectedSession,
      menu_item_id: item.id,
      item_name: item.name,
      portions,
      price_each: item.price,
      total_price: item.price * portions,
      dietary_notes: notes || undefined,
      status: "Confirmed",
      created_at: new Date().toISOString()
    };
    setPreorders(prev => [newPO, ...prev]);
    logAuditAction(
      "Student",
      "PLACE_PREORDER",
      "StudentPreorder",
      newPO.id,
      `Preordered ${portions}x ${item.name} for ${selectedSession}`
    );

    // Notify Manager
    const notif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: "New Student Preorder",
      message: `${portions}x ${item.name} registered. Demand floor automatically elevated.`,
      category: "forecast",
      urgency: "low",
      timestamp: "Just now",
      is_read: false
    };
    setNotifications(prev => [notif, ...prev]);
  };

  // Handler: Preorder Feedback
  const handleSubmitFeedback = (preorderId: string, rating: number, feedback: string) => {
    setPreorders(prev =>
      prev.map(p => {
        if (p.id === preorderId) {
          return { ...p, rating, feedback_text: feedback };
        }
        return p;
      })
    );
    logAuditAction(
      "Student",
      "SUBMIT_FEEDBACK",
      "StudentPreorder",
      preorderId,
      `Submitted ${rating}-star feedback`
    );
  };

  // Handler: Safe Surplus Reservation
  const handleReserveSurplus = (offerId: string) => {
    setSurplusOffers(prev =>
      prev.map(off => {
        if (off.id === offerId && off.portions_available > off.portions_reserved) {
          return {
            ...off,
            portions_reserved: off.portions_reserved + 1,
            status: off.portions_reserved + 1 >= off.portions_available ? "Sold Out" : "Active"
          };
        }
        return off;
      })
    );
    logAuditAction(
      "Student",
      "CLAIM_SURPLUS",
      "SurplusOffer",
      offerId,
      "Claimed 1 portion at 50% discount flash offer"
    );
  };

  // Handler: Apply What-If Scenario to Plan
  const handleApplyScenarioToPlan = (title: string) => {
    setIsPlanApproved(true);
    logAuditAction(
      currentRole,
      "APPLY_SCENARIO_VERSION",
      "ProductionPlan",
      "plan_v2",
      `Applied what-if scenario '${title}' as Version 2 of today's Production Plan.`
    );
    const notif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: "Plan Version 2 Deployed",
      message: `Scenario '${title}' updated live batch requirements.`,
      category: "approval",
      urgency: "high",
      timestamp: "Just now",
      is_read: false
    };
    setNotifications(prev => [notif, ...prev]);
  };

  // Handler: Demo State Reset
  const handleResetDemo = () => {
    setIngredients(initialIngredients);
    setPreorders(initialPreorders);
    setSurplusOffers(initialSurplusOffers);
    setIsPlanApproved(false);
    setNotifications(initialNotifications);
    setAuditLogs([
      {
        id: `log_${Date.now()}`,
        timestamp: new Date().toISOString(),
        user_name: "Demo Admin",
        user_role: "Administrator",
        action_type: "RESET_DEMO_STATE",
        entity_type: "Database",
        entity_id: "inst_tcs_01",
        details: "Reset application state back to clean baseline demo dataset.",
        ip_address: "127.0.0.1"
      }
    ]);
  };

  // If user clicks logout or initial landing
  if (!isLoggedIn) {
    return <LandingView onLoginRole={handleLoginRole} />;
  }

  const activeScorecard = scorecards[selectedCanteenId] || initialScorecards["canteen_main"];
  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div className="flex h-screen bg-[#f8faf8] overflow-hidden text-slate-800">
      {/* Role-Aware Left Sidebar */}
      <Sidebar
        currentRole={currentRole}
        currentScreen={currentScreen}
        onSelectScreen={setCurrentScreen}
        notificationsCount={unreadCount}
        onLogout={() => setIsLoggedIn(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <Header
          currentRole={currentRole}
          onChangeRole={handleLoginRole}
          canteens={canteens}
          selectedCanteenId={selectedCanteenId}
          onSelectCanteen={setSelectedCanteenId}
          selectedSession={selectedSession}
          onSelectSession={setSelectedSession}
          targetDate={targetDate}
          notificationsCount={unreadCount}
          onOpenNotifications={() => setCurrentScreen("audit-notifications")}
          onResetDemo={handleResetDemo}
        />

        {/* Scrollable View Container */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {currentScreen === "dashboard" && (
            <DashboardView
              currentRole={currentRole}
              onNavigate={setCurrentScreen}
              menuItems={menuItems}
              preorders={preorders}
              surplusOffers={surplusOffers}
            />
          )}

          {currentScreen === "command-center" && (
            <CommandCenterView
              onNavigate={setCurrentScreen}
              activePlanApproved={isPlanApproved}
              onApprovePlan={handleApprovePlan}
            />
          )}

          {currentScreen === "smart-menu" && (
            <SmartMenuStudioView
              menuItems={menuItems}
              onApprovePlan={handleApprovePlan}
              isPlanApproved={isPlanApproved}
            />
          )}

          {currentScreen === "forecasting" && (
            <ForecastingView menuItems={menuItems} />
          )}

          {currentScreen === "kitchen-board" && (
            <KitchenBoardView menuItems={menuItems} />
          )}

          {currentScreen === "inventory" && (
            <InventoryView
              ingredients={ingredients}
              batches={batches}
              onAdjustStock={handleAdjustStock}
            />
          )}

          {currentScreen === "recipes" && (
            <RecipesView menuItems={menuItems} />
          )}

          {currentScreen === "procurement" && (
            <ProcurementView
              suppliers={suppliers}
              ingredients={ingredients}
            />
          )}

          {currentScreen === "pos-sales" && (
            <PosSalesView
              menuItems={menuItems}
              onRecordOutcome={() => {}}
            />
          )}

          {currentScreen === "waste-analytics" && (
            <WasteAnalyticsView menuItems={menuItems} />
          )}

          {currentScreen === "student-portal" && (
            <StudentPortalView
              menuItems={menuItems}
              surplusOffers={surplusOffers}
              onPlacePreorder={handlePlacePreorder}
              onReserveSurplus={handleReserveSurplus}
            />
          )}

          {currentScreen === "student-preorders" && (
            <StudentPreordersView
              preorders={preorders}
              onSubmitFeedback={handleSubmitFeedback}
            />
          )}

          {currentScreen === "what-if" && (
            <WhatIfSimulatorView
              menuItems={menuItems}
              onApplyScenarioToLivePlan={handleApplyScenarioToPlan}
            />
          )}

          {currentScreen === "sustainability" && (
            <SustainabilityScorecardView scorecard={activeScorecard} />
          )}

          {currentScreen === "multi-canteen" && (
            <MultiCanteenView scorecards={scorecards} />
          )}

          {currentScreen === "data-import" && (
            <DataImportView />
          )}

          {currentScreen === "reports" && (
            <ReportsView />
          )}

          {currentScreen === "admin-settings" && (
            <AdminSettingsView
              users={users}
              canteens={canteens}
            />
          )}

          {currentScreen === "audit-notifications" && (
            <AuditNotificationsView
              auditLogs={auditLogs}
              notifications={notifications}
            />
          )}

          {currentScreen === "vision-waste" && (
            <VisionWasteView />
          )}
        </main>
      </div>
    </div>
  );
}
