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
import { TagInputModule } from "ngx-chips";

import { RouterModule } from "@angular/router";
import { UserRoutes } from "./user.routing";
import { DashboardComponent } from "./dashboard/dashboard.component";

import { QuillModule } from "ngx-quill";
import { NgxDropzoneModule } from "ngx-dropzone";
import { OrgChartModule } from "angular-org-chart";

import { ManagementAuditComponent } from "./management-audit/management-audit.component";
import { ManagementUserComponent } from "./management-user/management-user.component";
import { ReportComponent } from "./report/report.component";
import { ManagementRolesComponent } from "./management-roles/management-roles.component";
import { ProfileComponent } from "./profile/profile.component";
import { ReceiptManagementComponent } from "./receipt-management/receipt-management.component";
import { MaklumatPemohonComponent } from "./maklumat-pemohon/maklumat-pemohon.component";
import { MaklumatKeluargaComponent } from "./maklumat-keluarga/maklumat-keluarga.component";
import { MaklumatAkademikComponent } from "./maklumat-akademik/maklumat-akademik.component";
import { SenaraiPemohonComponent } from "./senarai-pemohon/senarai-pemohon.component";
import { TawaranPenyataBakiComponent } from "./tawaran-penyata-baki/tawaran-penyata-baki.component";
import { TawaranUrusanBakiComponent } from "./tawaran-urusan-baki/tawaran-urusan-baki.component";
import { TawaranPembayaranComponent } from "./tawaran-pembayaran/tawaran-pembayaran.component";
import { PrmohonanBaruComponent } from "./prmohonan-baru/prmohonan-baru.component";
import { MatStepperModule } from "@angular/material/stepper";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [
    DashboardComponent,
    ManagementAuditComponent,
    ManagementUserComponent,
    ReportComponent,
    ManagementRolesComponent,
    ProfileComponent,
    ReceiptManagementComponent,
    MaklumatPemohonComponent,
    MaklumatKeluargaComponent,
    MaklumatAkademikComponent,
    SenaraiPemohonComponent,
    TawaranPenyataBakiComponent,
    TawaranUrusanBakiComponent,
    TawaranPembayaranComponent,
    PrmohonanBaruComponent,
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
    RouterModule.forChild(UserRoutes),
    QuillModule.forRoot(),
    NgxDropzoneModule,
    TagInputModule,
    OrgChartModule,
    MatStepperModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
})
export class UserModule {}
