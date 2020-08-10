import { Routes } from "@angular/router";

import { LoginComponent } from "../../examples/examples/login/login.component";
import { PricingComponent } from "../../examples/examples/pricing/pricing.component";
import { LockComponent } from "../../examples/examples/lock/lock.component";
import { RegisterComponent } from "../../examples/examples/register/register.component";
import { PresentationComponent } from "../../examples/presentation/presentation.component";

export const AuthLayoutRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "login",
        component: LoginComponent
      }
    ]
  },
  {
    path: "",
    children: [
      {
        path: "lock",
        component: LockComponent
      }
    ]
  },
  {
    path: "",
    children: [
      {
        path: "register",
        component: RegisterComponent
      }
    ]
  },
  {
    path: "",
    children: [
      {
        path: "pricing",
        component: PricingComponent
      }
    ]
  }
];
