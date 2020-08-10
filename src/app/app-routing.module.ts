import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { PresentationComponent } from "./examples/presentation/presentation.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "auth/login",
    // redirectTo: "global/landing_page",
    pathMatch: "full",
  },
  {
    path: "presentation",
    component: PresentationComponent,
  },
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "admin",
        loadChildren: "./core/admin/admin.module#AdminModule",
      },
      {
        path: "user",
        loadChildren: "./core/user/user.module#UserModule",
      },
      {
        path: "dashboards",
        loadChildren:
          "./examples/dashboards/dashboards.module#DashboardsModule",
      },
      {
        path: "components",
        loadChildren:
          "./examples/components/components.module#ComponentsModule",
      },
      {
        path: "forms",
        loadChildren: "./examples/forms/forms.module#FormsModules",
      },
      {
        path: "tables",
        loadChildren: "./examples/tables/tables.module#TablesModule",
      },
      {
        path: "maps",
        loadChildren: "./examples/maps/maps.module#MapsModule",
      },
      {
        path: "widgets",
        loadChildren: "./examples/widgets/widgets.module#WidgetsModule",
      },
      {
        path: "charts",
        loadChildren: "./examples/charts/charts.module#ChartsModule",
      },
      {
        path: "calendar",
        loadChildren: "./examples/calendar/calendar.module#CalendarModule",
      },
      {
        path: "examples",
        loadChildren: "./examples/examples/examples.module#ExamplesModule",
      },
    ],
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "auth",
        loadChildren: "./auth/auth.module#AuthModule",
      },
      {
        path: "examples",
        loadChildren:
          "./layouts/auth-layout/auth-layout.module#AuthLayoutModule",
      },
      {
        path: "global",
        loadChildren: "./core/global/global.module#GlobalModule",
      },
      {
        path: "user-portal",
        loadChildren: "./core/userportal/userportal.module#UserportalModule",
      },
    ],
  },
  {
    path: "**",
    redirectTo: "dashboard",
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
