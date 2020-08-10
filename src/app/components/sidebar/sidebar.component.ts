import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  ROUTES,
  ROUTESUSER,
  USERPORTALROUTES,
} from "../../shared/menu/menu-items";
import { AuthService } from "src/app/shared/services/auth/auth.service";

var misc: any = {
  sidebar_mini_active: true,
};

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  imgLogo = "assets/img/logo/prolintas-logo.png";

  public href: string = "";

  public menuItems: any[];
  public isCollapsed = true;
  public menu;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.href = this.router.url.slice(0, 6);
    // console.log(this.href);
    //     ar str = "Hello world!";
    // var res = str.slice(0, 5);
    // hardcoded user role
    // console.log("sidebar = ", this.authService);
    // console.log("userType", this.authService.returnUserType());
    // this.authService.userType = "US";

    if (this.href == "/admin") {
      this.menu = ROUTES;
    } else if (this.href == "/user/") {
      this.menu = ROUTESUSER;
    } else if (this.href == "/user-") {
      this.menu = USERPORTALROUTES;
    }
    this.menuItems = this.menu.filter((menuItem) => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }

  onMouseEnterSidenav() {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.add("g-sidenav-show");
    }
  }

  onMouseLeaveSidenav() {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-show");
    }
  }

  minimizeSidebar() {
    const sidenavToggler = document.getElementsByClassName(
      "sidenav-toggler"
    )[0];
    const body = document.getElementsByTagName("body")[0];
    if (body.classList.contains("g-sidenav-pinned")) {
      misc.sidebar_mini_active = true;
    } else {
      misc.sidebar_mini_active = false;
    }
    if (misc.sidebar_mini_active === true) {
      body.classList.remove("g-sidenav-pinned");
      body.classList.add("g-sidenav-hidden");
      sidenavToggler.classList.remove("active");
      misc.sidebar_mini_active = false;
    } else {
      body.classList.add("g-sidenav-pinned");
      body.classList.remove("g-sidenav-hidden");
      sidenavToggler.classList.add("active");
      misc.sidebar_mini_active = true;
    }
  }
}
