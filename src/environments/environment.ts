// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // baseUrl: 'https://www.api.prototype.com.my/',
  // baseUrl: "https://fama-hotspot-api.pipe.my/",
  baseUrl: "http://127.0.0.1:8000/",
  mapbox: {
    accessToken:
      "pk.eyJ1IjoiYWZlZXpheml6IiwiYSI6ImNqNjJ6anlhYzA0bTczM3FvYnppbDh4eTEifQ.AdDRr42bNfNJvQENLrE6eg", // Your access token goes here
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
