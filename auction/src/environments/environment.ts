// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import * as process from 'process';

export const environment = {
  production: false,
  loginurl: 'http://localhost:5000/login',
  registerurl: 'http://localhost:5000/register',
  createAuctionurl: 'http://localhost:5000/createAuction',
  profileurl: 'http://localhost:5000/profile',
  myAuctionurl: 'http://localhost:5000/myAuctions',
  homeurl: 'http://localhost:5000/home',
  viewBids: 'http://localhost:5000/viewBids'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
