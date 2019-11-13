
import * as firebase from "firebase/app";
import "firebase/messaging";
const initializedFirebaseApp = firebase.initializeApp({
// Project Settings => Add Firebase to your web app
  messagingSenderId: "539284504552"
});
const messaging = initializedFirebaseApp.messaging();
messaging.usePublicVapidKey(
// Project Settings => Cloud Messaging => Web Push certificates
  "BPKtoNo91W9N6MYMZay8ZSLFdDNS4a8jUslrZ5I49nZwMo5oLNeeptECkibOvjXyjVkLMPuiEF8Xl_rIkyrTNNw"
);
export { messaging };