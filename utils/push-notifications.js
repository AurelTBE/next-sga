import firebase from 'firebase/app';

export const initializeFirebase = () => {
  firebase.initializeApp({
    messagingSenderId: "31630139447"
  });
  navigator.serviceWorker
    .register('/service-worker.js')
    .then((registration) => {
      firebase.messaging().useServiceWorker(registration);
    });
}

export const askForPermissioToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log('token utilisateur :', token);
    
    return token;
  } catch (error) {
    console.error(error);
  }
}