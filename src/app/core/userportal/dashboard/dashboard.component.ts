import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AutocompleteLibModule } from "angular-ng-autocomplete";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  test: Date = new Date();
  isCollapsed = true;

  keyword = "name";
  data = [
    {
      id: 1,
      name: "FAQ",
    },
    {
      id: 2,
      name: "Payment",
    },
    {
      id: 3,
      name: "Dashboard",
    },
    {
      id: 4,
      name: "Assessment",
    },
    {
      id: 5,
      name: "Delivery Channel",
    },
  ];

  constructor(private router: Router) {}

  ngOnInit() {}
  selectEvent(item) {
    // do something with selected item
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something when input is focused
  }

  navigatePage(path: String) {
    if (path == "user-dashboard") {
      return this.router.navigate(["/user/dashboard"]);
    } else if (path == "manual") {
      return this.router.navigate(["/user-portal/user-manual"]);
    } else if (path == "faq") {
      return this.router.navigate(["user-portal/faq"]);
    } else if (path == "brochure") {
      return this.router.navigate(["/user-portal/brochure"]);
    } else if (path == "refund") {
      return this.router.navigate(["/user-portal/refund"]);
    } else if (path == "complaint") {
      return this.router.navigate(["/user-portal/complaint"]);
    }
  }
}
