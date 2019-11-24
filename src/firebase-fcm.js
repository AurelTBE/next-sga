
import firebase from './init-fcm';
import "firebase/messaging";

const messaging = firebase.messaging();
messaging.usePublicVapidKey(
	// Project Settings => Cloud Messaging => Web Push certificates
  "BPKtoNo91W9N6MYMZay8ZSLFdDNS4a8jUslrZ5I49nZwMo5oLNeeptECkibOvjXyjVkLMPuiEF8Xl_rIkyrTNNw"
);
export { messaging };