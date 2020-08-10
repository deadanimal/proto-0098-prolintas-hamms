import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { LoadingBarService } from "@ngx-loading-bar/core";
import { NotifyService } from "src/app/shared/handler/notify/notify.service";

@Component({
  selector: "app-forgot",
  templateUrl: "./forgot.component.html",
  styleUrls: ["./forgot.component.scss"],
})
export class ForgotComponent implements OnInit {
  // Image
  imgLogo = "assets/img/logo/prolintas-logo.png";
  imgBg = "assets/img/default/bg-img-it.jpeg";

  // Form
  focusEmail;
  resetForm: FormGroup;
  resetFormMessages = {
    email: [
      { type: "required", message: "Email is required" },
      { type: "email", message: "Please enter a valid email" },
    ],
  };

  constructor(
    private authService: AuthService,
    private notifyService: NotifyService,
    private formBuilder: FormBuilder,
    private loadingBar: LoadingBarService,
    private router: Router
  ) {}

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      email: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.email])
      ),
    });
  }

  reset() {
    this.loadingBar.start();
    this.loadingBar.complete();
    this.successMessage();
  }

  navigatePage(path: String) {
    if (path == "login") {
      return this.router.navigate(["/auth/login"]);
    }
  }

  successMessage() {
    let title = "Success";
    let message = "A reset link has been sent to your email";
    this.notifyService.openToastr(title, message);
  }
}
