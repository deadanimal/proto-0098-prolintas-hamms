import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";

import { ManualComponent } from "./manual/manual.component";
import { FaqComponent } from "./faq/faq.component";
import { BrochureComponent } from "./brochure/brochure.component";
import { RefundComponent } from "./refund/refund.component";
import { ComplaintComponent } from "./complaint/complaint.component";

export const UserportalRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
      },
      {
        path: "user-manual",
        component: ManualComponent,
      },
      {
        path: "faq",
        component: FaqComponent,
      },
      {
        path: "brochure",
        component: BrochureComponent,
      },
      {
        path: "refund",
        component: RefundComponent,
      },
      {
        path: "complaint",
        component: ComplaintComponent,
      },
    ],
  },
];
