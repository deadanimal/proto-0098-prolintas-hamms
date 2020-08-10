import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";

import { ManagementAuditComponent } from "./management-audit/management-audit.component";
import { ManagementUserComponent } from "./management-user/management-user.component";
import { ReportComponent } from "./report/report.component";
import { ManagementRolesComponent } from "./management-roles/management-roles.component";
import { AnalyticsComponent } from "./analytics/analytics.component";
import { InvestorProfileComponent } from "./investor-profile/investor-profile.component";
import { RoutineMaintenanceComponent } from "./routine-maintenance/routine-maintenance.component";
import { HeavyMaintenanceComponent } from "./heavy-maintenance/heavy-maintenance.component";
import { SparePartManagementComponent } from "./spare-part-management/spare-part-management.component";
import { AssetInventoryComponent } from "./asset-inventory/asset-inventory.component";
import { WorkEmergencyComponent } from "./work-emergency/work-emergency.component";
import { MaintenanceBudgetAlocationComponent } from "./maintenance-budget-alocation/maintenance-budget-alocation.component";
import { KpiModuleComponent } from "./kpi-module/kpi-module.component";
import { PaymentComponent } from "./payment/payment.component";
import { ForumComponent } from "./forum/forum.component";
import { RoutineMaintenanceDetailsComponent } from "./routine-maintenance-details/routine-maintenance-details.component";
import { AssetWarrantyComponent } from "./asset-warranty/asset-warranty.component";
import { HmNotificationDefectComponent } from "./hm-notification-defect/hm-notification-defect.component";
import { HmWorkOrderComponent } from "./hm-work-order/hm-work-order.component";

export const AdminRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
      },
      {
        path: "spare-part-management",
        component: SparePartManagementComponent,
      },
      {
        path: "payment",
        component: PaymentComponent,
      },
      {
        path: "forum",
        component: ForumComponent,
      },
      {
        path: "work-emergency",
        component: WorkEmergencyComponent,
      },
      {
        path: "heavy-maintenance",
        children: [
          { path: "dashboard", component: HeavyMaintenanceComponent },
          {
            path: "notification-defect",
            component: HmNotificationDefectComponent,
          },
          { path: "work-order", component: HmWorkOrderComponent },
        ],
      },
      {
        path: "maintenance-budget-alocation",
        component: MaintenanceBudgetAlocationComponent,
      },
      {
        path: "kpi-module",
        component: KpiModuleComponent,
      },
      {
        path: "routine-maintenance",
        children: [
          { path: "details", component: RoutineMaintenanceComponent },
          { path: "dashboard", component: RoutineMaintenanceDetailsComponent },
        ],
      },
      {
        path: "asset-inventory",
        children: [
          { path: "asset-inventory", component: AssetInventoryComponent },
          { path: "asset-warranty", component: AssetWarrantyComponent },
        ],
      },
      // {
      //   path: "investor-profile",
      //   component: InvestorProfileComponent,
      // },
      {
        path: "analytics",
        component: AnalyticsComponent,
      },
      {
        path: "report",
        component: ReportComponent,
      },
      {
        path: "management",
        children: [
          {
            path: "users",
            component: ManagementUserComponent,
          },
          {
            path: "roles",
            component: ManagementRolesComponent,
          },
          {
            path: "audit-trails",
            component: ManagementAuditComponent,
          },
        ],
      },
    ],
  },
];
