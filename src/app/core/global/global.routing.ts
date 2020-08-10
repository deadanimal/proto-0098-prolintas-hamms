import { Routes } from "@angular/router";
import { ProfileComponent } from "./profile/profile.component";
import { SettingsComponent } from "./settings/settings.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";

import { FaqComponent } from "./faq/faq.component";
import { AboutUsComponent } from "./about-us/about-us.component";

export const GlobalRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "landing_page",
        component: LandingPageComponent,
      },
      {
        path: "notifications",
        component: NotificationsComponent,
      },
      {
        path: "profile",
        component: ProfileComponent,
      },
      {
        path: "settings",
        component: SettingsComponent,
      },
      {
        path: "faq",
        component: FaqComponent,
      },
      {
        path: "about-us",
        component: AboutUsComponent,
      },
    ],
  },
];
