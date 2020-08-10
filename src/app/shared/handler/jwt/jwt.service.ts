import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class JwtService {
  constructor() {}

  getToken(title: string): String {
    console.log(title);
    return window.localStorage[title];
  }

  saveToken(title: string, token: string) {
    window.localStorage[title] = token;
  }

  destroyToken() {
    window.localStorage.clear();
  }
}
