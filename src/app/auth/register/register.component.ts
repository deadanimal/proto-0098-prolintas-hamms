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
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  // Image
  imgLogo = "assets/img/logo/prolintas-logo.png";
  imgBg = "assets/img/default/bg-img-it.jpeg";

  // Form
  focusUsername;
  focusPassword;
  focusConfirmPassword;
  registerForm: FormGroup;
  registerFormMessages = {
    username: [
      { type: "required", message: "Email is required" },
      { type: "email", message: "Please enter a valid email" },
    ],
    password1: [
      { type: "required", message: "Password is required" },
      {
        type: "minLength",
        message: "Password must have at least 8 characters",
      },
    ],
    password2: [
      { type: "required", message: "Password is required" },
      {
        type: "minLength",
        message: "Password must have at least 8 characters",
      },
    ],
  };
  bar0: string;
  bar1: string;
  bar2: string;
  bar3: string;

  constructor(
    private authService: AuthService,
    private notifyService: NotifyService,
    private formBuilder: FormBuilder,
    private loadingBar: LoadingBarService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.email])
      ),
      password1: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.minLength(8)])
      ),
      password2: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.minLength(8)])
      ),
    });
  }

  login() {
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
    let message = "Loging in right now";
    this.notifyService.openToastr(title, message);
  }
  createAccount() {}
}
