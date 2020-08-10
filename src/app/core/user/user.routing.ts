import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";

import { ManagementAuditComponent } from "./management-audit/management-audit.component";
import { ManagementUserComponent } from "./management-user/management-user.component";
import { ReportComponent } from "./report/report.component";
import { ManagementRolesComponent } from "./management-roles/management-roles.component";

import { ReceiptManagementComponent } from "./receipt-management/receipt-management.component";

import { MaklumatPemohonComponent } from "./maklumat-pemohon/maklumat-pemohon.component";
import { MaklumatKeluargaComponent } from "./maklumat-keluarga/maklumat-keluarga.component";
import { MaklumatAkademikComponent } from "./maklumat-akademik/maklumat-akademik.component";
import { SenaraiPemohonComponent } from "./senarai-pemohon/senarai-pemohon.component";
import { TawaranPenyataBakiComponent } from "./tawaran-penyata-baki/tawaran-penyata-baki.component";
import { TawaranUrusanBakiComponent } from "./tawaran-urusan-baki/tawaran-urusan-baki.component";
import { TawaranPembayaranComponent } from "./tawaran-pembayaran/tawaran-pembayaran.component";
import { PrmohonanBaruComponent } from "./prmohonan-baru/prmohonan-baru.component";

export const UserRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
      },
      {
        path: "pemohonan-baru",
        component: PrmohonanBaruComponent,
      },
      {
        path: "maklumat",
        children: [
          {
            path: "maklumat-pemohon",
            component: MaklumatPemohonComponent,
          },
          {
            path: "maklumat-keluarga",
            component: MaklumatKeluargaComponent,
          },
          {
            path: "maklumat-akademik",
            component: MaklumatAkademikComponent,
          },
        ],
      },
      {
        path: "senarai-pemohon",
        component: SenaraiPemohonComponent,
      },
      {
        path: "tawaran",
        children: [
          {
            path: "penyata-baki",
            component: TawaranPenyataBakiComponent,
          },
          {
            path: "urusan-lain",
            component: TawaranUrusanBakiComponent,
          },
          {
            path: "pembayaran",
            component: TawaranPembayaranComponent,
          },
        ],
      },
    ],
  },
];
