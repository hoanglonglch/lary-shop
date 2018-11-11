// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  firebase: {
    apiKey: 'AIzaSyAZ6QyVTFv0TbzXbKAJV3wL3_5ZlT5eGNI',
    authDomain: 'lary-shop.firebaseapp.com',
    databaseURL: 'https://lary-shop.firebaseio.com',
    projectId: 'lary-shop',
    storageBucket: 'lary-shop.appspot.com',
    messagingSenderId: '559603268254'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
