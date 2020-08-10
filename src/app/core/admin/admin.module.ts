import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  AccordionModule,
  BsDropdownModule,
  ModalModule,
  ProgressbarModule,
  TabsModule,
  TooltipModule,
} from "ngx-bootstrap";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { LoadingBarModule } from "@ngx-loading-bar/core";

import { RouterModule } from "@angular/router";
import { AdminRoutes } from "./admin.routing";
import { QuillModule } from "ngx-quill";
import { NgxDropzoneModule } from "ngx-dropzone";
import { OrgChartModule } from "angular-org-chart";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
// import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// import { HttpClient, HttpClientModule } from "@angular/common/http";
// import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
// import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ManagementAuditComponent } from "./management-audit/management-audit.component";
import { ManagementUserComponent } from "./management-user/management-user.component";
import { ReportComponent } from "./report/report.component";
import { ManagementRolesComponent } from "./management-roles/management-roles.component";
import { MatStepperModule } from "@angular/material/stepper";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { AnalyticsComponent } from "./analytics/analytics.component";
import { SocialMediaComponent } from "./social-media/social-media.component";
import { MediaMonitoringComponent } from "./media-monitoring/media-monitoring.component";
import { WorkEmergencyComponent } from "./work-emergency/work-emergency.component";
import { InvestorProfileComponent } from "./investor-profile/investor-profile.component";
import { HeavyMaintenanceComponent } from "./heavy-maintenance/heavy-maintenance.component";
import { SparePartManagementComponent } from "./spare-part-management/spare-part-management.component";
import { AssetInventoryComponent } from "./asset-inventory/asset-inventory.component";
import { RoutineMaintenanceComponent } from "./routine-maintenance/routine-maintenance.component";
import { MaintenanceBudgetAlocationComponent } from "./maintenance-budget-alocation/maintenance-budget-alocation.component";
import { KpiModuleComponent } from "./kpi-module/kpi-module.component";
import { PaymentComponent } from './payment/payment.component';
import { ForumComponent } from './forum/forum.component';
import { RoutineMaintenanceDetailsComponent } from './routine-maintenance-details/routine-maintenance-details.component';
import { AssetWarrantyComponent } from './asset-warranty/asset-warranty.component';
import { HmNotificationDefectComponent } from './hm-notification-defect/hm-notification-defect.component';
import { HmWorkOrderComponent } from './hm-work-order/hm-work-order.component';

@NgModule({
  declarations: [
    ManagementAuditComponent,
    ManagementUserComponent,
    ManagementRolesComponent,
    ReportComponent,
    DashboardComponent,
    AnalyticsComponent,
    AssetInventoryComponent,
    SocialMediaComponent,
    MediaMonitoringComponent,
    WorkEmergencyComponent,
    InvestorProfileComponent,
    RoutineMaintenanceComponent,
    KpiModuleComponent,
    MaintenanceBudgetAlocationComponent,
    HeavyMaintenanceComponent,
    SparePartManagementComponent,
    PaymentComponent,
    ForumComponent,
    RoutineMaintenanceDetailsComponent,
    AssetWarrantyComponent,
    HmNotificationDefectComponent,
    HmWorkOrderComponent,
  ],
  imports: [
    CommonModule,
    AccordionModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    LoadingBarModule,
    NgxDatatableModule,
    RouterModule.forChild(AdminRoutes),
    QuillModule.forRoot(),
    NgxDropzoneModule,
    OrgChartModule,
    MatStepperModule,
    MatFormFieldModule,
    MatButtonModule,
    LeafletModule,
    // HttpClientModule,
  ],
})
export class AdminModule {}
