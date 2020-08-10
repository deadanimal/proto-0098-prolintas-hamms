import { Component, OnInit,ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AutocompleteLibModule } from "angular-ng-autocomplete";
import { LiveChatWidgetModel, LiveChatWidgetApiModel } from '@livechat/angular-widget';

@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.scss"],
})
export class LandingPageComponent implements OnInit {

  public isLiveChatWidgetLoaded: boolean = false;
  public liveChatApi: LiveChatWidgetApiModel;
  public visitor: { name: string; email: string};
  public params: { name: string; value: string}[];
  test: Date = new Date();
  isCollapsed = true;


  @ViewChild('liveChatWidget', {static: false}) public liveChatWidget: LiveChatWidgetModel;

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

  constructor(private router: Router) {

    this.visitor = {
      name: 'John Doe',
      email: 'john@doe.com',
    };

    this.params = [
      { name: 'Login', value: 'joe_public' },
      { name: 'Account ID', value: 'ABCD1234' },
      { name: 'Total order value', value: '$123' }
    ];
  }

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
    if (path == "home") {
      return this.router.navigate(["/global/landing_page"]);
    } else if (path == "manual") {
      return this.router.navigate(["/user-portal/user-manual"]);
    } else if (path == "faq") {
      return this.router.navigate(["global/faq"]);
    } else if (path == "brochure") {
      return this.router.navigate(["/user-portal/brochure"]);
    } else if (path == "refund") {
      return this.router.navigate(["/user-portal/refund"]);
    } else if (path == "complaint") {
      return this.router.navigate(["/user-portal/complaint"]);
    } else if (path == "login") {
      return this.router.navigate(["/auth/login"]);
    } else if (path == "about-us") {
      return this.router.navigate(["/global/about-us"]);
    }
  }
  onChatLoaded(api: LiveChatWidgetApiModel): void {
    this.liveChatApi = api;
    this.isLiveChatWidgetLoaded = true;

    // Sometimes it can happen that LC_Invite is is still being loaded when onChatLoaded is called. To ensure that LC_Invite is loaded you can give additional check to onChatLoaded function:
    // api.on_after_load = () => {
    //   this.liveChatApi = api;
    //   this.isLiveChatWidgetLoaded = true;
    // };
  }

  onChatWindowMinimized() {
    console.log('minimized')
  }

  onChatWindowOpened() {
    console.log('opened')
  }

  openChatWindow(): void {
    if (this.isLiveChatWidgetLoaded) {
      this.liveChatWidget.openChatWindow();

      // You can also use methods directly on liveChatApi instance
      // for more details plese read our documentation 
      // https://developers.livechatinc.com/docs/extending-ui/extending-chat-widget/javascript-api/#methods
      // this.liveChatApi.open_chat_window();
    };
  }

  hideChatWindow() {
    if (this.isLiveChatWidgetLoaded) {
      this.liveChatWidget.minimizeChatWindow();

      // You can also use methods directly on liveChatApi instance
      // for more details plese read our documentation 
      // https://developers.livechatinc.com/docs/extending-ui/extending-chat-widget/javascript-api/#methods
      // this.liveChatApi.minimize_chat_window();
    };
  }
}
