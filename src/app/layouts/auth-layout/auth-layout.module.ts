import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AuthLayoutRoutes } from "./auth-layout.routing";

import { LoginComponent } from "../../examples/examples/login/login.component";
import { PricingComponent } from "../../examples/examples/pricing/pricing.component";
import { LockComponent } from "../../examples/examples/lock/lock.component";
import { RegisterComponent } from "../../examples/examples/register/register.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule
  ],
  declarations: [
    LoginComponent,
    PricingComponent,
    LockComponent,
    RegisterComponent
  ]
})
export class AuthLayoutModule {}
