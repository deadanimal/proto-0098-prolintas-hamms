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
import { UserportalRoutes } from "./userportal.routing";
import { QuillModule } from "ngx-quill";
import { NgxDropzoneModule } from "ngx-dropzone";
import { OrgChartModule } from "angular-org-chart";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { AutocompleteLibModule } from "angular-ng-autocomplete";
import { ManualComponent } from './manual/manual.component';
import { FaqComponent } from './faq/faq.component';
import { BrochureComponent } from './brochure/brochure.component';
import { RefundComponent } from './refund/refund.component';
import { ComplaintComponent } from './complaint/complaint.component';

@NgModule({
  declarations: [DashboardComponent, ManualComponent, FaqComponent, BrochureComponent, RefundComponent, ComplaintComponent],
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
    RouterModule.forChild(UserportalRoutes),
    QuillModule.forRoot(),
    NgxDropzoneModule,
    OrgChartModule,
    AutocompleteLibModule,
  ],
})
export class UserportalModule {}
