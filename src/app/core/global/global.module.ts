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
import { GlobalRoutes } from "./global.routing";
import { NotificationsComponent } from "./notifications/notifications.component";
import { ProfileComponent } from "./profile/profile.component";
import { SettingsComponent } from "./settings/settings.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { AutocompleteLibModule } from "angular-ng-autocomplete";
import { FaqComponent } from "./faq/faq.component";
import { AboutUsComponent } from "./about-us/about-us.component";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { LivechatWidgetModule } from "@livechat/angular-widget";

@NgModule({
  declarations: [
    NotificationsComponent,
    ProfileComponent,
    SettingsComponent,
    LandingPageComponent,
    FaqComponent,
    AboutUsComponent,
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
    RouterModule.forChild(GlobalRoutes),
    AutocompleteLibModule,
    CarouselModule.forRoot(),
    LivechatWidgetModule,
  ],
})
export class GlobalModule {}
